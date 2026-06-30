import { MetadataRoute } from "next";
import { loadAllProducts } from "@/lib/content/products";
import { loadAllCategories } from "@/lib/content/categories";
import { loadAllBlogPosts } from "@/lib/content/blog";
import { loadAllComparisons } from "@/lib/content/comparisons";

function safeDate(dateStr: string | undefined): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://truetopreviews.com";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/disclosure`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/how-we-test`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
  ];

  const [products, categories, blogPosts, comparisons] = await Promise.all([
    loadAllProducts(),
    loadAllCategories(),
    loadAllBlogPosts(),
    loadAllComparisons(),
  ]);

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/reviews/${p.slug}`,
    lastModified: safeDate(p.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: safeDate(b.updatedDate ?? b.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const comparisonRoutes = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slugs.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...comparisonRoutes,
  ];
}
