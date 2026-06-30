import Link from "next/link";
import type { Product } from "@/types";
import { Container, SectionHeading, Badge } from "@/components/ui";
import { RatingBadge } from "@/components/shared/StarRating";

export function TopPicksSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <SectionHeading
          title="Our Top Picks"
          subtitle="These products earned our highest ratings after rigorous testing."
          action={{ label: "View All Reviews", href: "/categories" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/reviews/${product.slug}`}
              className="group relative rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-lg hover:border-brand-200 transition-all"
            >
              {/* Award badge */}
              {product.awards.length > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge variant={product.awards[0].tier}>
                    {product.awards[0].label}
                  </Badge>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Rank number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {product.tagline}
                  </p>
                </div>
                <RatingBadge score={product.ratings.overall} size="md" />
              </div>

              <p className="mt-4 text-sm text-slate-600 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
                  Read Full Review &rarr;
                </span>
                <span className="text-sm text-slate-400">
                  {product.pricing.displayPrice}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
