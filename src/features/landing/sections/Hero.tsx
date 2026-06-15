"use client";

import { useState } from "react";
import { Link } from "lucide-react";

export default function Hero() {

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* Pink Glow */}
        <div
          className="
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            blur-[140px]
            opacity-20
          "
          style={{
            background: "#f01c70",
          }}
        />

        {/* Secondary Glow */}
        <div
          className="
            absolute
            right-0
            top-1/3
            h-[350px]
            w-[350px]
            rounded-full
            blur-[120px]
            opacity-10
          "
          style={{
            background: "#f01c70",
          }}
        />
      </div>

      {/* OVERLAY */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* HERO CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="
        mb-8
        inline-flex
        items-center
        rounded-full
        border
        border-border
        bg-surface/60
        px-4
        py-2
        backdrop-blur-md
      "
          >
            <span
              className="
          mr-2
          h-2
          w-2
          rounded-full
          bg-primary
        "
            />
            <span className="text-sm text-text-secondary">
              AI-powered workflow automation
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
        font-heading
        text-2xl
        font-extrabold
        tracking-[-0.04em]
        text-text
        sm:text-3xl
        md:text-4xl
        lg:text-6xl
      "
          >
            Turn complexity into <span className="text-primary">flow.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="
        mx-auto
        mt-8
        max-w-3xl
        font-body
        text
        leading-relaxed
        text-text-secondary
        sm:text-xl
      "
          >
            Less coordination. Less context switching. More time for the work
            that matters.
          </p>

          {/* CTA Buttons */}
          <div
            className="
        mt-12
        flex
        flex-col
        items-center
        justify-center
        gap-4
        sm:flex-row
      "
          >
            <Link
              href="/signup"
              className="
          rounded-xl
          bg-primary
          px-8
          py-4
          font-medium
          text-white
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_0_40px_rgba(240,28,112,0.45)]
           border
        "
            >
              Get Started
            </Link>

            <button
              className="
          rounded-xl
          border
          border-border
          bg-surface/50
          px-8
          py-4
          font-medium
          text-text
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-primary/50
          hover:bg-surface
        "
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
