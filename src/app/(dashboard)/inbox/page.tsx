"use client";

import { authClient } from "@/lib/auth-client";
import {
  Search,
  Inbox,
  Star,
  Send,
  Archive,
  Trash2,
  Sparkles,
  Clock,
  ChevronDown,
} from "lucide-react";

export default function InboxPage() {
  const { data: session } = authClient.useSession();

  const emails = [
    {
      sender: "Sarah Chen",
      subject: "Product roadmap discussion",
      preview: "Let's review the Q4 roadmap tomorrow...",
      time: "2m",
      unread: true,
    },
    {
      sender: "Stripe",
      subject: "Payment received",
      preview: "Your monthly subscription has been processed...",
      time: "1h",
      unread: false,
    },
    {
      sender: "GitHub",
      subject: "New pull request",
      preview: "A new pull request was opened on your repo...",
      time: "3h",
      unread: false,
    },
    {
      sender: "Alex Morgan",
      subject: "Design feedback",
      preview: "I've attached the updated dashboard screens...",
      time: "5h",
      unread: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <div className="flex h-screen">
        {/* SIDEBAR */}
        <aside className="w-[280px] border-r border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-xl">
          <div className="p-6">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
                <Sparkles size={20} />
              </div>

              <div>
                <h1 className="font-bold text-lg">Marilume</h1>
                <p className="text-xs text-[var(--text-secondary)]">
                  AI Email Workspace
                </p>
              </div>
            </div>

            <button className="mb-8 w-full rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-4 py-3 font-medium transition hover:opacity-90">
              Compose
            </button>

            <nav className="space-y-2">
              <SidebarItem
                icon={<Inbox size={18} />}
                label="Inbox"
                active
              />

              <SidebarItem
                icon={<Star size={18} />}
                label="Important"
              />

              <SidebarItem
                icon={<Send size={18} />}
                label="Sent"
              />

              <SidebarItem
                icon={<Archive size={18} />}
                label="Archive"
              />

              <SidebarItem
                icon={<Trash2 size={18} />}
                label="Trash"
              />
            </nav>
          </div>
        </aside>

        {/* EMAIL LIST */}
        <section className="w-[420px] border-r border-[var(--border)] bg-[var(--surface)]/40">
          <div className="border-b border-[var(--border)] p-5">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />

              <input
                placeholder="Search emails..."
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] py-3 pl-11 pr-4 outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {emails.map((email, index) => (
              <div
                key={index}
                className="cursor-pointer border-b border-[var(--border)] p-5 transition hover:bg-white/5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3
                    className={`${
                      email.unread ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {email.sender}
                  </h3>

                  <span className="text-xs text-[var(--text-secondary)]">
                    {email.time}
                  </span>
                </div>

                <p className="mb-1 truncate text-sm font-medium">
                  {email.subject}
                </p>

                <p className="truncate text-sm text-[var(--text-secondary)]">
                  {email.preview}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EMAIL PREVIEW */}
        <main className="flex-1 overflow-y-auto">
          <header className="flex items-center justify-between border-b border-[var(--border)] p-6">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Welcome back
              </p>

              <h2 className="text-2xl font-bold">
                {session?.user?.name || "User"}
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
              )}

              <div>
                <p className="font-medium">
                  {session?.user?.name}
                </p>

                <p className="text-xs text-[var(--text-secondary)]">
                  {session?.user?.email}
                </p>
              </div>

              <ChevronDown size={16} />
            </div>
          </header>

          <div className="p-8">
            {/* AI SUMMARY */}
            <div className="mb-6 rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles
                  size={18}
                  className="text-[var(--primary)]"
                />

                <h3 className="font-semibold">
                  AI Summary
                </h3>
              </div>

              <p className="leading-7 text-[var(--text-secondary)]">
                You received 14 emails today. 3 require action,
                2 meeting requests need scheduling, and 1
                customer email appears urgent.
              </p>
            </div>

            {/* MAIN EMAIL */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-lg font-bold">
                  S
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Product roadmap discussion
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)]">
                    Sarah Chen • sarah@company.com
                  </p>
                </div>
              </div>

              <div className="mb-8 space-y-4 text-[var(--text-secondary)] leading-8">
                <p>Hey there,</p>

                <p>
                  I'd love to review the roadmap for the
                  upcoming quarter and discuss feature
                  priorities before the leadership meeting.
                </p>

                <p>
                  Are you available tomorrow afternoon for a
                  quick discussion?
                </p>

                <p>Best regards,</p>

                <p>Sarah</p>
              </div>

              <div className="flex gap-3">
                <button className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-5 py-3 font-medium">
                  Reply with AI
                </button>

                <button className="rounded-xl border border-[var(--border)] px-5 py-3">
                  Schedule Meeting
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StatCard title="Unread" value="12" />
              <StatCard title="AI Actions" value="7" />
              <StatCard title="Scheduled" value="3" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition ${
        active
          ? "bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 text-white"
          : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        {title}
      </p>

      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}