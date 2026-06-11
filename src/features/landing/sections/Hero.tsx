"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-background" />

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

      {/* POSTER IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-poster.webp"
          alt="Pelora Dashboard"
          fill
          priority
          className="object-cover opacity-25"
        />
      </div>

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.webp"
        onLoadedData={() => setVideoLoaded(true)}
        className={`
          absolute inset-0
          h-full w-full
          object-cover
          transition-opacity
          duration-1000
          ${videoLoaded ? "opacity-50" : "opacity-0"}
        `}
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="
              mb-6
              inline-flex
              items-center
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-white/80
              backdrop-blur
            "
          >
            Gmail + Calendar + AI Agents
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-5xl
              text-5xl
              font-bold
              leading-tight
              text-white
              md:text-7xl
            "
          >
            Your AI Work OS
            <span className="block text-primary">
              built for modern teams
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-text-secondary
              md:text-xl
            "
          >
            Connect Gmail, Calendar and intelligent agents into one
            workspace. Search faster, schedule meetings, draft replies
            and automate repetitive work.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="
                rounded-xl
                bg-primary
                px-6
                py-4
                font-medium
                text-white
                transition
                hover:scale-[1.02]
              "
            >
              Start Free
            </button>

            <button
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-6
                py-4
                font-medium
                text-white
                backdrop-blur
                transition
                hover:bg-white/10
              "
            >
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <span>✓ Gmail</span>
            <span>✓ Google Calendar</span>
            <span>✓ AI Automation</span>
            <span>✓ Keyboard First</span>
          </div>
        </div>
      </div>
    </section>
  );
}













