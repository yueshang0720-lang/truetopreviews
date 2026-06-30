import Link from "next/link";
import type { Product } from "@/types";
import { Container, SectionHeading } from "@/components/ui";
import { StarRating, RatingBadge } from "@/components/shared/StarRating";
import { formatDate } from "@/lib/utils";

export function LatestReviews({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeading
          title="Latest Reviews"
          subtitle="Recently updated reviews with fresh testing data and current pricing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/reviews/${product.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 p-6 hover:border-brand-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {product.category?.toUpperCase()} &bull; Updated {formatDate(product.lastUpdated)}
                  </p>
                </div>
                <RatingBadge score={product.ratings.overall} size="sm" />
              </div>

              <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <StarRating rating={product.ratings.overall} size="sm" showNumeric />
                <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                  Read Review &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
