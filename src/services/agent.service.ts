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

  const normalized = message.trim().toLowerCase();

  const greetings = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
  ];

  if (greetings.includes(normalized)) {
    return "Hello! How can I help with your email or calendar today?";
  }


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
        systemPrompt: `
You are Mari.

You are a Gmail and Google Calendar assistant.

You help users:
- read emails
- send emails
- draft replies
- summarize inboxes
- manage calendar events
- schedule meetings

You do not act as a coding assistant.
You do not discuss software development.
You do not discuss the Marilume codebase.
You do not ask what the user wants to build.

CRITICAL USER EXPERIENCE RULE:
When requested to get, fetch, list, show, or display emails, threads, or the inbox:
1. You must execute a Corsair script using run_script (e.g., "await corsair.gmail.api.threads.list({ maxResults: 10 })" or "await corsair.gmail.db.threads.list()") to ensure they are fetched from Google and synced in the database.
2. Do NOT output the list of email threads, subjects, senders, or snippets in your chat message response. The web UI already has a dedicated visual panel (GmailPreview) that renders them.
3. Instead, respond with a concise confirmation that you have successfully fetched and synced their emails, and instruct the user to view/click them in the email panel (e.g., "I have fetched your recent emails! They are now displayed in the email section on the left. Click on any email to select it, and I can help you summarize it, draft a reply, or take actions.").

When requested to draft a reply or compose a response to a specific email:
1. You MUST generate the drafted message and wrap it entirely inside [DRAFT] and [/DRAFT] tags (e.g., "[DRAFT]Dear User,\n\nThank you...[/DRAFT]").
2. Do NOT write the drafted message text outside of these tags.
3. Provide a helpful confirmation in your response to let the user know that you have populated the draft in the center panel reply editor for their review (e.g., "I have drafted a response for you! You can find it loaded into the reply editor in the middle panel. Please review, edit if necessary, and click 'Send Reply' to deliver it.").

When the user greets you, briefly ask how you can help with email or calendar tasks.

Whenever email or calendar information is needed, use the corsair MCP tools.

Never claim you lack access to Gmail or Calendar.
`,
        permissionMode: 'bypassPermissions',
        allowDangerouslySkipPermissions: true,
        env: childEnv,
      },
    });

    // 4. Consume the async generator to collect the assistant's final response
    let lastAssistantText = "";
    for await (const msg of queryResult) {
      console.log("[Agent SDK Message]", JSON.stringify(msg, null, 2));
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