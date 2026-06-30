import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewHero } from "@/components/review/ReviewHero";
import { ScoreBreakdown } from "@/components/review/ScoreBreakdown";
import { ProsConsList } from "@/components/review/ProsConsList";
import { KeyFeatures } from "@/components/review/KeyFeatures";
import { ComparisonTable } from "@/components/review/ComparisonTable";
import { FAQAccordion } from "@/components/review/FAQAccordion";
import { AuthorCard } from "@/components/review/AuthorCard";
import { FinalVerdict } from "@/components/review/FinalVerdict";
import { ReviewSchema } from "@/components/seo/ReviewSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { loadProduct, loadProductsByCategory } from "@/lib/content/products";
import { loadCategory } from "@/lib/content/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { loadAllProducts } = await import("@/lib/content/products");
  const products = await loadAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return { title: "Review Not Found" };

  return {
    title: product.seoMeta.title,
    description: product.seoMeta.description,
    keywords: product.seoMeta.keywords,
    openGraph: {
      title: product.seoMeta.title,
      description: product.seoMeta.description,
      type: "article",
      images: [product.seoMeta.ogImage ?? product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoMeta.title,
      description: product.seoMeta.description,
    },
    alternates: {
      canonical: product.seoMeta.canonical ?? `/reviews/${slug}`,
    },
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const category = await loadCategory(product.category);
  const competitors = category
    ? (await loadProductsByCategory(category.slug))
        .filter((p) => p.slug !== product.slug)
        .slice(0, 2)
    : [];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category?.name ?? product.category, href: `/categories/${product.category}` },
    { label: `${product.name} Review`, href: `/reviews/${slug}` },
  ];

  return (
    <>
      <ReviewSchema product={product} />
      <FAQSchema faqs={product.faqs} />
      <Container>
        <Breadcrumbs items={breadcrumbs} />
      </Container>
      <ReviewHero product={product} />
      <Container>
        <div className="py-12 space-y-12">
          <ScoreBreakdown ratings={product.ratings} />

          {/* About section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">About {product.name}</h2>
            <div className="prose max-w-none text-slate-700">
              {product.longDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <ProsConsList pros={product.pros} cons={product.cons} />
          <KeyFeatures features={product.keyFeatures} />

          {/* Specs */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Technical Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-slate-50 rounded-lg p-4">
                  <dt className="text-xs text-slate-400 uppercase tracking-wide mb-1">{key}</dt>
                  <dd className="text-sm font-semibold text-slate-800">{value}</dd>
                </div>
              ))}
            </div>
          </div>

          {competitors.length > 0 && (
            <ComparisonTable currentProduct={product} competitors={competitors} />
          )}

          <FAQAccordion faqs={product.faqs} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <AuthorCard author={product.author} />
            </div>
            <div className="lg:col-span-2">
              <FinalVerdict product={product} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
