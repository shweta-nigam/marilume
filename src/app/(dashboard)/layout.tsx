"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  CalendarDays,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-background text-text">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen">
        <aside className="w-[290px] border-r border-border bg-surface/80 backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h1 className="text-lg font-semibold">
                    Marilume
                  </h1>
                  <p className="text-xs text-text-secondary">
                    Integrations
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="mb-3 px-3 text-xs uppercase tracking-[0.2em] text-text-secondary">
                Workspace
              </p>

              <div className="space-y-2">
                <Link
                  href="/dashboard/gmail"
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                    pathname === "/dashboard/gmail"
                      ? "border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_rgba(240,28,112,0.15)]"
                      : "border-transparent hover:border-border hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>Gmail</span>
                  </div>

                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/dashboard/calendar"
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                    pathname === "/dashboard/calendar"
                      ? "border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_rgba(240,28,112,0.15)]"
                      : "border-transparent hover:border-border hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} />
                    <span>Calendar</span>
                  </div>

                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="mt-auto p-5">
              <div className="rounded-3xl border border-border bg-surface-elevated p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400" />

                  <span className="text-sm font-medium">
                    Connected
                  </span>
                </div>

                <p className="text-sm text-text-secondary">
                  Gmail and Calendar integrations ready.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>
      </div>
    </div>
  );
}