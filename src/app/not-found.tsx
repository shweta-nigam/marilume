import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="relative z-10 max-w-2xl text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
          Marilume AI
        </div>

        <h1 className="text-8xl font-black tracking-tight text-white md:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-white">
          This page drifted out of orbit
        </h2>

        <p className="mt-4 text-lg text-text-secondary">
          The page you're looking for doesn't exist,
          was moved, or never existed in the first place.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <Home size={18} />
            Back Home
          </Link>

          <Link
             href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-white transition hover:border-primary/40"
          >
            <ArrowLeft size={18} />
            Go Back
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur">
          <p className="text-sm text-text-secondary">
            If you expected something here, the AI assistant
            may still be setting it up. So hurry up!
          </p>
        </div>
      </div>
    </main>
  );
}