import { corsair } from "./corsair";

async function testFetchEmails() {
  // Use one of the tenant IDs from the database
  const tenantId = process.env.TEST_TENANT_ID || "cmqgpu3260001uu64ks5x4qq3";

  console.log(`\n=== Testing Gmail Fetch for Tenant: ${tenantId} ===\n`);

  try {
    console.log("1. Fetching live Gmail threads from Google API...");
    // Direct call to Gmail's live API via Corsair
    const liveThreads = await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .threads
      .list({
        maxResults: 5,
      });

     const results = await corsair
  .withTenant(tenantId)
  .gmail
  .db
  .threads
  .search({
    data: {
      snippet: "h",
    },
  });

console.dir(results, { depth: null });


    console.log(`Successfully fetched ${liveThreads.threads?.length || 0} live threads:`);
    console.dir(liveThreads.threads, { depth: null });

  } catch (error: any) {
    console.error("❌ Failed to fetch live threads:", error.message || error);
  }

  try {
    console.log("\n2. Querying local database mirror (synced emails)...");
    // Querying Corsair's local mirrored database
    const dbThreads = await corsair
      .withTenant(tenantId)
      .gmail
      .db
      .threads
      .list();

    console.log(`Successfully fetched ${dbThreads.length} threads from local database:`);
    console.dir(dbThreads.slice(0, 5), { depth: null });

  } catch (error: any) {
    console.error("❌ Failed to fetch database threads:", error.message || error);
  }
}

testFetchEmails().catch(console.error);
