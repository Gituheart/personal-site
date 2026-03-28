import type { Metadata } from "next";
import { getPost, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts("projects").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost("projects", slug);
  if (!post) return {};
  return {
    title: `${post.title} | Marvel's Multiverse`,
    description: post.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost("projects", slug);
  if (!post) notFound();

  const all = getAllPosts("projects");
  const idx = all.findIndex((p) => p.slug === slug);
  const prevPost = all[idx + 1] ?? null;
  const nextPost = all[idx - 1] ?? null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#F0F0F0]/50 hover:text-[#FFD60A] transition-colors"
        >
          ← 返回项目
        </Link>
        <span className="text-xs text-[#F0F0F0]/30 tracking-widest" style={{ fontFamily: "var(--font-bangers)" }}>
          {post.readingTime} 阅读
        </span>
      </div>

      <div className="mb-10 pb-8 border-b-2 border-[#1A1A2E]">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs border border-[#FFD60A]/50 text-[#FFD60A]">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1
          className="text-[#F0F0F0] leading-tight mb-3"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "0.03em" }}
        >
          {post.title}
        </h1>
        <p className="text-[#F0F0F0]/60 text-lg">{post.description}</p>
        {post.date && <p className="mt-3 text-xs text-[#F0F0F0]/30">{post.date}</p>}
      </div>

      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#F0F0F0]
          prose-h2:text-[#FFD60A] prose-h2:border-b prose-h2:border-[#1A1A2E] prose-h2:pb-2
          prose-a:text-[#457BFF] prose-a:no-underline hover:prose-a:underline
          prose-code:text-[#E63946] prose-code:bg-[#1A1A2E] prose-code:px-1 prose-code:rounded
          prose-pre:bg-[#12121A] prose-pre:border prose-pre:border-[#1A1A2E]
          prose-blockquote:border-l-[#FFD60A] prose-blockquote:text-[#F0F0F0]/70
          prose-strong:text-[#F0F0F0]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {(prevPost || nextPost) && (
        <div className="mt-16 pt-8 border-t-2 border-[#1A1A2E] grid grid-cols-2 gap-4">
          <div>
            {prevPost && (
              <Link
                href={`/projects/${prevPost.slug}`}
                className="group block p-4 bg-[#12121A] border-2 border-[#1A1A2E] hover:border-[#FFD60A] transition-all duration-150"
              >
                <p className="text-xs text-[#F0F0F0]/30 mb-1 tracking-widest" style={{ fontFamily: "var(--font-bangers)" }}>← PREV</p>
                <p className="text-sm text-[#F0F0F0]/70 group-hover:text-[#FFD60A] transition-colors line-clamp-2">{prevPost.title}</p>
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                href={`/projects/${nextPost.slug}`}
                className="group block p-4 bg-[#12121A] border-2 border-[#1A1A2E] hover:border-[#FFD60A] transition-all duration-150 text-right"
              >
                <p className="text-xs text-[#F0F0F0]/30 mb-1 tracking-widest" style={{ fontFamily: "var(--font-bangers)" }}>NEXT →</p>
                <p className="text-sm text-[#F0F0F0]/70 group-hover:text-[#FFD60A] transition-colors line-clamp-2">{nextPost.title}</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
