"use client";

import React from "react";
import { GmailProvider, useGmail } from "./GmailContext";
import AgentPanel from "./AgentPanel";
import { useRouter } from "next/navigation";

export default function GmailProviderWrapper({
  initialEmails,
  children,
}: {
  initialEmails: any[];
  children: React.ReactNode;
}) {
  return (
    <GmailProvider initialEmails={initialEmails}>
      <GmailDashboardLayoutInner>{children}</GmailDashboardLayoutInner>
    </GmailProvider>
  );
}

function GmailDashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { selectedEmail, clearSelectedEmail, setReplyText } = useGmail();
  const router = useRouter();

  return (
    <div className="flex h-full gap-6 text-white p-4 md:p-8">
      {/* Main content area (about 70% of available width after the sidebar) */}
      <div className="w-[70%] h-full flex flex-col min-w-0">
        {children}
      </div>

      {/* Agent panel area (about 30% of available width after the sidebar) */}
      <div className="w-[30%] h-full flex flex-col min-w-[320px]">
        <AgentPanel
          selectedEmail={selectedEmail}
          onClearSelectedEmail={clearSelectedEmail}
          onDraftGenerated={(text) => {
            setReplyText(text);
            if (selectedEmail) {
              router.push(`/dashboard/gmail/${selectedEmail.id}`);
            }
          }}
        />
      </div>
    </div>
  );
}
