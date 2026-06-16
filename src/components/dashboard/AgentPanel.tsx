export default function AgentPanel() {
  return (
    <div className="h-full bg-surface-elevated border border-border rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        AI Agent
      </h2>

      <div className="space-y-3">
        <div className="bg-background rounded-xl p-3">
          Summarize today's emails
        </div>

        <div className="bg-background rounded-xl p-3">
          Draft a reply
        </div>

        <div className="bg-background rounded-xl p-3">
          Find important messages
        </div>
      </div>

      <textarea
        className="w-full mt-6 h-40 rounded-xl bg-background border border-border p-3"
        placeholder="Ask your AI agent..."
      />

      <button className="w-full mt-4 bg-primary py-3 rounded-xl">
        Send
      </button>
    </div>
  );
}