import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui";
import { StarRating } from "@/components/shared/StarRating";
import { ProductImage } from "@/components/home/ProductImage";
import { getProductAffiliateUrl } from "@/lib/affiliate";

function DealCard({ product }: { product: Product }) {
  const affiliateUrl = getProductAffiliateUrl(product);
  const discount =
    product.pricing.regularPrice &&
    product.pricing.regularPrice > product.pricing.startingPrice
      ? Math.round(
          (1 -
            product.pricing.startingPrice /
              product.pricing.regularPrice) *
            100
        )
      : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all flex flex-col">
      {discount && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
            SAVE {discount}%
          </span>
        </div>
      )}

      <ProductImage
        src={`/images/products/${product.image}`}
        alt={product.name}
        category={product.category}
      />

      {product.awards.length > 0 && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white">
            {product.awards[0].tier === "gold" ? "BEST PICK" : "TOP RATED"}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <StarRating rating={product.ratings.overall} size="sm" />
          </div>
          <span className="text-sm font-bold text-green-600">
            {product.ratings.overall}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-slate-900">
              {product.pricing.displayPrice.split("(")[0].trim()}
            </span>
            {discount && product.pricing.regularPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${product.pricing.regularPrice}
                {product.pricing.priceUnit}
              </span>
            )}
          </div>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-sm shadow-orange-500/20"
          >
            Check Price
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <Link
            href={`/reviews/${product.slug}`}
            className="mt-2 block text-center text-xs text-slate-400 hover:text-brand-600 transition-colors"
          >
            Read Full Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedDeals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            🔥 Today&apos;s Top Deals
          </h2>
          <p className="mt-2 text-slate-500 text-center max-w-2xl mx-auto">
            Our experts hand-picked these products with the best value. Exclusive discounts available through our links.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <DealCard key={product.slug} product={product} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Prices updated regularly. We may earn a commission when you purchase
          through our links at no extra cost to you.{" "}
          <Link
            href="/disclosure"
            className="underline hover:text-brand-600 transition-colors"
          >
            Learn more
          </Link>
        </p>
      </Container>
    </section>
  );
}
