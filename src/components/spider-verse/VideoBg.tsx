"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      // Browser blocked autoplay with sound — fall back to muted
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/spider-verse-bg.mp4"
        loop
        playsInline
        style={{ zIndex: 0, opacity: 0.45 }}
      />

      <button
        onClick={toggleSound}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3 py-2
          bg-[#0A0A0F]/80 border-2 border-[#F0F0F0]/30 text-[#F0F0F0]/70
          hover:border-[#E63946] hover:text-[#E63946] transition-all duration-150
          text-xs font-bold tracking-widest backdrop-blur-sm"
        style={{ fontFamily: "var(--font-bangers)" }}
        aria-label={muted ? "开启声音" : "关闭声音"}
      >
        {muted ? (
          <>
            <span className="text-base">🔇</span>
            <span>SOUND OFF</span>
          </>
        ) : (
          <>
            <span className="text-base">🔊</span>
            <span>SOUND ON</span>
          </>
        )}
      </button>
    </>
  );
}
