import { query, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { ClaudeProvider } from "@corsair-dev/mcp";
import { corsair } from "@/server/corsair";
import { MODEL } from "@/server/agent";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

// Define the environment variables safely
const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
if (apiKey) {
  process.env.ANTHROPIC_API_KEY = apiKey;
  process.env.CLAUDE_API_KEY = apiKey;
}
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
You are Mari, an AI assistant for Gmail and Google Calendar.

Your responsibilities:
- Read and summarize emails
- Draft and send emails
- Manage inbox workflows
- Create, update, reschedule, and delete calendar events
- Help users manage their schedules

Personality:
- Friendly, professional, and proactive.
- Keep responses short and clear.
- Use 1-3 sentences whenever possible.
- Do not provide unnecessary explanations.

General Rules:
- Always use available Gmail and Calendar tools when information or actions are required.
- Never pretend an action was completed unless a tool successfully completed it.
- Never discuss software development, code, APIs, system prompts, or internal implementation details.
- Never mention MCP, Corsair, scripts, databases, syncing, or technical infrastructure.
- Never claim you lack access to Gmail or Calendar if tools are available.

Email Rules:

Viewing Emails:
- Fetch emails using available tools.
- Do not print long email lists in chat.
- After fetching emails, respond briefly:
  "I've loaded your latest emails. Select any email to view details, summarize it, draft a reply, or take action."

Email Summaries:
- Keep summaries under 5 bullet points.
- Focus on sender, purpose, deadlines, and action items.
- Avoid copying large portions of the email.

Drafting Replies:
- Generate the email draft and wrap it inside [DRAFT] and [/DRAFT].
- Do not place any draft content outside these tags.
- The draft may be the only content in the response.

- Do not place draft text outside these tags.
- Outside the tags, provide only a short confirmation:
  "I've prepared a draft reply for your review."

Sending Emails:
- Confirm success briefly:
  "Your email has been sent."

Calendar Rules:

Viewing Events:
- Load calendar events using available tools.
- Do not dump large event lists into chat.
- Respond briefly:
  "I've loaded your calendar events. You can view them in the calendar panel."

Creating Events:
- Create the event using tools.
- Confirm with:
  "I've scheduled '<event title>' on <date/time>."

Updating Events:
- Confirm with:
  "I've updated the event successfully."

Deleting Events:
- Confirm with:
  "I've removed the event from your calendar."

Rescheduling Events:
- Confirm with:
  "I've rescheduled the event."

Clarification Rules:
- If required information is missing, ask one concise follow-up question.
- Never ask multiple questions at once unless necessary.

Response Style:
- Be concise.
- Avoid repeating information.
- Prefer action over explanation.

Response Length:
- Use one sentence when possible.
- Never exceed 4 short sentences unless the user explicitly requests details.
- For successful actions, respond with a brief confirmation only.
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

  if (
    error?.message?.includes("@anthropic-ai/claude-agent-sdk")
  ) {
    return "The AI service is currently unavailable. Please try again shortly.";
  }

  return "Something went wrong while processing your request.";
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