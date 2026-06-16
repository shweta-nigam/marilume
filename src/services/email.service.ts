import { corsair } from "@/server/corsair";

export type EmailSearchResult = {
  id: string;
  snippet: string;
  historyId?: string;
  createdAt?: Date | null;
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

  return threads
    .slice(0, limit)
    .map((thread) => ({
      id: thread.entity_id,
      snippet: thread.data?.snippet ?? "",
      historyId: thread.data?.historyId,
      createdAt: thread.data?.createdAt ?? null,
    }));
}



function mapThread(thread: any): EmailSearchResult {
  return {
    id: thread.entity_id,
    snippet: thread.data?.snippet ?? "",
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

  return mapThread(results[0]);
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
    .map(mapThread);
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
