import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import SectionBg from "@/components/spider-verse/SectionBg";

export const metadata: Metadata = {
  title: "Skills | Marvel's Multiverse",
  description: "我开发的 Claude Agent 技能，用 AI 解决真实工作问题",
};

export default function SkillsPage() {
  const skills = getAllPosts("skills");

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16">
      <SectionBg accent="#7B2FBE" image="/wallpapers/skills.jpg" />
      <div className="mb-12">
        <div
          className="inline-block mb-4 px-3 py-0.5 border-2 border-[#7B2FBE] text-[#7B2FBE] text-xs font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)" }}
        >
          SKILLS
        </div>
        <h1
          className="text-[#F0F0F0] leading-none"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2.5rem,8vw,5rem)", letterSpacing: "0.03em" }}
        >
          我开发的 <span className="text-[#7B2FBE]">Claude Skills</span>
        </h1>
        <p className="mt-4 text-[#F0F0F0]/60 text-lg">用 AI Agent 技能解决真实工作问题</p>
      </div>

      {skills.length === 0 ? (
        <p className="text-[#F0F0F0]/40 text-center py-20">暂无内容</p>
      ) : (
        <div className="flex flex-col gap-4">
          {skills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className="group block p-6 bg-[#12121A] border-2 border-[#7B2FBE]
                hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#7B2FBE]
                transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2
                    className="text-xl text-[#F0F0F0] group-hover:text-[#7B2FBE] transition-colors mb-2"
                    style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}
                  >
                    {skill.title}
                  </h2>
                  <p className="text-[#F0F0F0]/60 text-sm leading-relaxed">{skill.description}</p>
                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs border border-[#7B2FBE]/50 text-[#7B2FBE]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[#7B2FBE] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </div>
              {skill.date && (
                <p className="mt-3 text-xs text-[#F0F0F0]/30">{skill.date}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
