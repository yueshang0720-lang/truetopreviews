import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Product } from "@/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StarRating } from "@/components/shared/StarRating";
import { loadComparison, loadAllComparisons } from "@/lib/content/comparisons";
import { loadProduct } from "@/lib/content/products";

interface PageProps {
  params: Promise<{ slugs: string[] }>;
}

export async function generateStaticParams() {
  const comparisons = await loadAllComparisons();
  return comparisons.map((c) => ({ slugs: c.slugs }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugs } = await params;
  const comparison = await loadComparison(slugs);
  if (!comparison) return { title: "Comparison Not Found" };
  return {
    title: comparison.seoMeta.title,
    description: comparison.seoMeta.description,
  };
}

function renderCell(value: string | boolean): React.ReactNode {
  if (typeof value === "boolean") {
    return value ? (
      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  }
  return <span className="text-sm text-slate-700">{value}</span>;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slugs } = await params;
  const comparison = await loadComparison(slugs);
  if (!comparison) notFound();

  const loaded = await Promise.all(slugs.map((slug) => loadProduct(slug)));
  const products: Product[] = loaded.filter((p): p is Product => p !== null);
  if (products.length < 2) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: comparison.title, href: `/compare/${slugs.join("/")}` },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          {comparison.title}
        </h1>
        <p className="text-slate-500 mb-8">{comparison.description}</p>

        {/* Product headers */}
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${products.length + 1}, auto)` }}>
          <div className="min-w-[180px]" />
          {products.map((p) => (
            <div key={p.slug} className="text-center p-4 bg-white rounded-xl border border-gray-200 min-w-[160px]">
              <Link href={`/reviews/${p.slug}`} className="text-lg font-bold text-brand-600 hover:text-brand-700">
                {p.name}
              </Link>
              <div className="flex justify-center mt-2">
                <StarRating rating={p.ratings.overall} size="sm" showNumeric />
              </div>
              <div className="mt-2 text-sm font-semibold">{p.pricing.displayPrice}</div>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-[200px]">Feature</th>
                {products.map((p) => (
                  <th key={p.slug} className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparison.features.map((key) => (
                <tr key={key} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm text-slate-600 font-medium">{key}</td>
                  {products.map((p) => (
                    <td key={p.slug} className="px-4 py-3 text-center">
                      {renderCell(p.comparisonData?.[key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verdict */}
        <div className="mt-8 bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-brand-900 mb-2">Our Verdict</h2>
          <p className="text-brand-800">{comparison.verdict.overallReasoning}</p>
          <div className="mt-4">
            <span className="text-sm font-semibold text-brand-700">
              Overall Winner:{" "}
            </span>
            <span className="text-lg font-bold text-brand-900">
              {comparison.verdict.overallWinner}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
