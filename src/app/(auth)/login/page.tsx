"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/product",
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-4">
      
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e1b4b,transparent_40%),radial-gradient(circle_at_bottom,#0f766e,transparent_40%)]" /> */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

      {/* Login Card */}
      <div className="relative h-[650px] w-[420px] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
        
        {/* Background Image */}
        <Image
          src="/images/pink-card-bg-img-vh.png"
          alt="Marilume Background"
          fill
          priority
          className="object-cover  scale-110 object-bottom"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85" />

        {/* Glass Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col px-8 pt-10">
          {/* Badge */}
          <div className="mb-8">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              AI Work OS
            </span>
          </div>

          {/* Logo / Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Login
          </h1>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-300">
            The fastest way to manage your email, calendar, and workflows with AI.
          </p>

          {/* Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="mt-8 flex h-14 items-center justify-center gap-3 rounded-2xl bg-white font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          {/* Footer Text */}
          <p className="mt-4 text-xs leading-relaxed text-zinc-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

          {/* Spacer pushes everything upward */}
          <div className="flex-1" />
        </div>
      </div>
    </main>
  );
}