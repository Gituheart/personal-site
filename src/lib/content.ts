import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const contentRoot = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  status?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  readingTime: string;
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 300));
  return `${minutes} 分钟`;
}

export function getAllPosts(section: string): PostMeta[] {
  const dir = path.join(contentRoot, section);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date ?? ""),
        tags: data.tags ?? [],
        status: data.status ?? undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(section: string, slug: string): Promise<Post | null> {
  const filePath = path.join(contentRoot, section, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date ?? ""),
    tags: data.tags ?? [],
    contentHtml,
    readingTime: estimateReadingTime(content),
  };
}
