import { promises as fs } from "fs";
import path from "path";
import type { Category } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadCategory(
  slug: string
): Promise<Category | null> {
  const filePath = path.join(CONTENT_DIR, "categories", `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Category;
  } catch {
    return null;
  }
}

export async function loadAllCategories(): Promise<Category[]> {
  const dirPath = path.join(CONTENT_DIR, "categories");
  try {
    const files = await fs.readdir(dirPath);
    const categories: Category[] = [];
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await fs.readFile(path.join(dirPath, file), "utf-8");
      categories.push(JSON.parse(raw) as Category);
    }
    return categories;
  } catch {
    return [];
  }
}

export async function loadNavCategories(): Promise<Category[]> {
  const all = await loadAllCategories();
  return all.slice(0, 6);
}
