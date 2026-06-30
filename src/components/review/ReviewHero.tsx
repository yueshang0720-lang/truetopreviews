import type { Product } from "@/types";
import { RatingBadge, StarRating } from "@/components/shared/StarRating";
import { Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export function ReviewHero({ product }: { product: Product }) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-brand-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Text content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {product.awards.map((award, i) => (
                <Badge key={i} variant={award.tier} size="md">
                  {award.label}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {product.name} Review 2026
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              {product.tagline}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.ratings.overall} size="md" />
              <span className="text-sm text-slate-400">
                Updated {formatDate(product.lastUpdated)}
              </span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/30 transition-colors"
              >
                Visit {product.name}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              {product.pricing.moneyBackGuaranteeDays}-day money-back guarantee
              {product.pricing.hasFreeTrial && " &bull; Free trial available"}
            </div>
          </div>

          {/* Right: Score */}
          <div className="flex-shrink-0 flex flex-col items-center bg-white/10 backdrop-blur rounded-2xl p-6">
            <p className="text-sm text-slate-300 mb-3 font-medium">Overall Rating</p>
            <RatingBadge score={product.ratings.overall} size="lg" />
            <p className="mt-3 text-sm text-slate-300 font-medium">
              {product.ratings.overall >= 9
                ? "Outstanding"
                : product.ratings.overall >= 8
                ? "Excellent"
                : product.ratings.overall >= 7
                ? "Very Good"
                : "Good"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
