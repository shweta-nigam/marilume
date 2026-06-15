import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { MODEL } from "./agent";

const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

async function main() {
  const response = await claude.messages.create({
    model:MODEL,
    max_tokens: 50,
    messages: [
      {
        role: "user",
        content: "Say hello",
      },
    ],
  });

  console.log(response.content);
}

main();