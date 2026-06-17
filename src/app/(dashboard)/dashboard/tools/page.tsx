"use client";

import {
  Mail,
  Calendar,
  FileSpreadsheet,
  HardDrive,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const integrations = [
  {
    title: "Gmail",
    description:
      "Read, search, summarize and draft emails using AI-powered workflows.",
    icon: Mail,
    status: "available",
    connectUrl: "/api/gmail/connect",
    features: [
      "Read emails",
      "Search inbox",
      "Draft replies",
      "Summarize threads",
    ],
  },
  {
    title: "Google Calendar",
    description:
      "Create events, manage schedules and find meeting availability instantly.",
    icon: Calendar,
    status: "available",
    connectUrl: "/api/google/connect/calendar",
    features: [
      "Create events",
      "Manage meetings",
      "Check availability",
      "Smart scheduling",
    ],
  },
  {
    title: "Google Sheets",
    description:
      "Analyze spreadsheets, generate reports and automate workflows with AI.",
    icon: FileSpreadsheet,
    status: "coming-soon",
    features: [
      "Spreadsheet analysis",
      "Generate reports",
      "Formula assistance",
      "Data insights",
    ],
  },
  {
    title: "Google Drive",
    description:
      "Search files, summarize documents and find information instantly.",
    icon: HardDrive,
    status: "coming-soon",
    features: [
      "File search",
      "Document summaries",
      "AI-powered retrieval",
      "Smart organization",
    ],
  },
];

const futureIntegrations = [
  "Google Docs",
  "Slack",
  "GitHub",
  "Zoom",
  "Notion",
  "Discord",
  "Jira",
  "Dropbox",
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-secondary/10 blur-[120px]" />

        <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Hero */}
        <section className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm text-text-secondary backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-primary" />
            Workspace Integrations
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
            Connect Your
            <span className="block bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent">
              Workspace
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Bring your emails, calendars, documents and files into Marilume. Let
            AI organize, search, summarize and automate your work.
          </p>
        </section>

        {/* Integrations Grid */}
        <section>
          <div className="grid gap-8 md:grid-cols-2">
            {integrations.map((integration) => {
              const Icon = integration.icon;

              return (
                <div
                  key={integration.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/70">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>

                      {integration.status === "available" ? (
                        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Available
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <Clock3 className="h-3 w-3" />
                          Coming Soon
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h2 className="mt-6 text-2xl font-semibold">
                      {integration.title}
                    </h2>

                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {integration.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {integration.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      disabled={integration.status !== "available"}
                      onClick={() => {
                        if (integration.connectUrl) {
                          window.location.href = integration.connectUrl;
                        }
                      }}
                      className={`mt-8 flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition-all ${
                        integration.status === "available"
                          ? "bg-gradient-to-r from-primary to-secondary text-white hover:scale-[1.03]"
                          : "cursor-not-allowed border border-border bg-background/50 text-text-secondary"
                      }`}
                    >
                      {integration.status === "available"
                        ? `Connect ${integration.title}`
                        : "Coming Soon"}

                      {integration.status === "available" && (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Future Integrations */}
        <section className="mt-24">
          <div className="rounded-3xl border border-border bg-surface/70 p-10 backdrop-blur-xl">
            <h3 className="text-center text-3xl font-semibold">
              More Integrations Coming
            </h3>

            <p className="mt-4 text-center text-text-secondary">
              Marilume is expanding rapidly. Connect your entire workflow from
              one intelligent workspace.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {futureIntegrations.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-border bg-background/60 px-5 py-2 text-sm text-text-secondary transition-all hover:border-primary/40 hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 via-surface to-surface p-12 text-center">
            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold">
                One Workspace.
                <br />
                Unlimited Productivity.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-text-secondary">
                Connect your tools once and let Marilume handle emails,
                schedules, documents and workflows through natural language.
              </p>

              <button className="mt-8 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-4 font-medium text-white transition-transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
