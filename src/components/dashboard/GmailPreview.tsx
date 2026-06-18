"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import type { EmailSearchResult } from "@/services/email.service";
import { format, isToday } from "date-fns";
import { useGmail } from "./GmailContext";

interface GmailPreviewProps {
  emails: EmailSearchResult[];
  loading?: boolean;
  selectedEmailId?: string;
  onSelectEmail?: (email: EmailSearchResult) => void;
}

export default function GmailPreview({
  emails = [],
  loading = false,
  selectedEmailId,
  onSelectEmail,
}: GmailPreviewProps) {
  const { searchQuery, executeSearch, clearSearch, isSearching } = useGmail();
  const [search, setSearch] = useState(searchQuery);

  // Sync search state if changed externally (e.g. cleared)
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch(search);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (!val.trim()) {
      clearSearch();
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <input
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search emails (press Enter)..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all
              focus:border-primary
            "
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading || isSearching ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/50">
              {isSearching ? "Searching inbox..." : "Loading emails..."}
            </p>
          </div>
        ) : emails.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/50">
              No emails found
            </p>
          </div>
        ) : (
          <div className="p-3">
            {emails.map((email) => {
              const active = selectedEmailId === email.id;
              const unread = email.unread ?? false;

              // Format date nicely
              let dateStr = "";
            if (email.createdAt) {
  const date = new Date(email.createdAt);

  if (isToday(date)) {
    dateStr = format(date, "HH:mm");
  } else {
    dateStr = format(date, "MMM d");
  }
}
              return (
                <button
                  key={email.id}
                  onClick={() => onSelectEmail?.(email)}
                  className={`
                    mb-2
                    w-full
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-200
                    flex
                    flex-col
                    relative

                    ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  {/* Unread dot indicator */}
                  {unread && (
                    <span className="absolute top-5 left-2 w-2 h-2 rounded-full bg-primary" />
                  )}

                  <div className={`flex items-start justify-between gap-4 w-full ${unread ? "pl-2" : ""}`}>
                    <span className={`truncate text-sm ${unread ? "font-bold text-white" : "font-medium text-white/80"}`}>
                      {email.sender || "Unknown"}
                    </span>

                    <span className="text-xs text-white/40 whitespace-nowrap">
                      {dateStr}
                    </span>
                  </div>

                  <div className={`mt-1 truncate text-xs w-full ${unread ? "font-semibold text-white/90" : "text-white/60"} ${unread ? "pl-2" : ""}`}>
                    {email.subject || "(No Subject)"}
                  </div>

                  <p className={`mt-2 line-clamp-2 text-xs text-white/40 ${unread ? "pl-2" : ""}`}>
                    {email.snippet}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}