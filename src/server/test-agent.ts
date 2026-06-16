import "dotenv/config";
import { runAssistant } from "../services/agent.service";

async function main() {
  const tenantId = process.env.TEST_TENANT_ID || "cmqgowq0b0000uu643l0hnkf2";

  console.log(`\n=== Running AI Assistant Test for Tenant: ${tenantId} ===\n`);

  try {
    const result = await runAssistant(
      tenantId,
      "List the first 2 emails from my inbox"
    );

    console.log("\n=== Assistant Response ===");
    console.log(result);
    console.log("==========================\n");
  } catch (error: any) {
    console.error("❌ Test failed:", error.message || error);
  }
}

main().catch(console.error);
