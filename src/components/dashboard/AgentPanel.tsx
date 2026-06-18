"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Mail, FileText, CornerUpLeft } from "lucide-react";
import type { EmailSearchResult } from "@/services/email.service";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface AgentPanelProps {
  selectedEmail?: EmailSearchResult | null;
  onClearSelectedEmail?: () => void;
  onDraftGenerated?: (text: string) => void;
  onBackToDetail?: () => void;
}

export default function AgentPanel({
  selectedEmail = null,
  onClearSelectedEmail,
  onDraftGenerated,
  onBackToDetail,
}: AgentPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          selectedEmail: selectedEmail
            ? {
                id: selectedEmail.id,
                sender: selectedEmail.sender,
                subject: selectedEmail.subject,
                snippet: selectedEmail.snippet,
              }
            : null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        let text = data.response || "";
        const draftRegex = /\[DRAFT\]([\s\S]*?)\[\/DRAFT\]/i;
        const match = text.match(draftRegex);

        if (match && match[1]) {
          const draftContent = match[1].trim();
          if (onDraftGenerated) {
            onDraftGenerated(draftContent);
          }
          text = text.replace(draftRegex, "").trim();
          if (!text) {
            text = "I have drafted a reply for you! You can review, edit, and send it in the reply section in the center panel.";
          }
        }

        setMessages((prev) => [...prev, { role: "assistant", text }]);
        router.refresh();
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: `Error: ${data.error || "Something went wrong."}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Network error: ${err.message || "Failed to contact agent."}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleContextAction = (actionType: "summarize" | "reply") => {
    if (!selectedEmail) return;

    let prompt = "";
    if (actionType === "summarize") {
      prompt = `Summarize this email from "${selectedEmail.sender}" regarding "${selectedEmail.subject}": "${selectedEmail.snippet}"`;
    } else if (actionType === "reply") {
      prompt = `Draft a polite reply to this email from "${selectedEmail.sender}" regarding "${selectedEmail.subject}": "${selectedEmail.snippet}". You MUST wrap the draft reply inside [DRAFT] and [/DRAFT] tags.`;
    }

    handleSendMessage(prompt);
  };

  return (
    <div className="sidebar-scrollbar flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Mobile Back Header */}
      {onBackToDetail && (
        <div className="lg:hidden flex items-center border-b border-white/10 p-4 bg-white/[0.04]">
          <button
            onClick={onBackToDetail}
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 transition-colors"
          >
            ← Back to Email
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Mari AI Agent</h2>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-center items-center text-center p-6 space-y-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-white">Ask Mari</h3>
              <p className="text-xs text-white/40 mt-1 max-w-xs">
                Your AI assistant powered by Claude and Corsair. I can summarize, search, draft, or perform actions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              <button
                onClick={() => handleQuickAction("Summarize my recent emails")}
                className="w-full text-left text-xs bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] p-3 rounded-xl transition-all duration-200"
              >
                📧 Summarize today's emails
              </button>
              <button
                onClick={() => handleQuickAction("Find important emails that need attention")}
                className="w-full text-left text-xs bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] p-3 rounded-xl transition-all duration-200"
              >
                ⚠️ Find important messages
              </button>
              <button
                onClick={() => handleQuickAction("Show me what is on my calendar today")}
                className="w-full text-left text-xs bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] p-3 rounded-xl transition-all duration-200"
              >
                📅 List calendar events
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[85%] ${
                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none whitespace-pre-wrap"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2 mr-auto bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input / Control Area */}
      <div className="border-t border-white/10 p-4 bg-white/[0.01]">
        {/* Selected Email Context Panel */}
        {selectedEmail && (
          <div className="mb-3 p-3 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
              <div className="truncate pr-2">
                <span className="font-semibold text-white pr-1">Selected:</span>
                <span className="text-white/70">{selectedEmail.sender}</span>
                <span className="text-white/40 px-1">—</span>
                <span className="text-white/60 italic">{selectedEmail.subject}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleContextAction("summarize")}
                className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded-md text-white/80 transition-colors"
              >
                <FileText className="h-3 w-3" /> Summarize
              </button>
              <button
                onClick={() => handleContextAction("reply")}
                className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded-md text-white/80 transition-colors"
              >
                <CornerUpLeft className="h-3 w-3" /> Draft Reply
              </button>
              <button
                onClick={onClearSelectedEmail}
                className="text-white/40 hover:text-white p-1"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              selectedEmail
                ? `Ask Mari about this email...`
                : "Ask Mari to summarize, search, or draft..."
            }
            className="
              flex-1
              h-11
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all
              focus:border-primary
            "
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="
              h-11
              w-11
              rounded-xl
              bg-primary
              flex
              items-center
              justify-center
              text-white
              hover:opacity-90
              disabled:opacity-40
              disabled:hover:opacity-40
              transition-all
            "
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}