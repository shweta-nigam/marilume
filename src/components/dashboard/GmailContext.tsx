"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { EmailSearchResult } from "@/services/email.service";
import { markThreadAsRead, searchEmailsAction } from "@/actions/email.action";
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
  
  // Search features
  searchQuery: string;
  searchResults: EmailSearchResult[] | null;
  isSearching: boolean;
  executeSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

const GmailContext = createContext<GmailContextType | null>(null);

export function GmailProvider({
  children,
  initialEmails,
}: {
  children: React.ReactNode;
  initialEmails: EmailSearchResult[];
}) {
  const [emails, setEmails] = useState<EmailSearchResult[]>(initialEmails);
  const [activeEmail, setActiveEmail] = useState<EmailSearchResult | null>(null);
  const [replyText, setReplyText] = useState("");
  const [readEmailIds, setReadEmailIds] = useState<string[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<EmailSearchResult[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const params = useParams();
  const router = useRouter();
  const emailId = params?.emailId as string | undefined;

  // Sync initialEmails with state
  useEffect(() => {
    setEmails(initialEmails);
  }, [initialEmails]);

  // The active list of emails is either search results or the default recent emails
  const activeEmailsList = searchResults !== null ? searchResults : emails;

  // Find the selected email either from activeEmail state or the active list of emails
  const selectedEmail =
    activeEmail || activeEmailsList.find((e) => e.id === emailId) || null;

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

  const executeSearch = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      clearSearch();
      return;
    }
    setIsSearching(true);
    setSearchQuery(trimmed);
    try {
      const results = await searchEmailsAction(trimmed);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  const optimizedEmails = activeEmailsList.map((email) => ({
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
        searchQuery,
        searchResults,
        isSearching,
        executeSearch,
        clearSearch,
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
