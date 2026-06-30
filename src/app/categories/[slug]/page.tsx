import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CategoryHero } from "@/components/category/CategoryHero";
import { ProductRankCard } from "@/components/category/ProductRankCard";
import { CategorySidebar } from "@/components/category/CategorySidebar";
import { loadCategory } from "@/lib/content/categories";
import { loadProductsByCategory } from "@/lib/content/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { loadAllCategories } = await import("@/lib/content/categories");
  const categories = await loadAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.seoMeta.title,
    description: category.seoMeta.description,
    keywords: category.seoMeta.keywords,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) notFound();

  const products = await loadProductsByCategory(slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: `/categories/${slug}` },
  ];

  return (
    <>
      <CategoryHero category={category} />
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 pt-8 pb-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <Breadcrumbs items={breadcrumbs} />
            <div className="space-y-8 mt-4">
              {products.map((product) => (
                <ProductRankCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-5">
              <CategorySidebar
                products={products}
                categoryName={category.name}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
