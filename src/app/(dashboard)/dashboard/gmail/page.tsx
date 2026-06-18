"use client";

import GmailPreview from "@/components/dashboard/GmailPreview";
import { useGmail } from "@/components/dashboard/GmailContext";

export default function GmailListPage() {
  const { emails, selectedEmail, handleSelectEmail } = useGmail();

  return (
    <div className="h-full">
      <GmailPreview
        emails={emails}
        selectedEmailId={selectedEmail?.id || undefined}
        onSelectEmail={handleSelectEmail}
      />
    </div>
  );
}