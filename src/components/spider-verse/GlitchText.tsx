"use client";

import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span" | "p";
  autoGlitch?: boolean; // 自动周期性故障，不依赖 hover
}

export default function GlitchText({
  text,
  className = "",
  tag: Tag = "span",
  autoGlitch = false,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!autoGlitch) return;
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    };
    // 随机间隔触发
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        trigger();
        schedule();
      }, 3000 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [autoGlitch]);

  return (
    <Tag
      className={`relative inline-block select-none ${className}`}
      data-text={text}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}
    >
      {text}
      {glitching && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 text-[#E63946]"
            style={{
              animation: "glitch-red 0.25s steps(2) infinite",
              clipPath: "polygon(0 20%, 100% 20%, 100% 45%, 0 45%)",
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 text-[#457BFF]"
            style={{
              animation: "glitch-blue 0.25s steps(2) infinite reverse",
              clipPath: "polygon(0 55%, 100% 55%, 100% 80%, 0 80%)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
