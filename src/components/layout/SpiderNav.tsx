"use client";

import Link from "next/link";
import { useState } from "react";
import GlitchText from "@/components/spider-verse/GlitchText";

const navItems = [
  { label: "文章", href: "/articles" },
  { label: "感悟", href: "/thoughts" },
  { label: "Skills", href: "/skills" },
  { label: "项目", href: "/projects" },
  { label: "关于", href: "/about" },
];

export default function SpiderNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-3 border-[#F0F0F0]"
      style={{ borderBottomWidth: "3px", borderBottomColor: "#F0F0F0", background: "#0A0A0F" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="text-2xl text-[#E63946]"
            style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.05em" }}
          >
            ◈
          </span>
          <GlitchText
            text="Marvel's Multiverse"
            className="text-lg font-bold text-[#F0F0F0] [font-family:var(--font-bangers)] tracking-[0.05em]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 text-sm font-medium text-[#F0F0F0] border-2 border-transparent
                hover:border-[#E63946] hover:text-[#E63946] transition-all duration-150
                hover:shadow-[2px_2px_0px_#E63946]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          <span className={`block w-6 h-0.5 bg-[#F0F0F0] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#F0F0F0] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#F0F0F0] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-[#F0F0F0]" style={{ background: "#12121A" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-[#F0F0F0] border-b border-[#1A1A2E]
                hover:text-[#E63946] hover:bg-[#1A1A2E] transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
