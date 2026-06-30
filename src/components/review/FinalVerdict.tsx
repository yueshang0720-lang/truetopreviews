import type { Product } from "@/types";
import { RatingBadge } from "@/components/shared/StarRating";

export function FinalVerdict({ product }: { product: Product }) {
  return (
    <div className="bg-gradient-to-br from-brand-900 to-slate-800 rounded-2xl p-8 lg:p-10 text-white">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Final Verdict</h2>
          <p className="text-brand-100 leading-relaxed text-base">
            {product.verdict}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold text-base rounded-xl shadow-lg shadow-green-500/20 transition-colors"
            >
              Try {product.name} Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            {product.pricing.displayPrice} &bull; {product.pricing.moneyBackGuaranteeDays}-day money-back guarantee
          </p>
        </div>
        <div className="flex-shrink-0 bg-white/10 rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-300 mb-2">Overall Score</p>
          <RatingBadge score={product.ratings.overall} size="lg" />
        </div>
      </div>
    </div>
  );
}
