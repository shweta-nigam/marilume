"use client";

import { useEffect } from "react";
import { useGmail } from "./GmailContext";
import EmailDetail from "./EmailDetail";
import type { EmailSearchResult } from "@/services/email.service";

export default function GmailDetailClient({
  initialEmail,
}: {
  initialEmail: EmailSearchResult;
}) {
  const { replyText, setReplyText, clearSelectedEmail, setActiveEmail } = useGmail();

  // Sync active email details with the outer context provider
  useEffect(() => {
    setActiveEmail(initialEmail);
    return () => {
      setActiveEmail(null);
    };
  }, [initialEmail, setActiveEmail]);

  return (
    <div className="h-full">
      <EmailDetail
        email={initialEmail}
        replyText={replyText}
        onReplyTextChange={setReplyText}
        onBackToList={clearSelectedEmail}
      />
    </div>
  );
}
