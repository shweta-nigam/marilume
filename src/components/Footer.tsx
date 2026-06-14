"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaDiscord,
} from "react-icons/fa6";

const footerLinks = {
  Product: [
    "Features",
    "How It Works",
    "Automations",
    "Integrations",
  ],

  Resources: [
    "Documentation",
    "API",
    "Guides",
    "Support",
  ],

  Company: [
    "About",
    "Privacy",
    "Terms",
    "Contact",
  ],
};

const socialLinks = [
  {
    icon: FaGithub,
    href: "#",
  },
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    icon: FaDiscord,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-background/40  border-border">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* CTA Section */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-10
            border-b
            border-border
            py-24
            text-center
            lg:flex-row
            lg:text-left
          "
        >
          <div className="max-w-2xl">
            <h2
              className="
                font-heading
                text-4xl
                font-bold
                tracking-[-0.04em]
                text-text
                md:text-6xl
              "
            >
              Ready to turn
              <span className="block text-primary">
                complexity into flow?
              </span>
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-text-secondary
              "
            >
              Connect your tools, automate repetitive work,
              and build workflows that keep your team moving
              forward without the chaos.
            </p>
          </div>

          <button
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-primary
              px-6
              py-4
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(240,28,112,0.4)]
            "
          >
            Get Started

            <ArrowUpRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </button>
        </div>

        {/* Main Footer */}
        <div className="grid gap-16 py-20 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
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
                  text-2xl
                  font-bold
                  text-text
                "
              >
                Marilume
              </span>
            </Link>

            <p
              className="
                mt-6
                max-w-md
                leading-relaxed
                text-text-secondary
              "
            >
              AI-powered workflow automation that helps
              individuals and teams organize tasks, connect
              tools, and stay focused on meaningful work.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex gap-3">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-border
                      bg-surface
                      text-text-secondary
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-primary/40
                      hover:text-primary
                      hover:shadow-[0_0_20px_rgba(240,28,112,0.2)]
                    "
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Columns */}
          {Object.entries(footerLinks).map(
            ([title, links]) => (
              <div key={title}>
                <h3
                  className="
                    mb-6
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-text
                  "
                >
                  {title}
                </h3>

                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="/"
                        className="
                          text-text-secondary
                          transition-colors
                          hover:text-primary
                        "
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom Bar */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-border
            py-8
            text-sm
            text-text-secondary
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Marilume.
            All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            Built with

            <Heart
              size={15}
              className="fill-primary text-primary"
            />

            for people who want more focus and less chaos.
          </div>
        </div>
      </div>
    </footer>
  );
}