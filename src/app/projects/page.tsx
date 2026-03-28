import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import SectionBg from "@/components/spider-verse/SectionBg";

export const metadata: Metadata = {
  title: "项目 | Marvel's Multiverse",
  description: "个人项目与实验性探索",
};

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  live:         { label: "LIVE",        color: "#0A0A0F", bg: "#39D353" },
  wip:          { label: "WIP",         color: "#0A0A0F", bg: "#FFD60A" },
  "open-source":{ label: "OPEN SOURCE", color: "#F0F0F0", bg: "#457BFF" },
  archived:     { label: "ARCHIVED",    color: "#F0F0F0", bg: "#F0F0F040" },
};

export default function ProjectsPage() {
  const projects = getAllPosts("projects");

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16">
      <SectionBg accent="#FFD60A" intensity={0.09} image="/wallpapers/projects.jpg" />
      <div className="mb-12">
        <div
          className="inline-block mb-4 px-3 py-0.5 border-2 border-[#FFD60A] text-[#FFD60A] text-xs font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)" }}
        >
          PROJECTS
        </div>
        <h1
          className="text-[#F0F0F0] leading-none"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2.5rem,8vw,5rem)", letterSpacing: "0.03em" }}
        >
          个人 <span className="text-[#FFD60A]">项目</span>
        </h1>
        <p className="mt-4 text-[#F0F0F0]/60 text-lg">自己动手做的东西，实验性探索</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-[#F0F0F0]/40 text-center py-20">暂无内容，敬请期待</p>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => {
            const badge = project.status ? STATUS_MAP[project.status] : null;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block p-6 bg-[#12121A] border-2 border-[#FFD60A]
                  hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#FFD60A]
                  transition-all duration-150 overflow-hidden"
              >
                {/* Status badge — top-right corner */}
                {badge && (
                  <span
                    className="absolute top-0 right-0 px-2.5 py-0.5 text-[10px] font-black tracking-widest"
                    style={{
                      fontFamily: "var(--font-bangers)",
                      background: badge.bg,
                      color: badge.color,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {badge.label}
                  </span>
                )}

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[5rem] leading-none text-[#FFD60A]/8 select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-bangers)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2
                      className="text-xl text-[#F0F0F0] group-hover:text-[#FFD60A] transition-colors mb-2"
                      style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-[#F0F0F0]/60 text-sm leading-relaxed">{project.description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-xs border border-[#FFD60A]/40 text-[#FFD60A]/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[#FFD60A] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-6">
                    →
                  </span>
                </div>
                {project.date && (
                  <p className="mt-3 text-xs text-[#F0F0F0]/30">{project.date}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
