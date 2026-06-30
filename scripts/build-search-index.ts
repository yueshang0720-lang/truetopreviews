import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "public", "search-index.json");

interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  type: "product" | "category" | "blog";
  category?: string;
  url: string;
  keywords: string[];
}

async function buildIndex() {
  const documents: SearchDoc[] = [];

  // Index products
  const productsDir = path.join(CONTENT_DIR, "products");
  try {
    const categories = await fs.readdir(productsDir);
    for (const category of categories) {
      const catDir = path.join(productsDir, category);
      const stat = await fs.stat(catDir);
      if (!stat.isDirectory()) continue;
      const files = await fs.readdir(catDir);
      for (const file of files) {
        if (!file.endsWith(".json")) continue;
        const raw = await fs.readFile(path.join(catDir, file), "utf-8");
        const p = JSON.parse(raw);
        documents.push({
          slug: p.slug,
          title: p.name,
          description: p.description,
          type: "product",
          category: p.category,
          url: `/reviews/${p.slug}`,
          keywords: [
            p.name,
            p.category,
            ...(p.seoMeta?.keywords ?? []),
            ...(p.keyFeatures?.map((f: { name: string }) => f.name) ?? []),
          ],
        });
      }
    }
  } catch {
    console.warn("No products found to index");
  }

  // Index categories
  const categoriesDir = path.join(CONTENT_DIR, "categories");
  try {
    const files = await fs.readdir(categoriesDir);
    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await fs.readFile(path.join(categoriesDir, file), "utf-8");
      const c = JSON.parse(raw);
      documents.push({
        slug: c.slug,
        title: c.name,
        description: c.description,
        type: "category",
        url: `/categories/${c.slug}`,
        keywords: [c.name, ...(c.seoMeta?.keywords ?? [])],
      });
    }
  } catch {
    console.warn("No categories found to index");
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    documents,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(index));
  console.log(`Search index built: ${documents.length} documents`);
}

buildIndex().catch(console.error);
