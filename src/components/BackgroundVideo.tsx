"use client";

import Image from "next/image";
import { useState } from "react";

export default function BackgroundVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Main Glow */}
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

      {/* Fallback Image */}
      <Image
        src="/images/hero-backup-bg.png"
        alt=""
        fill
        priority
        className={`
          object-cover
          transition-opacity
          duration-1000
          ${videoLoaded ? "opacity-0" : "opacity-75"}
        `}
      />

      {/* Video */}
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

      {/* Global Overlay */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}