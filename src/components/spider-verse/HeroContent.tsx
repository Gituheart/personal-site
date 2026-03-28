"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import GlitchText from "./GlitchText";

type Phase = "center" | "flying-out" | "sides" | "flying-in";

export default function HeroContent() {
  const [phase, setPhase] = useState<Phase>("center");
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setPhase("flying-out"), 5000);
  }, []);

  useEffect(() => {
    scheduleCollapse();
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
    };
  }, [scheduleCollapse]);

  useEffect(() => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (phase === "flying-out") {
      // wait for all fly-out animations to finish (max 80ms delay + 650ms anim)
      phaseTimer.current = setTimeout(() => setPhase("sides"), 760);
    } else if (phase === "flying-in") {
      // wait for all spring-in animations to finish (max 100ms delay + 940ms anim)
      phaseTimer.current = setTimeout(() => {
        setPhase("center");
        scheduleCollapse(); // re-arm 5s timer every time we return to center
      }, 1100);
    }
  }, [phase, scheduleCollapse]);

  const recall = () => {
    if (phase === "sides") setPhase("flying-in");
  };

  const atSides = phase === "sides";

  const c = (item: string) => {
    if (phase === "flying-out") return `h-${item}-out`;
    if (phase === "sides")      return `h-${item}-side`;
    if (phase === "flying-in")  return `h-${item}-in`;
    return "";
  };

  return (
    <>
      {/* Full-screen click-to-recall overlay */}
      {atSides && (
        <div className="fixed inset-0 z-[15] cursor-pointer" onClick={recall} />
      )}

      {/* Hint */}
      {atSides && (
        <div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20
            text-[#F0F0F0]/40 text-xs tracking-[0.2em] pointer-events-none select-none"
          style={{ fontFamily: "var(--font-bangers)", animation: "flicker 4s infinite" }}
        >
          [ TAP ANYWHERE TO RECALL ]
        </div>
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">

        {/* Badge → top-right */}
        <div className={c("badge")} style={{ willChange: "transform" }}>
          <div
            className="inline-block mb-6 px-4 py-1 border-2 border-[#E63946] text-[#E63946] text-sm font-bold tracking-widest"
            style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.15em" }}
          >
            EARTH-616 · MARVEL
          </div>
        </div>

        {/* Marvel's → far left */}
        <div className={c("title1")} style={{ willChange: "transform" }}>
          <h1
            className="leading-none mb-0 text-[#F0F0F0]"
            style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em", fontSize: "clamp(3rem, 12vw, 8rem)" }}
          >
            <GlitchText text="Marvel's" autoGlitch />
          </h1>
        </div>

        {/* Multiverse → far right */}
        <div className={c("title2")} style={{ willChange: "transform" }}>
          <h2
            className="leading-none mb-4 text-[#E63946]"
            style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em", fontSize: "clamp(3rem, 12vw, 8rem)" }}
          >
            <GlitchText text="Multiverse" autoGlitch />
          </h2>
        </div>

        {/* Subtitle → bottom */}
        <div className={c("sub")} style={{ willChange: "transform" }}>
          <p className="text-lg md:text-xl text-[#F0F0F0]/70 mb-10 font-medium">
            每个宇宙都有一个在写代码的我
          </p>
        </div>

        {/* Buttons in flex row; each button animates independently */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Button 1 → bottom-left */}
          <div className={c("btn1")} style={{ willChange: "transform" }}>
            <Link
              href="/articles"
              className="px-8 py-3 bg-[#E63946] text-white font-bold text-lg
                border-[3px] border-[#F0F0F0] shadow-[4px_4px_0px_#F0F0F0]
                hover:shadow-[2px_2px_0px_#F0F0F0] hover:translate-x-[1px] hover:translate-y-[1px]
                transition-all duration-100 active:shadow-none block"
              style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.05em" }}
              onClick={(e) => { if (atSides) { e.preventDefault(); recall(); } }}
            >
              进入宇宙
            </Link>
          </div>

          {/* Button 2 → top */}
          <div className={c("btn2")} style={{ willChange: "transform" }}>
            <Link
              href="/about"
              className="px-8 py-3 bg-transparent text-[#F0F0F0] font-bold text-lg
                border-[3px] border-[#F0F0F0] shadow-[4px_4px_0px_#457BFF]
                hover:shadow-[2px_2px_0px_#457BFF] hover:translate-x-[1px] hover:translate-y-[1px]
                transition-all duration-100 block"
              style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.05em" }}
              onClick={(e) => { if (atSides) { e.preventDefault(); recall(); } }}
            >
              关于 Marvel
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
