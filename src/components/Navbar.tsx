"use client";

import Link from "next/link";

const navLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Problems",
    href: "#problems",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  }, 
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="mx-auto max-w-7xl">
        <nav
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-surface/50
            px-6
            py-4
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-primary
                font-bold
                text-white
                shadow-[0_0_30px_rgba(240,28,112,0.4)]
              "
            >
              M
            </div>

            <span
              className="
                font-heading
                text-xl
                font-bold
                text-text
              "
            >
              Marilume
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-sm
                  text-text-secondary
                  transition-colors
                  hover:text-primary
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="
                hidden
                rounded-xl
                border
                border-border
                px-5
                py-2.5
                text-sm
                text-text
                transition-all
                hover:border-primary/40
                md:block
              "
            >
              Sign In
            </button>

            <button
              className="
                rounded-xl
                bg-primary
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(240,28,112,0.4)]
              "
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}