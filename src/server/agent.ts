import Anthropic from "@anthropic-ai/sdk";

export const MODEL =
  "claude-haiku-4-5-20251001";

let anthropicInstance: Anthropic | null = null;

export const anthropic = new Proxy({} as any, {
  get(target, prop, receiver) {
    if (!anthropicInstance) {
      console.log("[Anthropic] Initializing Anthropic client...");
      anthropicInstance = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "",
      });
    }
    return Reflect.get(anthropicInstance, prop, receiver);
  }
});