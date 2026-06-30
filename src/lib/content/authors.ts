import { promises as fs } from "fs";
import path from "path";
import type { Author } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadAuthors(): Promise<Author[]> {
  const filePath = path.join(CONTENT_DIR, "authors", "authors.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Author[];
  } catch {
    return [];
  }
}

export async function loadAuthor(name: string): Promise<Author | null> {
  const authors = await loadAuthors();
  return authors.find((a) => a.name === name) ?? null;
}
