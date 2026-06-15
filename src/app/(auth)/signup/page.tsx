"use client";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/product",
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e1b4b,transparent_40%),radial-gradient(circle_at_bottom,#0f766e,transparent_40%)]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

      {/* Card */}
      <div className="relative h-[680px] w-[420px] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
        {/* Background Image */}
        <Image
          src="/images/pink-card-bg-img-vh.png"
          alt="Marilume Background"
          fill
          priority
          quality={100}
          sizes="420px"
          className="object-cover object-bottom"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/90" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col px-8 pt-10">
          {/* Badge */}
          <div className="mb-8">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              AI Work OS
            </span>
          </div>

          {/* Logo */}
          <div className="mb-3">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Sign Up
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-white">
            Create your workspace
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-300">
            Join thousands of professionals using AI to manage email,
            calendar, tasks, and workflows from a single place.
          </p>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            className="mt-8 flex h-14 items-center justify-center gap-3 rounded-2xl bg-white font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          {/* Features */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              AI-powered inbox management
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              Calendar automation
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              Lightning-fast productivity workflows
            </div>
          </div>

          <div className="flex-1" />

          {/* Footer */}
          <div className="pb-8">
            <p className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-zinc-500">
              By creating an account, you agree to our Terms and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}