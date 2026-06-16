export async function runAgent({
  tenantId,
  message,
}: {
  tenantId: string;
  message: string;
}) {
  const response =
    await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,

      system: `
You are Marilume.

You help users manage email and calendar.

Use tools whenever information is required.
`,

      messages: [
        {
          role: "user",
          content: message,
        },
      ],

      tools,
    });

  const toolUse =
    response.content.find(
      (block) =>
        block.type === "tool_use"
    );

  if (!toolUse) {
    return response.content;
  }

  const result =
    await executeTool(
      tenantId,
      toolUse.name,
      toolUse.input
    );

  const finalResponse =
    await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,

      messages: [
        {
          role: "user",
          content: message,
        },

        {
          role: "assistant",
          content: response.content,
        },

        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id:
                toolUse.id,
              content: JSON.stringify(
                result
              ),
            },
          ],
        },
      ],
    });

  return finalResponse.content;
}