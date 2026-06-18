"use client";

import { useState } from "react";
import { Send, Trash2, Loader2, Sparkles, CornerUpLeft, Mail } from "lucide-react";
import type { EmailSearchResult } from "@/services/email.service";
import { sendReply } from "@/actions/email.action";
import { format, isToday } from "date-fns";
import { useRouter } from "next/navigation";

interface EmailDetailProps {
  email?: EmailSearchResult | null;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onBackToList?: () => void;
  onOpenAgent?: () => void;
}

export default function EmailDetail({
  email = null,
  replyText,
  onReplyTextChange,
  onBackToList,
  onOpenAgent,
}: EmailDetailProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  if (!email) {
    return (
      <div className="flex h-full flex-col justify-center items-center text-center p-6 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl relative">
        {onBackToList && (
          <button
            onClick={onBackToList}
            className="absolute top-4 left-4 lg:hidden flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 transition-colors"
          >
            ← Back to Inbox
          </button>
        )}
        <div className="rounded-full bg-white/5 p-4 mb-4">
          <Mail className="h-8 w-8 text-white/30" />
        </div>
        <h3 className="text-md font-semibold text-white">No conversation selected</h3>
        <p className="text-xs text-white/40 mt-1 max-w-xs">
          Select an email from the inbox list to read the full body, draft AI replies, and send messages.
        </p>
      </div>
    );
  }

  const handleSend = async () => {
    if (!replyText.trim() || loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await sendReply(email.id, replyText);
      if (res.success) {
        setSuccess(true);
        onReplyTextChange("");
        router.refresh();
      } else {
        setError(res.error || "Failed to send reply");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    onReplyTextChange("");
    setError("");
    setSuccess(false);
  };

  // Format date nicely
  let dateStr = "";
  if (email.createdAt) {
    const date = new Date(email.createdAt);
    if (isToday(date)) {
      dateStr = format(date, "HH:mm (O)");
    } else {
      dateStr = format(date, "MMM d, yyyy 'at' HH:mm");
    }
    }

  const isHtml = !!(
    email.body &&
    (email.body.includes("</div>") ||
      email.body.includes("</a>") ||
      email.body.includes("</p>") ||
      email.body.includes("<br") ||
      email.body.includes("<div") ||
      email.body.includes("<p ") ||
      email.body.includes("<html") ||
      email.body.includes("<body") ||
      email.body.includes("<table") ||
      /<(div|p|span|a|br|html|body|table|tr|td|style|meta|link|h[1-6])\b[^>]*>/i.test(email.body))
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Mobile Navigation Header */}
      {(onBackToList || onOpenAgent) && (
        <div className="lg:hidden flex items-center justify-between border-b border-white/10 p-3 bg-white/[0.04] shrink-0">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10 transition-colors"
            >
              ← Back to Inbox
            </button>
          )}
          {onOpenAgent && (
            <button
              onClick={onOpenAgent}
              className="flex items-center gap-1.5 text-xs bg-primary hover:bg-primary/95 text-white px-2.5 py-1.5 rounded-xl transition-all font-medium"
            >
              <Sparkles className="h-3.5 w-3.5" /> Mari AI Agent
            </button>
          )}
        </div>
      )}

      {/* Subject Line Header */}
      <div className="border-b border-white/10 px-6 py-4 bg-white/[0.02] shrink-0">
        <h2 className="text-lg font-bold text-white tracking-tight line-clamp-2">
          {email.subject || "(No Subject)"}
        </h2>
        
        <div className="mt-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
              {email.sender ? email.sender.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90">
                {email.sender}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-white/40">{dateStr}</span>
        </div>
      </div>

      {/* Body Area */}
      <div className={`flex-1 p-6  ${isHtml ? "overflow-hidden" : "overflow-y-auto"}`}>
      {/* <div className="flex-1 overflow-y-auto p-6 pb-[280px] min-h-0"> */}
        {email.body ? (
          isHtml ? (
            <iframe
              srcDoc={email.body}
              title="Email Content"
              className="w-full h-full border-0 bg-white rounded-2xl"
              sandbox="allow-popups allow-popups-to-escape-sandbox"
            />
          ) : (
            <div className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap font-sans break-words">
              {email.body}
            </div>
          )
        ) : (
          <div className="text-sm italic text-white/40">
            No message body available.
          </div>
        )}
      </div>

      {/* Reply Section */}
      <div className="absolute bottom-4 left-4 right-4 z-10 border border-white/10 bg-black/65 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 mb-2">
          <CornerUpLeft className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-white/60">Reply to this conversation</span>
        </div>

        {error && (
          <div className="mb-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-2 rounded-lg">
            Reply sent successfully!
          </div>
        )}

        <div className="relative">
          <textarea
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            placeholder="Write your response, or ask Mari on the right to draft a reply..."
            rows={3}
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-3
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              transition-all
              focus:border-primary
              resize-none
            "
          />
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div className="text-[10px] text-white/30 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary shrink-0" />
            <span>AI drafts will populate here automatically</span>
          </div>

          <div className="flex gap-2">
            {replyText.trim() && (
              <button
                onClick={handleDiscard}
                disabled={loading}
                className="
                  flex items-center gap-1.5
                  px-3 py-1.5
                  rounded-lg
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  text-xs text-white/70 hover:text-white
                  transition-colors
                  disabled:opacity-40
                "
              >
                <Trash2 className="h-3.5 w-3.5" /> Discard
              </button>
            )}

            <button
              onClick={handleSend}
              disabled={!replyText.trim() || loading}
              className="
                flex items-center gap-1.5
                px-4 py-1.5
                rounded-lg
                bg-primary
                hover:opacity-90
                text-xs font-semibold text-white
                transition-all
                disabled:opacity-40
                disabled:hover:opacity-40
              "
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Send Reply
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
