"use client";

import { useState } from "react";

export default function BackgroundVideo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={`
          fixed inset-0
          h-full w-full
          object-cover
          transition-opacity
          duration-1000
          -z-20
          ${loaded ? "opacity-40" : "opacity-0"}
        `}
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Global dark layer */}
      <div className="fixed inset-0 -z-10 bg-background/70" />
    </>
  );
}