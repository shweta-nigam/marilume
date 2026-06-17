"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Wrench,
  Plug,
  Settings,
  CreditCard,
  MessageSquare,
  FileText,
  Mic,
} from "lucide-react";

const mainLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/gmail",
    label: "Email",
    icon: Mail,
  },
  {
    href: "/dashboard/calendar",
    label: "Calendar",
    icon: Calendar,
  },
];

const workspaceLinks = [
  {
    href: "/dashboard/tools",
    label: "Tools",
    icon: Wrench,
  },
  {
    href: "/dashboard/integrations",
    label: "Integrations",
    icon: Plug,
  },
];

const settingsLinks = [
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: CreditCard,
  },
];

const upcomingLinks = [
  {
    label: "Slack",
    icon: MessageSquare,
  },
  {
    label: "Notion",
    icon: FileText,
  },
  {
    label: "Voice AI",
    icon: Mic,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderLinks = (
    links: {
      href: string;
      label: string;
      icon: React.ElementType;
    }[]
  ) =>
    links.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 rounded-xl p-3 transition
          ${
            pathname === item.href
              ? "bg-primary/15 text-primary border border-primary/20"
              : "text-text-secondary hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon size={18} />
          <span>{item.label}</span>
        </Link>
      );
    });

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-surface">
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-white">
          Marilume
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {renderLinks(mainLinks)}
        </nav>

        <div className="my-6 border-t border-border" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Workspace
        </p>

        <nav className="space-y-1">
          {renderLinks(workspaceLinks)}
        </nav>

        <div className="my-6 border-t border-border" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Settings
        </p>

        <nav className="space-y-1">
          {renderLinks(settingsLinks)}
        </nav>

        <div className="my-6 border-t border-border" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Coming Soon
        </p>

        <div className="space-y-1">
          {upcomingLinks.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl p-3 text-text-secondary opacity-70"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>

                <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  Soon
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}