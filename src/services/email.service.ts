import { corsair } from "@/server/corsair";

export type EmailSearchResult = {
  id: string;
  snippet: string;
  historyId?: string;
  createdAt?: Date | null;

  subject?: string;
  sender?: string;
  unread?: boolean;
  body?: string;
};

export async function searchEmails(
  tenantId: string,
  query: string,
  limit = 10
): Promise<EmailSearchResult[]> {
  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }

  if (!query.trim()) {
    return [];
  }

  let matchedThreads: any[] = [];

  try {
    console.log(`[searchEmails] Querying live Gmail API with query: "${query}"`);
    const apiResult = await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .threads
      .list({
        q: query.trim(),
        maxResults: limit,
      });

    const threadIds = apiResult.threads?.map((t: any) => t.id) || [];
    
    // Fetch all threads from local database mirror
    const allDbThreads = await corsair
      .withTenant(tenantId)
      .gmail
      .db
      .threads
      .list();

    // Preserve the exact order returned by the live API
    matchedThreads = threadIds
      .map(id => allDbThreads.find((t: any) => (t.entity_id || t.data?.id) === id))
      .filter(Boolean);
      
    console.log(`[searchEmails] Found ${matchedThreads.length} matching threads in DB after live sync.`);
  } catch (error) {
    console.error("[searchEmails] Error searching live threads from API, falling back to local DB search:", error);
    try {
      const localThreads = await corsair
        .withTenant(tenantId)
        .gmail
        .db
        .threads
        .search({
          data: {
            snippet: {
              contains: query.trim(),
            },
          },
        });
      matchedThreads = localThreads.slice(0, limit);
    } catch (dbError) {
      console.error("[searchEmails] Local database search failed:", dbError);
    }
  }

  // Load all messages from database to use for sync checking and mapping
  let messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  // For each of the matched threads, verify if it has synced messages.
  // If not, fetch details from the API.
  const syncPromises = matchedThreads.map(async (thread) => {
    const threadId = thread.entity_id || thread.data?.id;
    const messagesInThread = messages.filter(
      (m: any) => m.data?.threadId === threadId
    );

    // Needs sync if no messages in DB or if existing messages do not have subject/sender details
    const needsSync =
      messagesInThread.length === 0 ||
      messagesInThread.every((m) => !m.data?.from || !m.data?.subject);

    if (needsSync) {
      try {
        console.log(`[searchEmails] Syncing message details for thread: ${threadId}`);
        const threadDetail = await corsair
          .withTenant(tenantId)
          .gmail
          .api
          .threads
          .get({
            id: threadId,
          });

        if (threadDetail.messages && threadDetail.messages.length > 0) {
          const firstMsg = threadDetail.messages[0];
          if (firstMsg.id) {
            await corsair
              .withTenant(tenantId)
              .gmail
              .api
              .messages
              .get({
                id: firstMsg.id,
              });
          }

          const latestMsg = threadDetail.messages[threadDetail.messages.length - 1];
          if (latestMsg.id && latestMsg.id !== firstMsg.id) {
            await corsair
              .withTenant(tenantId)
              .gmail
              .api
              .messages
              .get({
                id: latestMsg.id,
              });
          }
        }
      } catch (err) {
        console.error(`[searchEmails] Failed to sync message details for thread ${threadId}:`, err);
      }
    }
  });

  await Promise.all(syncPromises);

  // Reload messages from DB after syncing is done
  messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  return matchedThreads.map((thread) => mapThread(thread, messages));
}

function getMessageBody(message: any): string {
  const payload = message?.data?.payload;
  if (!payload) return "";

  const decodeBase64 = (str: string) => {
    try {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      return Buffer.from(base64, "base64").toString("utf-8");
    } catch {
      return "";
    }
  };

  if (payload.body?.data) {
    return decodeBase64(payload.body.data);
  }

  const findBodyInParts = (parts: any[]): string => {
    for (const part of parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeBase64(part.body.data);
      }
      if (part.parts) {
        const body = findBodyInParts(part.parts);
        if (body) return body;
      }
    }
    for (const part of parts) {
      if (part.mimeType === "text/html" && part.body?.data) {
        return decodeBase64(part.body.data);
      }
    }
    return "";
  };

  if (payload.parts) {
    return findBodyInParts(payload.parts);
  }

  return message?.data?.snippet || "";
}

function mapThread(thread: any, messages: any[] = []): EmailSearchResult {
  const messagesInThread = messages.filter(
    (m: any) => m.data?.threadId === thread.entity_id || m.data?.threadId === thread.data?.id
  );

  const getMessageDate = (msg: any) => {
    if (msg?.data?.internalDate) {
      return Number(msg.data.internalDate);
    }
    return msg?.data?.createdAt ? new Date(msg.data.createdAt).getTime() : 0;
  };

  const sortedMessages = [...messagesInThread].sort(
    (a: any, b: any) => getMessageDate(a) - getMessageDate(b)
  );

  const firstMessage = sortedMessages[0];
  const latestMessage = sortedMessages[sortedMessages.length - 1] || firstMessage;

  const getHeader = (msg: any, name: string) => {
    return msg?.data?.payload?.headers?.find(
      (h: any) => h.name.toLowerCase() === name.toLowerCase()
    )?.value;
  };

  const fromVal = getHeader(latestMessage, 'from') || getHeader(firstMessage, 'from') || '';
  const sender = fromVal.replace(/<.*>/, '').trim() || fromVal || 'Unknown';

  const subject = getHeader(firstMessage, 'subject') || getHeader(latestMessage, 'subject') || thread.data?.subject || '(No Subject)';

  const unread = messagesInThread.length > 0 
    ? messagesInThread.some((m: any) => m.data?.labelIds?.includes('UNREAD'))
    : (thread.data?.unread ?? false);

  const body = latestMessage ? getMessageBody(latestMessage) : (thread.data?.snippet ?? "");

  const latestMessageDate = latestMessage ? getMessageDate(latestMessage) : 0;
  const threadCreatedAt = latestMessageDate > 0
    ? new Date(latestMessageDate)
    : (thread.data?.createdAt ? new Date(thread.data.createdAt) : null);

  return {
    id: thread.entity_id,
    snippet: thread.data?.snippet ?? "",
    subject,
    sender,
    unread,
    body,
    historyId: thread.data?.historyId,
    createdAt: threadCreatedAt,
  };
}

export async function getEmailById(
  tenantId: string,
  emailId: string
): Promise<EmailSearchResult | null> {
  const results = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .search({
      data: {
        id: emailId,
      },
    });

  if (results.length === 0) {
    return null;
  }

  const messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .search({
      data: {
        threadId: emailId,
      },
    });

  return mapThread(results[0], messages);
}

export async function getRecentEmails(
  tenantId: string,
  limit = 20
): Promise<EmailSearchResult[]> {
  if (!tenantId) {
    return [];
  }

  // 1. Fetch live thread stubs from Google API to keep local mirror up-to-date
  try {
    await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .threads
      .list({
        maxResults: limit,
      });
  } catch (error) {
    console.error("[getRecentEmails] Error fetching live threads from API:", error);
  }

  // 2. Load threads from local database mirror
  const threads = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .list();

  // 3. Load messages from local database mirror (loaded early to use for sorting)
  let messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  // Helper to determine the actual date of the latest message in a thread
  const getThreadDate = (thread: any) => {
    const threadId = thread.entity_id || thread.data?.id;
    const threadMessages = messages.filter(
      (m: any) => m.data?.threadId === threadId
    );
    if (threadMessages.length > 0) {
      const dates = threadMessages.map((m: any) => {
        if (m.data?.internalDate) {
          return Number(m.data.internalDate);
        }
        return m.data?.createdAt ? new Date(m.data.createdAt).getTime() : 0;
      });
      return Math.max(...dates);
    }
    return thread.data?.createdAt ? new Date(thread.data.createdAt).getTime() : 0;
  };

  // Sort by latest message date descending and slice to limit
  const topThreads = threads
    .sort((a, b) => getThreadDate(b) - getThreadDate(a))
    .slice(0, limit);

  // 4. For each of the top threads, verify if it has synced messages.
  // If not, fetch details from the API.
  const syncPromises = topThreads.map(async (thread) => {
    const threadId = thread.entity_id || thread.data?.id;
    const messagesInThread = messages.filter(
      (m: any) => m.data?.threadId === threadId
    );

    // Needs sync if no messages in DB or if existing messages do not have subject/sender details
    const needsSync =
      messagesInThread.length === 0 ||
      messagesInThread.every((m) => !m.data?.from || !m.data?.subject);

    if (needsSync) {
      try {
        console.log(`[getRecentEmails] Syncing message details for thread: ${threadId}`);
        const threadDetail = await corsair
          .withTenant(tenantId)
          .gmail
          .api
          .threads
          .get({
            id: threadId,
          });

        if (threadDetail.messages && threadDetail.messages.length > 0) {
          // Sync first message (to get original subject)
          const firstMsg = threadDetail.messages[0];
          if (firstMsg.id) {
            await corsair
              .withTenant(tenantId)
              .gmail
              .api
              .messages
              .get({
                id: firstMsg.id,
              });
          }

          // Sync latest message (to get latest sender and body snippet)
          const latestMsg = threadDetail.messages[threadDetail.messages.length - 1];
          if (latestMsg.id && latestMsg.id !== firstMsg.id) {
            await corsair
              .withTenant(tenantId)
              .gmail
              .api
              .messages
              .get({
                id: latestMsg.id,
              });
          }
        }
      } catch (err) {
        console.error(`[getRecentEmails] Failed to sync message details for thread ${threadId}:`, err);
      }
    }
  });

  // Wait for parallel sync tasks to complete
  await Promise.all(syncPromises);

  // 5. Reload messages from DB after syncing is done
  messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  return topThreads.map((thread) => mapThread(thread, messages));
}

export async function getLatestEmail(
  tenantId: string
): Promise<EmailSearchResult | null> {
  const emails = await getRecentEmails(
    tenantId,
    1
  );

  return emails[0] ?? null;
}

export async function getEmailCount(
  tenantId: string
): Promise<number> {
  const threads = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .list();

  return threads.length;
}

export async function getMessages(
  tenantId: string,
  limit = 50
) {
  const threads = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .list();

  return threads.slice(0, limit);
}

export async function getThread(
  tenantId: string,
  threadId: string
) {
  const threads = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .search({
      data: {
        id: threadId,
      },
    });

  return threads[0] ?? null;
}
