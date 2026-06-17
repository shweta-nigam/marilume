"use client";

import Link from "next/link";
import {
  Mail,
  Calendar,
  Bot,
  Plug,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Unread Emails",
    value: "42",
    icon: Mail,
  },
  {
    title: "Upcoming Events",
    value: "8",
    icon: Calendar,
  },
  {
    title: "AI Tasks Completed",
    value: "127",
    icon: Bot,
  },
  {
    title: "Connected Services",
    value: "2",
    icon: Plug,
  },
];

const recentEmails = [
  {
    sender: "Stripe",
    subject: "Monthly Usage Report",
  },
  {
    sender: "Vercel",
    subject: "Deployment Successful",
  },
  {
    sender: "Google",
    subject: "Security Alert",
  },
];

const upcomingEvents = [
  "Product Review Meeting",
  "Marketing Sync",
  "Client Demo",
  "Team Standup",
];

const agentActivity = [
  "Inbox summarized successfully",
  "Generated follow-up email draft",
  "Detected 3 priority conversations",
  "Scheduled calendar reminder",
  "Prepared meeting agenda",
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-text relative overflow-hidden">
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg-img-2.png')",
        }}
      />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary" size={24} />

            <h1 className="text-4xl font-bold font-heading">
              AI Workspace
            </h1>
          </div>

          <p className="text-text-secondary mt-3 max-w-2xl">
            Manage Gmail and Google Calendar with AI-powered
            automation, summaries, scheduling, and task execution.
          </p>
        </div>

        {/* Stats */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon size={20} />}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/gmail"
              className="rounded-3xl border border-border bg-surface-elevated p-5 hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between">
                <Mail className="text-primary" />

                <ArrowRight size={18} />
              </div>

              <h3 className="font-semibold mt-5">
                Open Gmail
              </h3>

              <p className="text-text-secondary text-sm mt-2">
                View inbox and manage conversations.
              </p>
            </Link>

            <Link
              href="/dashboard/calendar"
              className="rounded-3xl border border-border bg-surface-elevated p-5 hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between">
                <Calendar className="text-primary" />

                <ArrowRight size={18} />
              </div>

              <h3 className="font-semibold mt-5">
                Open Calendar
              </h3>

              <p className="text-text-secondary text-sm mt-2">
                View events and manage schedule.
              </p>
            </Link>

            <button className="text-left rounded-3xl border border-border bg-surface-elevated p-5 hover:border-primary transition-all">
              <Bot className="text-primary" />

              <h3 className="font-semibold mt-5">
                Summarize Inbox
              </h3>

              <p className="text-text-secondary text-sm mt-2">
                Let AI summarize important emails.
              </p>
            </button>

            <button className="text-left rounded-3xl border border-border bg-surface-elevated p-5 hover:border-primary transition-all">
              <Calendar className="text-primary" />

              <h3 className="font-semibold mt-5">
                Schedule Meeting
              </h3>

              <p className="text-text-secondary text-sm mt-2">
                Find availability and create events.
              </p>
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Gmail */}
          <div className="rounded-3xl border border-border bg-surface-elevated p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Gmail Integration
              </h2>

              <span className="text-green-400 text-sm">
                Connected
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-text-secondary">
                  Unread Messages
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  42
                </h3>
              </div>

              <div>
                <p className="text-text-secondary">
                  AI Summaries Generated
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  18
                </h3>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="rounded-3xl border border-border bg-surface-elevated p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Google Calendar
              </h2>

              <span className="text-green-400 text-sm">
                Connected
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-text-secondary">
                  Events Today
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  5
                </h3>
              </div>

              <div>
                <p className="text-text-secondary">
                  Available Time Slots
                </p>

                <h3 className="text-3xl font-bold mt-1">
                  3
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Emails + Events */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Emails */}
          <div className="rounded-3xl border border-border bg-surface-elevated p-6">
            <h2 className="text-xl font-semibold mb-5">
              Recent Emails
            </h2>

            <div className="space-y-4">
              {recentEmails.map((email) => (
                <div
                  key={email.subject}
                  className="border-b border-border pb-4"
                >
                  <p className="font-medium">
                    {email.sender}
                  </p>

                  <p className="text-text-secondary text-sm">
                    {email.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="rounded-3xl border border-border bg-surface-elevated p-6">
            <h2 className="text-xl font-semibold mb-5">
              Upcoming Events
            </h2>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event}
                  className="border-b border-border pb-4"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Feed */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6">
          <h2 className="text-xl font-semibold mb-6">
            Agent Activity
          </h2>

          <div className="space-y-4">
            {agentActivity.map((activity) => (
              <div
                key={activity}
                className="border-b border-border pb-4 text-text-secondary"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface-elevated p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-text-secondary text-sm">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {value}
          </h3>
        </div>

        <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}