import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/types";
import { loadCategory } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function loadProduct(slug: string): Promise<Product | null> {
  const productsDir = path.join(CONTENT_DIR, "products");
  let categoryDirs: string[] = [];
  try {
    categoryDirs = await fs.readdir(productsDir);
  } catch {
    return null;
  }

  for (const category of categoryDirs) {
    const filePath = path.join(productsDir, category, `${slug}.json`);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw) as Product;
    } catch {
      continue;
    }
  }
  return null;
}

export async function loadAllProducts(): Promise<Product[]> {
  const productsDir = path.join(CONTENT_DIR, "products");
  let categoryDirs: string[] = [];
  try {
    categoryDirs = await fs.readdir(productsDir);
  } catch {
    return [];
  }

  const products: Product[] = [];
  for (const category of categoryDirs) {
    const dirPath = path.join(productsDir, category);
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) continue;

    let files: string[] = [];
    try {
      files = await fs.readdir(dirPath);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const raw = await fs.readFile(path.join(dirPath, file), "utf-8");
      products.push(JSON.parse(raw) as Product);
    }
  }
  return products;
}

export async function loadProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const category = await loadCategory(categorySlug);
  if (!category) return [];

  const products: Product[] = [];
  for (let i = 0; i < category.products.length; i++) {
    const slug = category.products[i];
    const product = await loadProduct(slug);
    if (product) {
      product.rank = i + 1;
      products.push(product);
    }
  }
  return products;
}

export async function loadLatestReviews(count: number = 6): Promise<Product[]> {
  const all = await loadAllProducts();
  return all
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, count);
}

export async function loadFeaturedProducts(
  count: number = 3
): Promise<Product[]> {
  const all = await loadAllProducts();
  return all
    .filter((p) => p.awards.length > 0)
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, count);
}

export async function loadDealsProducts(): Promise<Product[]> {
  const all = await loadAllProducts();
  // Featured brand products
  const featuredSlugs = [
    "ourplace-always-pan",
    "shokz-openrun-pro",
    "shokz-openfit",
    "roborock-s8-maxv",
    "eufy-s350",
    "tp-link-deco-xe75",
    "reolink-argus-4",
    "reolink-doorbell",
    "ringconn-gen2",
    "jackery-explorer-2000",
  ];
  return featuredSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p != null)
    .sort((a, b) => b.ratings.overall - a.ratings.overall);
}
