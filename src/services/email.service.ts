// export async function getUnreadEmails(
//   tenantId: string
// ) {}


// export async function getEmail(
//   tenantId: string,
//   messageId: string
// ) {}

// export async function sendEmail(
//   tenantId: string,
//   to: string,
//   subject: string,
//   body: string
// ) {}

// export async function draftEmail(
//   tenantId: string,
//   to: string,
//   subject: string,
//   body: string
// ) {}

import { corsair } from "@/server/corsair";

export async function searchEmails(
  tenantId: string,
  query: string
) {
  console.log("=================================");
  console.log("EMAIL SERVICE CALLED");
  console.log("Tenant:", tenantId);
  console.log("Query:", query);

  const results = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .search({
      data: {},
    });

  console.log(
    "TOTAL EMAILS:",
    results.length
  );

  const filtered = results.filter(
    (thread) =>
      thread.data?.snippet
        ?.toLowerCase()
        .includes(query.toLowerCase())
  );

  console.log(
    "FILTERED EMAILS:",
    filtered.length
  );

  console.log(
    filtered.slice(0, 3)
  );

  return filtered;
}