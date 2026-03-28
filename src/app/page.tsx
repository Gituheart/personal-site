import type { CSSProperties } from "react";
import Image from "next/image";
import HalftoneBackground from "@/components/spider-verse/HalftoneBackground";
import ActionLines from "@/components/spider-verse/ActionLines";
import UniverseFlashBg from "@/components/spider-verse/UniverseFlashBg";
import VideoBg from "@/components/spider-verse/VideoBg";
import HeroContent from "@/components/spider-verse/HeroContent";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";

const categories = [
  {
    label: "文章",
    href: "/articles",
    desc: "深度长文、技术沉淀",
    color: "#E63946",
    rotate: "-rotate-1",
    emoji: "📝",
  },
  {
    label: "感悟",
    href: "/thoughts",
    desc: "随想、反思、日常",
    color: "#457BFF",
    rotate: "rotate-1",
    emoji: "💡",
  },
  {
    label: "Skills",
    href: "/skills",
    desc: "我开发的 Claude Skill",
    color: "#7B2FBE",
    rotate: "-rotate-1",
    emoji: "⚡",
  },
  {
    label: "项目",
    href: "/projects",
    desc: "个人项目与实验",
    color: "#FFD60A",
    rotate: "rotate-1",
    emoji: "🚀",
  },
];

export default function HomePage() {
  // Latest transmissions: mix articles + thoughts, newest 4
  const articles = getAllPosts("articles");
  const thoughts = getAllPosts("thoughts");
  const skills = getAllPosts("skills");
  const latestPosts = [...articles, ...thoughts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  const postHref = (post: { slug: string }, section: "articles" | "thoughts") =>
    `/${section}/${post.slug}`;

  const articlesSet = new Set(articles.map((a) => a.slug));

  const projects = getAllPosts("projects").slice(0, 3);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <VideoBg />
        <HalftoneBackground />
        <ActionLines />
        <UniverseFlashBg />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #0A0A0F 100%)",
          }}
        />

        <HeroContent />

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
        />
      </section>

      {/* ─── 分类入口 ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2
          className="text-center mb-12 text-[#F0F0F0]"
          style={{
            fontFamily: "var(--font-bangers)",
            letterSpacing: "0.05em",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
          }}
        >
          EXPLORE THE <span className="text-[#457BFF]">UNIVERSE</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`block p-6 bg-[#12121A] transition-all duration-150
                hover:-translate-y-1 hover:translate-x-[1px] group ${cat.rotate}`}
              style={{
                border: `3px solid ${cat.color}`,
                boxShadow: `4px 4px 0px ${cat.color}`,
              }}
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h3
                className="text-2xl mb-1"
                style={{
                  fontFamily: "var(--font-bangers)",
                  color: cat.color,
                  letterSpacing: "0.05em",
                }}
              >
                {cat.label}
              </h3>
              <p className="text-sm text-[#F0F0F0]/60">{cat.desc}</p>
              <div
                className="mt-4 text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: cat.color, fontFamily: "var(--font-bangers)" }}
              >
                ENTER →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 最新内容 ─── */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div
                className="inline-block mb-2 px-3 py-0.5 border-2 border-[#E63946] text-[#E63946] text-xs font-black tracking-widest"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                LATEST TRANSMISSIONS
              </div>
              <h2
                className="text-[#F0F0F0] leading-none"
                style={{
                  fontFamily: "var(--font-bangers)",
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  letterSpacing: "0.03em",
                }}
              >
                最新 <span className="text-[#E63946]">内容</span>
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-sm text-[#F0F0F0]/40 hover:text-[#E63946] transition-colors tracking-widest"
              style={{ fontFamily: "var(--font-bangers)" }}
            >
              ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestPosts.map((post) => {
              const section = articlesSet.has(post.slug) ? "articles" : "thoughts";
              const accentColor = section === "articles" ? "#E63946" : "#457BFF";
              const sectionLabel = section === "articles" ? "ARTICLE" : "THOUGHT";
              return (
                <Link
                  key={`${section}-${post.slug}`}
                  href={postHref(post, section)}
                  className="group relative block p-5 bg-[#12121A] border-l-4 hover:-translate-y-0.5
                    transition-all duration-150 overflow-hidden"
                  style={{
                    borderColor: accentColor,
                    borderTop: `1px solid ${accentColor}30`,
                    borderRight: `1px solid ${accentColor}30`,
                    borderBottom: `1px solid ${accentColor}30`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-0.5 px-1.5 py-px text-[9px] font-black tracking-widest"
                      style={{
                        fontFamily: "var(--font-bangers)",
                        background: accentColor,
                        color: "#0A0A0F",
                      }}
                    >
                      {sectionLabel}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[#F0F0F0] group-hover:text-[var(--ac)] transition-colors leading-snug mb-1 truncate"
                        style={
                          {
                            fontFamily: "var(--font-bangers)",
                            letterSpacing: "0.03em",
                            fontSize: "1.1rem",
                            "--ac": accentColor,
                          } as CSSProperties
                        }
                      >
                        {post.title}
                      </h3>
                      <p className="text-[#F0F0F0]/50 text-xs leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  {post.date && (
                    <p className="mt-3 text-[10px] text-[#F0F0F0]/25 tracking-wide">{post.date}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── 最新项目 ─── */}
      {projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div
                className="inline-block mb-2 px-3 py-0.5 border-2 border-[#FFD60A] text-[#FFD60A] text-xs font-black tracking-widest"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                RECENT BUILDS
              </div>
              <h2
                className="text-[#F0F0F0] leading-none"
                style={{
                  fontFamily: "var(--font-bangers)",
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  letterSpacing: "0.03em",
                }}
              >
                最近 <span className="text-[#FFD60A]">项目</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-[#F0F0F0]/40 hover:text-[#FFD60A] transition-colors tracking-widest"
              style={{ fontFamily: "var(--font-bangers)" }}
            >
              ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block p-5 bg-[#12121A] border-2 border-[#FFD60A]/40
                  hover:border-[#FFD60A] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#FFD60A]
                  transition-all duration-150 overflow-hidden"
              >
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[4rem] leading-none text-[#FFD60A]/6 select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-bangers)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-[#F0F0F0] group-hover:text-[#FFD60A] transition-colors mb-2 pr-8"
                  style={{
                    fontFamily: "var(--font-bangers)",
                    letterSpacing: "0.03em",
                    fontSize: "1.15rem",
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-[#F0F0F0]/50 text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-px text-[10px] border border-[#FFD60A]/30 text-[#FFD60A]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── About 简介条 ─── */}
      <section className="relative border-t-2 border-[#1A1A2E] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 0% 50%, #7B2FBE12 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1">
            <div
              className="inline-block mb-4 px-3 py-0.5 border-2 border-[#7B2FBE] text-[#7B2FBE] text-xs font-black tracking-widest"
              style={{ fontFamily: "var(--font-bangers)" }}
            >
              WHO AM I
            </div>
            <h2
              className="text-[#F0F0F0] leading-none mb-4"
              style={{
                fontFamily: "var(--font-bangers)",
                fontSize: "clamp(2rem,5vw,3.5rem)",
                letterSpacing: "0.03em",
              }}
            >
              柳旭雷 <span className="text-[#7B2FBE]">Marvel</span>
            </h2>
            <p className="text-[#F0F0F0]/60 text-base leading-relaxed max-w-lg">
              在涂鸦智能做技术支持，同时用 AI 造自己想要的东西。
              写文章、做项目、开发 Claude Skills——记录一切有趣的探索。
            </p>
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <Link
                href="/about"
                className="inline-block px-6 py-2.5 border-2 border-[#7B2FBE] text-[#7B2FBE] font-black
                  hover:bg-[#7B2FBE] hover:text-white transition-all duration-150 tracking-widest text-sm"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                FULL BIO →
              </Link>
              <a
                href="https://github.com/Gituheart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="inline-block px-6 py-2.5 border-2 border-[#F0F0F0]/25 text-[#F0F0F0]/50 font-black
                  hover:border-[#F0F0F0]/70 hover:text-[#F0F0F0] transition-all duration-150 tracking-widest text-sm"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                GITHUB →
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Image
                src="/wechat-qr.jpg"
                alt="微信二维码"
                width={96}
                height={96}
                className="border border-[#F0F0F0]/15 object-cover"
              />
              <div>
                <div
                  className="text-[10px] font-black tracking-widest text-[#F0F0F0]/30 mb-1"
                  style={{ fontFamily: "var(--font-bangers)" }}
                >
                  WECHAT
                </div>
                <p className="text-xs text-[#F0F0F0]/40">扫码加我微信</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            {[
              { label: "PROJECTS", value: projects.length, color: "#FFD60A" },
              { label: "ARTICLES", value: articles.length, color: "#E63946" },
              { label: "THOUGHTS", value: thoughts.length, color: "#457BFF" },
              { label: "SKILLS", value: skills.length, color: "#7B2FBE" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-4 bg-[#12121A] border-2 text-center"
                style={{ borderColor: stat.color }}
              >
                <div
                  className="leading-none"
                  style={{
                    fontFamily: "var(--font-bangers)",
                    fontSize: "2.5rem",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] font-black tracking-widest text-[#F0F0F0]/40 mt-1"
                  style={{ fontFamily: "var(--font-bangers)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t-2 border-[#1A1A2E] py-8 text-center text-[#F0F0F0]/30 text-sm">
        <p style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} MARVEL&apos;S MULTIVERSE · BUILT WITH NEXT.JS + VERCEL
        </p>
      </footer>
    </div>
  );
}
