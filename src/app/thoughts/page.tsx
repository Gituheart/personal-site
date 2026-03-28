import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import SectionBg from "@/components/spider-verse/SectionBg";

export const metadata: Metadata = {
  title: "感悟 | Marvel's Multiverse",
  description: "随想、反思、日常碎片化思考",
};

export default function ThoughtsPage() {
  const thoughts = getAllPosts("thoughts");

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16">
      <SectionBg accent="#457BFF" image="/wallpapers/thoughts.jpg" />
      <div className="mb-12">
        <div
          className="inline-block mb-4 px-3 py-0.5 border-2 border-[#457BFF] text-[#457BFF] text-xs font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)" }}
        >
          THOUGHTS
        </div>
        <h1
          className="text-[#F0F0F0] leading-none"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2.5rem,8vw,5rem)", letterSpacing: "0.03em" }}
        >
          随想 <span className="text-[#457BFF]">感悟</span>
        </h1>
        <p className="mt-4 text-[#F0F0F0]/60 text-lg">反思、日常、碎片化思考</p>
      </div>

      {thoughts.length === 0 ? (
        <p className="text-[#F0F0F0]/40 text-center py-20">暂无内容，敬请期待</p>
      ) : (
        <div className="flex flex-col gap-4">
          {thoughts.map((thought, i) => (
            <Link
              key={thought.slug}
              href={`/thoughts/${thought.slug}`}
              className="group relative block p-6 bg-[#12121A] border-2 border-[#457BFF]
                hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#457BFF]
                transition-all duration-150 overflow-hidden"
            >
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[5rem] leading-none text-[#457BFF]/8 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2
                    className="text-xl text-[#F0F0F0] group-hover:text-[#457BFF] transition-colors mb-2"
                    style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}
                  >
                    {thought.title}
                  </h2>
                  <p className="text-[#F0F0F0]/60 text-sm leading-relaxed">{thought.description}</p>
                  {thought.tags && thought.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {thought.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs border border-[#457BFF]/40 text-[#457BFF]/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[#457BFF] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </div>
              {thought.date && (
                <p className="mt-3 text-xs text-[#F0F0F0]/30">{thought.date}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
