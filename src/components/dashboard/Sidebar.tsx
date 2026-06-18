"use client";

import { useEffect, useState } from "react";
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
  PanelLeftClose,
  PanelLeftOpen,
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

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");

    if (saved) {
      setCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const renderLinks = (
    links: {
      href: string;
      label: string;
      icon: React.ElementType;
    }[],
  ) =>
    links.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          title={collapsed ? item.label : undefined}
          className={`group flex items-center rounded-xl border transition-all duration-200
          ${collapsed ? "justify-center p-3" : "gap-3 p-3"}
          ${
            pathname === item.href
              ? "border-primary/20 bg-primary/15 text-primary"
              : "border-transparent text-text-secondary hover:border-white/10 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon size={collapsed ? 22 : 18} className="shrink-0" />

          {!collapsed && <span className="truncate">{item.label}</span>}
        </Link>
      );
    });

  return (
    <aside
      className={`flex h-screen flex-col border-r border-border bg-surface transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        {/* {!collapsed ? (
          <div>
            <h2 className="text-xl font-bold text-white">
              Marilume
            </h2>
            <p className="text-xs text-text-secondary">
              AI Executive Assistant
            </p>
          </div>
        ) : (
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold">
            M
          </div>
        )} */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-text-secondary transition hover:bg-white/5 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="sidebar-scrollbar flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">{renderLinks(mainLinks)}</nav>

        <div className="my-6 border-t border-border" />

        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Workspace
          </p>
        )}

        <nav className="space-y-1">{renderLinks(workspaceLinks)}</nav>

        <div className="my-6 border-t border-border" />

        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Settings
          </p>
        )}

        <nav className="space-y-1">{renderLinks(settingsLinks)}</nav>

        <div className="my-6 border-t border-border" />

        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Coming Soon
          </p>
        )}

        <div className="space-y-1">
          {upcomingLinks.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                title={collapsed ? item.label : undefined}
                className={`rounded-xl p-3 text-text-secondary opacity-70 transition
                ${
                  collapsed
                    ? "flex justify-center"
                    : "flex items-center justify-between"
                }`}
              >
                <div
                  className={`flex items-center
                  ${collapsed ? "justify-center" : "gap-3"}`}
                >
                  <Icon size={18} />

                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && (
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                    Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
