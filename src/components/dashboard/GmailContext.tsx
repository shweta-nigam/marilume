"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { EmailSearchResult } from "@/services/email.service";
import { markThreadAsRead } from "@/actions/email.action";
import { useParams, useRouter } from "next/navigation";

interface GmailContextType {
  emails: EmailSearchResult[];
  selectedEmail: EmailSearchResult | null;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSelectEmail: (email: EmailSearchResult) => void;
  clearSelectedEmail: () => void;
  readEmailIds: string[];
  setActiveEmail: (email: EmailSearchResult | null) => void;
}

const GmailContext = createContext<GmailContextType | null>(null);

export function GmailProvider({
  children,
  initialEmails,
}: {
  children: React.ReactNode;
  initialEmails: EmailSearchResult[];
}) {
  const [emails] = useState<EmailSearchResult[]>(initialEmails);
  const [activeEmail, setActiveEmail] = useState<EmailSearchResult | null>(null);
  const [replyText, setReplyText] = useState("");
  const [readEmailIds, setReadEmailIds] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const emailId = params?.emailId as string | undefined;

  // Find the selected email either from activeEmail state or the initialEmails list
  const selectedEmail =
    activeEmail || emails.find((e) => e.id === emailId) || null;

  // Mark selected email as read when it changes
  useEffect(() => {
    if (selectedEmail && selectedEmail.unread && !readEmailIds.includes(selectedEmail.id)) {
      setReadEmailIds((prev) => [...prev, selectedEmail.id]);
      markThreadAsRead(selectedEmail.id).catch(console.error);
    }
  }, [selectedEmail, readEmailIds]);

  const handleSelectEmail = (email: EmailSearchResult) => {
    setReplyText("");
    if (email.unread && !readEmailIds.includes(email.id)) {
      setReadEmailIds((prev) => [...prev, email.id]);
      markThreadAsRead(email.id).catch(console.error);
    }
    router.push(`/dashboard/gmail/${email.id}`);
  };

  const clearSelectedEmail = () => {
    router.push("/dashboard/gmail");
  };

  const optimizedEmails = emails.map((email) => ({
    ...email,
    unread: readEmailIds.includes(email.id) ? false : email.unread,
  }));

  return (
    <GmailContext.Provider
      value={{
        emails: optimizedEmails,
        selectedEmail,
        replyText,
        setReplyText,
        handleSelectEmail,
        clearSelectedEmail,
        readEmailIds,
        setActiveEmail,
      }}
    >
      {children}
    </GmailContext.Provider>
  );
}

export function useGmail() {
  const context = useContext(GmailContext);
  if (!context) {
    throw new Error("useGmail must be used within a GmailProvider");
  }
  return context;
}
