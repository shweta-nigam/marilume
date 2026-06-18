"use client";

import { useState, useEffect } from "react";
import GmailPreview from "./GmailPreview";
import EmailDetail from "./EmailDetail";
import AgentPanel from "./AgentPanel";
import type { EmailSearchResult } from "@/services/email.service";
import { markThreadAsRead } from "@/actions/email.action";

interface GmailDashboardProps {
  initialEmails: EmailSearchResult[];
}

export default function GmailDashboard({ initialEmails }: GmailDashboardProps) {
  const [selectedEmail, setSelectedEmail] = useState<EmailSearchResult | null>(
    initialEmails && initialEmails.length > 0 ? initialEmails[0] : null
  );
  const [replyText, setReplyText] = useState("");
  const [readEmailIds, setReadEmailIds] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<"list" | "detail" | "agent">("list");

  // Mark first email as read on load
  useEffect(() => {
    const firstEmail = initialEmails && initialEmails.length > 0 ? initialEmails[0] : null;
    if (firstEmail && firstEmail.unread && !readEmailIds.includes(firstEmail.id)) {
      setReadEmailIds((prev) => [...prev, firstEmail.id]);
      markThreadAsRead(firstEmail.id).catch(console.error);
    }
  }, [initialEmails]);

  const handleSelectEmail = (email: EmailSearchResult) => {
    setSelectedEmail(email);
    setReplyText(""); // Reset reply editor when switching emails
    setActiveView("detail"); // Switch to details view on mobile
    
    if (email.unread && !readEmailIds.includes(email.id)) {
      setReadEmailIds((prev) => [...prev, email.id]);
      markThreadAsRead(email.id).catch(console.error);
    }
  };

  const optimizedEmails = initialEmails.map((email) => ({
    ...email,
    unread: readEmailIds.includes(email.id) ? false : email.unread,
  }));

  return (
    <div className="grid grid-cols-6 gap-6 h-full text-white">
      <div className={`col-span-6 lg:col-span-2 h-full ${activeView === "list" ? "block" : "hidden lg:block"}`}>
        <GmailPreview
          emails={optimizedEmails}
          selectedEmailId={selectedEmail?.id}
          onSelectEmail={handleSelectEmail}
        />
      </div>

      <div className={`col-span-6 lg:col-span-2 h-full ${activeView === "detail" ? "block" : "hidden lg:block"}`}>
        <EmailDetail
          email={selectedEmail}
          replyText={replyText}
          onReplyTextChange={setReplyText}
          onBackToList={() => setActiveView("list")}
          onOpenAgent={() => setActiveView("agent")}
        />
      </div>

      <div className={`col-span-6 lg:col-span-2 h-full ${activeView === "agent" ? "block" : "hidden lg:block"}`}>
        <AgentPanel
          selectedEmail={selectedEmail}
          onClearSelectedEmail={() => {
            setSelectedEmail(null);
            setActiveView("list");
          }}
          onDraftGenerated={(text) => {
            setReplyText(text);
            setActiveView("detail"); // Go back to details to see the draft
          }}
          onBackToDetail={() => setActiveView("detail")}
        />
      </div>
    </div>
  );
}
