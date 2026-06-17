"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
  {
    label: "Product",
    href: "/tools",
  },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

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
            {session ? (
              <>
                <Link
                  href="/dashboard"
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
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="
                    rounded-xl
                    bg-secondary/20
                    border
                    border-secondary/40
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-secondary/40
                    hover:scale-105
                  "
                >
                  Log Out
                </button>

                <Link href="/dashboard" className="flex items-center ml-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-10 w-10 rounded-full border border-primary/40 object-cover shadow-[0_0_15px_rgba(240,28,112,0.2)] hover:border-primary hover:scale-105 transition-all"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-surface-elevated text-primary font-bold shadow-[0_0_15px_rgba(240,28,112,0.2)] hover:border-primary hover:scale-105 transition-all">
                      {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
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
                </Link>

                <Link
                  href="/signup"
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
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
