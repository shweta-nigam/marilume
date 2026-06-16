import { createSdkMcpServer, query } from '@anthropic-ai/claude-agent-sdk';
import { ClaudeProvider } from '@corsair-dev/mcp';
import { corsair } from './src/server/corsair';

export const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const MODEL = "claude-haiku-4-5-20251001";

async function main() {
  const provider = new ClaudeProvider();

  const tools = await provider.build({
    corsair,
  });

  const server = createSdkMcpServer({
    name: 'corsair',
    tools,
  });

  const stream = query({
    prompt: 'List my latest unread emails',
    options: {
      model: 'claude-opus-4-6',
      mcpServers: {
        corsair: server,
      },
    },
  });

  for await (const event of stream) {
    if ('result' in event) {
      process.stdout.write(event.result);
    }
  }
}

main().catch(console.error);