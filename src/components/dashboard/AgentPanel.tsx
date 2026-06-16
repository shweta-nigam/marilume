"use client";

import { useState } from "react";
import { Sparkles, SendHorizontal } from "lucide-react";

export default function AgentPanel() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    if (!message.trim() || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      setResponse(data.response ?? "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Mari
            </h2>

            <p className="text-xs text-white/50">
              Your Gmail & Calendar Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="border-b border-white/10 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            "Summarize my inbox",
            "Find important emails",
            "Show today's meetings",
            "Draft a reply",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setMessage(prompt)}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-3
                py-2
                text-xs
                text-white/70
                transition-all
                hover:border-primary/40
                hover:text-white
              "
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Response Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {response ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="whitespace-pre-wrap text-sm leading-7 text-white/90">
              {response}
            </p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="max-w-xs text-center text-sm text-white/40">
              Ask Marilume to search Gmail, summarize emails,
              draft replies, or manage your calendar.
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex gap-3">
          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask your AI agent..."
            className="
              min-h-[52px]
              flex-1
              resize-none
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all
              focus:border-primary
            "
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              flex
              h-[52px]
              w-[52px]
              items-center
              justify-center
              rounded-2xl
              bg-primary
              text-white
              transition-all
              hover:opacity-90
              disabled:opacity-50
            "
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}