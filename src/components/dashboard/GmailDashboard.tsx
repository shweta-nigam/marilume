"use client";

import { useState } from "react";
import GmailPreview from "./GmailPreview";
import AgentPanel from "./AgentPanel";
import type { EmailSearchResult } from "@/services/email.service";

interface GmailDashboardProps {
  initialEmails: EmailSearchResult[];
}

export default function GmailDashboard({ initialEmails }: GmailDashboardProps) {
  const [selectedEmail, setSelectedEmail] = useState<EmailSearchResult | null>(null);

  return (
    <div className="grid grid-cols-5 gap-6 h-full text-white">
      <div className="col-span-3">
        <GmailPreview
          emails={initialEmails}
          selectedEmailId={selectedEmail?.id}
          onSelectEmail={setSelectedEmail}
        />
      </div>

      <div className="col-span-2">
        <AgentPanel
          selectedEmail={selectedEmail}
          onClearSelectedEmail={() => setSelectedEmail(null)}
        />
      </div>
    </div>
  );
}
