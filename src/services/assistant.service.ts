
import { claude } from "@/lib/claude";
import { searchEmails } from "./email.service";
import { MODEL } from "@/server/agent";

export async function runAssistant(
  tenantId: string,
  prompt: string
) {
  const response = await claude.messages.create({
    model: MODEL,
    max_tokens: 200,

    system: `
You are Marilume.

Your job is to determine which tool should be called.

Available tools:

- search_emails

Return ONLY valid JSON.

Examples:

{
  "tool": "search_emails",
  "query": "amazon"
}

{
  "tool": "search_emails",
  "query": "mobbin"
}

Rules:
- Return only JSON
- Do not explain your reasoning
- Do not use markdown
- Do not wrap JSON in code blocks
- Always include a "tool" field
`,

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text =
    response.content[0]?.type === "text"
      ? response.content[0].text.trim()
      : "{}";

  let action: {
    tool?: string;
    query?: string;
  };

  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    action = JSON.parse(cleaned);

    console.log("Claude Output:");
    console.log(action);
  } catch (error) {
    console.error(
      "Claude returned invalid JSON:",
      text
    );

    return {
      error: "Invalid JSON returned by Claude",
      raw: text,
    };
  }

  switch (action.tool) {
    case "search_emails": {
      const emails = await searchEmails(
        tenantId,
        action.query ?? ""
      );

      console.log(
        `Found ${emails.length} emails`
      );

      const summaryResponse =
        await claude.messages.create({
          model: MODEL,
          max_tokens: 500,

          system: `
You are an email assistant.

Summarize the email results clearly.

Include:
- Number of emails found
- Main topics
- Key highlights

Keep the response concise.
`,

          messages: [
            {
              role: "user",
              content: `
Search Query:
${action.query}

Emails:
${JSON.stringify(
  emails.slice(0, 10),
  null,
  2
)}
`,
            },
          ],
        });

      const summary =
        summaryResponse.content[0]?.type ===
        "text"
          ? summaryResponse.content[0].text
          : "No summary generated.";

      return {
        tool: "search_emails",
        query: action.query,
        count: emails.length,
        summary,
        emails,
      };
    }

    default:
      return {
        error: "Unknown tool",
        tool: action.tool,
      };
  }
}