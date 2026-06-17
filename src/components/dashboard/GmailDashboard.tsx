"use client";

import { useState } from "react";
import GmailPreview from "./GmailPreview";
import EmailDetail from "./EmailDetail";
import AgentPanel from "./AgentPanel";
import type { EmailSearchResult } from "@/services/email.service";

interface GmailDashboardProps {
  initialEmails: EmailSearchResult[];
}

export default function GmailDashboard({ initialEmails }: GmailDashboardProps) {
  const [selectedEmail, setSelectedEmail] = useState<EmailSearchResult | null>(
    initialEmails && initialEmails.length > 0 ? initialEmails[0] : null
  );
  const [replyText, setReplyText] = useState("");

  const handleSelectEmail = (email: EmailSearchResult) => {
    setSelectedEmail(email);
    setReplyText(""); // Reset reply editor when switching emails
  };

  return (
    <div className="grid grid-cols-6 gap-6 h-full text-white">
      <div className="col-span-2">
        <GmailPreview
          emails={initialEmails}
          selectedEmailId={selectedEmail?.id}
          onSelectEmail={handleSelectEmail}
        />
      </div>

      <div className="col-span-2">
        <EmailDetail
          email={selectedEmail}
          replyText={replyText}
          onReplyTextChange={setReplyText}
        />
      </div>

      <div className="col-span-2">
        <AgentPanel
          selectedEmail={selectedEmail}
          onClearSelectedEmail={() => setSelectedEmail(null)}
          onDraftGenerated={setReplyText}
        />
      </div>
    </div>
  );
}
