import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface StaticPage {
  title: string;
  description: string;
  content: string;
}

export async function loadPage(slug: string): Promise<StaticPage | null> {
  const filePath = path.join(CONTENT_DIR, "pages", `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as StaticPage;
  } catch {
    return null;
  }
}
