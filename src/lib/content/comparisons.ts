import { promises as fs } from "fs";
import path from "path";
import type { Comparison } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadComparison(
  slugs: string[]
): Promise<Comparison | null> {
  const slug = slugs.sort().join("-vs-");
  const filePath = path.join(CONTENT_DIR, "comparisons", `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Comparison;
  } catch {
    return null;
  }
}

export async function loadAllComparisons(): Promise<Comparison[]> {
  const dirPath = path.join(CONTENT_DIR, "comparisons");
  try {
    const files = await fs.readdir(dirPath);
    const comparisons: Comparison[] = [];
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await fs.readFile(path.join(dirPath, file), "utf-8");
      comparisons.push(JSON.parse(raw) as Comparison);
    }
    return comparisons;
  } catch {
    return [];
  }
}
