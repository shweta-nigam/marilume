"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { EmailSearchResult } from "@/services/email.service";

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
  const [search, setSearch] = useState("");

const filteredEmails = useMemo(() => {
  const emailList = emails ?? [];

  if (!search.trim()) {
    return emailList;
  }

  return emailList.filter((email) =>
    email.snippet
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
}, [emails, search]);


  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emails..."
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
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/50">
              Loading emails...
            </p>
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/50">
              No emails found
            </p>
          </div>
        ) : (
          <div className="p-3">
            {filteredEmails.map((email) => {
              const active =
                selectedEmailId === email.id;

              return (
                <button
                  key={email.id}
                  onClick={() =>
                    onSelectEmail?.(email)
                  }
                  className={`
                    mb-2
                    w-full
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-200

                    ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-xs text-white/40">
                      {email.id}
                    </span>

                    <span className="text-xs text-white/40">
                      {email.createdAt
                        ? new Date(
                            email.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-3 text-sm text-white/90">
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