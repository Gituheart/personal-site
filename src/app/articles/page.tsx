import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import SectionBg from "@/components/spider-verse/SectionBg";

export const metadata: Metadata = {
  title: "文章 | Marvel's Multiverse",
  description: "深度长文、技术沉淀、系统性总结",
};

export default function ArticlesPage() {
  const articles = getAllPosts("articles");

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-16">
      <SectionBg accent="#E63946" image="/wallpapers/articles.jpg" />
      <div className="mb-12">
        <div
          className="inline-block mb-4 px-3 py-0.5 border-2 border-[#E63946] text-[#E63946] text-xs font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)" }}
        >
          ARTICLES
        </div>
        <h1
          className="text-[#F0F0F0] leading-none"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2.5rem,8vw,5rem)", letterSpacing: "0.03em" }}
        >
          深度 <span className="text-[#E63946]">长文</span>
        </h1>
        <p className="mt-4 text-[#F0F0F0]/60 text-lg">技术沉淀、深度思考、系统性总结</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-[#F0F0F0]/40 text-center py-20">暂无内容，敬请期待</p>
      ) : (
        <div className="flex flex-col gap-4">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group relative block p-6 bg-[#12121A] border-2 border-[#E63946]
                hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E63946]
                transition-all duration-150 overflow-hidden"
            >
              {/* Background index number */}
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[5rem] leading-none text-[#E63946]/8 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-bangers)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2
                    className="text-xl text-[#F0F0F0] group-hover:text-[#E63946] transition-colors mb-2"
                    style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.03em" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-[#F0F0F0]/60 text-sm leading-relaxed">{article.description}</p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs border border-[#E63946]/40 text-[#E63946]/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[#E63946] font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </div>
              {article.date && (
                <p className="mt-3 text-xs text-[#F0F0F0]/30">{article.date}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
