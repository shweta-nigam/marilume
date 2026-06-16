"use client";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/product",
    });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/product",
      });

      if (error) {
        setError(error.message || "Failed to create account.");
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
        <div className="relative z-10 flex h-full flex-col px-8 pt-8 justify-between">
          <div>
            {/* Badge */}
            <div className="mb-4">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                AI Work OS
              </span>
            </div>

            {/* Logo */}
            <div className="mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Sign Up
              </h1>
            </div>

            <p className="text-xs text-zinc-300">
              Create your workspace and start managing workflows.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleEmailSignup} className="mt-4 space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

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
                  placeholder="At least 8 characters"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-2 flex items-center justify-center rounded-xl bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Or</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
              className="w-full mt-4 flex h-11 items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/20 font-medium text-white text-sm transition-all duration-300 hover:bg-white hover:text-black"
            >
              <FcGoogle size={18} />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className="pb-6">
            <p className="text-center text-xs text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-center text-[10px] text-zinc-500">
              By creating an account, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}