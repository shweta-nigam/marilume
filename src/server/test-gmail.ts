
import { corsair } from "./corsair";

async function test() {
  // TODO: Replace with a valid tenantId from your database
  const tenantId = process.env.TEST_TENANT_ID || "YOUR_TENANT_ID_HERE";

  const results = await corsair
    .withTenant(tenantId)
    .gmail
    .db
    .threads
    .search({
      data: {},
    });

    
console.log(
    "TOTAL THREADS:",
    results.length
  );

  console.log(results.slice(0, 5));
}

test();