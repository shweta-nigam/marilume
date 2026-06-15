"use client";

import { useState } from "react";

export default function AgentPage() {
  const [input, setInput] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  async function handleSubmit() {
    const res = await fetch(
      "/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      }
    );

    const data =
      await res.json();

    setResult(data);
  }

  return (
    <div className="p-10 text-white">
      <h1>Agent</h1>

      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        placeholder="Search emails..."
        className="border p-2"
      />

      <button
        onClick={handleSubmit}
        className="border px-4 py-2 ml-2"
      >
        Send
      </button>

      <pre>
        {JSON.stringify(
          result,
          null,
          2
        )}
      </pre>
    </div>
  );
}