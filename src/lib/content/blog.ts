import { promises as fs } from "fs";
import path from "path";
import type { BlogPost, BlogFrontmatter } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadBlogPost(
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { frontmatter, content } = parseMdx(raw);
    return { ...(frontmatter as unknown as BlogFrontmatter), slug, content };
  } catch {
    return null;
  }
}

export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  const dirPath = path.join(CONTENT_DIR, "blog");
  try {
    const files = await fs.readdir(dirPath);
    const posts: BlogPost[] = [];
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const raw = await fs.readFile(path.join(dirPath, file), "utf-8");
      const { frontmatter } = parseMdx(raw);
      const slug = file.replace(/\.mdx$/, "");
      posts.push({ ...(frontmatter as unknown as BlogFrontmatter), slug, content: "" });
    }
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

function parseMdx(raw: string): {
  frontmatter: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }
  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();
    if (
      typeof value === "string" &&
      value.startsWith("[") &&
      value.endsWith("]")
    ) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    if (key === "readTimeMinutes" && typeof value === "string") {
      value = parseInt(value, 10);
    }
    frontmatter[key] = value;
  }
  return { frontmatter, content: match[2].trim() };
}
