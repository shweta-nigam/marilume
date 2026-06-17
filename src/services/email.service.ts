import { corsair } from "@/server/corsair";

export type EmailSearchResult = {
  id: string;
  snippet: string;
  historyId?: string;
  createdAt?: Date | null;

  subject?: string;
  sender?: string;
  unread?: boolean;

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

  const threads = await corsair
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

  const messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  return threads
    .slice(0, limit)
    .map((thread) => mapThread(thread, messages));
}

function mapThread(thread: any, messages: any[] = []): EmailSearchResult {
  const messagesInThread = messages.filter(
    (m: any) => m.data?.threadId === thread.entity_id || m.data?.threadId === thread.data?.id
  );

  const sortedMessages = [...messagesInThread].sort(
    (a: any, b: any) =>
      new Date(a.data?.createdAt ?? 0).getTime() -
      new Date(b.data?.createdAt ?? 0).getTime()
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

  return {
    id: thread.entity_id,
    snippet: thread.data?.snippet ?? "",
    subject,
    sender,
    unread,
    historyId: thread.data?.historyId,
    createdAt: thread.data?.createdAt ?? null,
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
  const threads = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .list();

  const messages = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .messages
    .list();

  return threads
    .sort(
      (a, b) =>
        new Date(
          b.data?.createdAt ?? 0
        ).getTime() -
        new Date(
          a.data?.createdAt ?? 0
        ).getTime()
    )
    .slice(0, limit)
    .map((thread) => mapThread(thread, messages));
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
