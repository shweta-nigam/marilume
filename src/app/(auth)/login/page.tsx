"use client";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message || "Failed to log in.");
      } else {
        router.push("/product");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-4">
      {/* <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" /> */}

         {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e1b4b,transparent_40%),radial-gradient(circle_at_bottom,#0f766e,transparent_40%)]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

      {/* Login Card */}
      <div className="relative h-[650px] w-[420px] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
        {/* Background Image */}
        <Image
          src="/images/pink-card-bg-img-vh.png"
          alt="Marilume Background"
          fill
          priority
          className="object-cover scale-110 object-bottom"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85" />

        {/* Glass Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col px-8 pt-8 justify-between">
          <div>
            {/* Badge */}
            <div className="mb-4">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                AI Work OS
              </span>
            </div>

            {/* Logo / Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Login
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-zinc-300">
              The fastest way to manage your email, calendar, and workflows with
              AI.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="mt-4 space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
  w-full
  h-11
  mt-2
  flex
  items-center
  justify-center
  rounded-xl
  bg-primary
  text-white
  font-semibold
  text-sm
  border
  border-primary
  transition-all
  duration-300
  hover:scale-[1.02]
  hover:shadow-[0_0_30px_rgba(240,28,112,0.15)]
  disabled:opacity-50
"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                Or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="
    w-full
    mt-4
    flex
    h-11
    items-center
    justify-center
    gap-3
    rounded-xl
    border
    border-transparent
    bg-white
    font-medium
    text-black
    text-sm
    transition-all
    duration-300
    hover:border-primary
  "
            >
              <FcGoogle size={18} />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="pb-6">
            <p className="text-center text-xs text-zinc-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Sign up
              </Link>
            </p>
            <p className="mt-2 text-center text-[10px] text-zinc-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
