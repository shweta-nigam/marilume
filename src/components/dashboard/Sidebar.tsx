"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Calendar,
} from "lucide-react";

const links = [
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-border bg-surface text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          Marilume
        </h2>
      </div>

      <nav className="space-y-2 px-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition
              ${
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}