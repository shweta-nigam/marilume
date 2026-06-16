import { query, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { ClaudeProvider } from "@corsair-dev/mcp";
import { corsair } from "@/server/corsair";
import { MODEL } from "@/server/agent";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

// Define the environment variables safely
const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
const childEnv = {
  ...process.env,
  ANTHROPIC_API_KEY: apiKey,
  CLAUDE_API_KEY: apiKey,
};

/**
 * Runs the AI Assistant for a given tenant.
 */
export async function runAssistant(tenantId: string, message: string): Promise<string> {
  console.log(`[Assistant Service] Running assistant for tenant: ${tenantId}`);

  try {
    // 1. Build Corsair tools specifically bound to this tenant
    const provider = new ClaudeProvider();
    const corsairTools = await provider.build({
      corsair: corsair.withTenant(tenantId),
      tenantId,
      setup: false,
    });

    // 2. Create an SDK-level MCP server wrapping these tools
    const corsairServer = createSdkMcpServer({
      name: "corsair",
      tools: corsairTools,
    });

    // 3. Start the Claude Agent SDK query
    const queryResult = query({
      prompt: message,
      options: {
        model: MODEL,
        mcpServers: {
          corsair: corsairServer,
        },
        systemPrompt: {
          type: 'preset',
          preset: 'claude_code',
          append: 'You have access to a custom MCP server called "corsair". This server provides the tool `corsair__run_script` which allows you to execute JavaScript snippets with a scoped `corsair` client in scope. You can use this to list/search/fetch/send/manage Gmail emails and Google Calendar events on behalf of the current user. E.g. `const res = await corsair.gmail.api.threads.list({ maxResults: 2 }); return res;` or `const res = await corsair.googlecalendar.api.events.list({}); return res;`. Always use the `corsair` client via `corsair__run_script` when the user asks for emails, calendar, inbox, or integrations. Do NOT claim you do not have access to these services.',
        },
        permissionMode: 'bypassPermissions',
        allowDangerouslySkipPermissions: true,
        env: childEnv,
      },
    });

    // 4. Consume the async generator to collect the assistant's final response
    let lastAssistantText = "";
    for await (const msg of queryResult) {
      if (msg.type === "assistant") {
        const text = msg.message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("");
        if (text) {
          lastAssistantText = text;
        }
      }
    }

    return lastAssistantText;
  } catch (error: any) {
    console.error("[Assistant Service] Error running assistant:", error);
    throw error;
  }
}

/**
 * Runs the AI Agent (wraps runAssistant by resolving the user's tenantId if needed).
 */
export async function runAgent(
  userIdOrObject: string | { tenantId: string; message: string },
  messageOrUndefined?: string
): Promise<any> {
  let tenantId = "";
  let message = "";

  if (typeof userIdOrObject === "object") {
    tenantId = userIdOrObject.tenantId;
    message = userIdOrObject.message;
  } else {
    // Resolve the tenant ID for the user
    tenantId = await ensureUserTenantProvisioned(userIdOrObject);
    message = messageOrUndefined || "";
  }

  const responseText = await runAssistant(tenantId, message);
  
  // Return the format that the original caller expects (an array of content blocks)
  return [{ type: "text", text: responseText }];
}