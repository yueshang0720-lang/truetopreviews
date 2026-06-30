import type { Product } from "@/types";
import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { StarRating, RatingBadge } from "@/components/shared/StarRating";
import { getRankBadgeColor, getRankLabel } from "@/lib/utils";

export function CategoryHero({ category }: { category: { name: string; longDescription: string; testingCriteria: string[] } }) {
  return (
    <section className="bg-gradient-to-b from-brand-900 to-brand-800 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Best {category.name} of 2026
        </h1>
        <p className="mt-4 text-lg text-brand-100 max-w-3xl leading-relaxed">
          {category.longDescription}
        </p>
        {category.testingCriteria.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.testingCriteria.map((criterion, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-brand-100">{criterion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProductRankCard({ product }: { product: Product }) {
  const rank = product.rank ?? 0;
  const colors = getRankBadgeColor(rank);
  const label = getRankLabel(rank);
  const isTop3 = rank <= 3;

  return (
    <Card padding="lg" className={isTop3 ? "ring-1 ring-brand-100" : ""}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Rank badge */}
        <div className="flex lg:flex-col items-center gap-3 lg:w-24 flex-shrink-0">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {rank}
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {label}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h2 className="text-xl font-bold text-slate-900">
              <Link
                href={`/reviews/${product.slug}`}
                className="hover:text-brand-600 transition-colors"
              >
                {product.name}
              </Link>
            </h2>
            {product.awards.length > 0 && (
              <Badge variant={product.awards[0].tier}>
                {product.awards[0].label}
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                Pros
              </h4>
              <ul className="space-y-1">
                {product.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                Cons
              </h4>
              <ul className="space-y-1">
                {product.cons.slice(0, 3).map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
              <span key={key} className="bg-slate-50 px-2.5 py-1 rounded-md">
                <strong className="text-slate-700">{key}:</strong> {value}
              </span>
            ))}
          </div>
        </div>

        {/* Rating + CTA */}
        <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:w-48 flex-shrink-0 lg:border-l lg:border-gray-100 lg:pl-6">
          <div className="flex lg:flex-col items-center gap-3">
            <RatingBadge score={product.ratings.overall} size="lg" />
            <div className="text-center">
              <StarRating rating={product.ratings.overall} size="sm" />
              <div className="text-xs text-slate-400 mt-1">Overall Rating</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">
              {product.pricing.displayPrice}
            </div>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-2 inline-flex w-full items-center justify-center px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
            >
              Visit Site
            </a>
            <Link
              href={`/reviews/${product.slug}`}
              className="mt-1 block text-xs text-brand-600 hover:text-brand-700"
            >
              Read Full Review &rarr;
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
