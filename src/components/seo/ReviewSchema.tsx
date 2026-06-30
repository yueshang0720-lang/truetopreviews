import type { Product } from "@/types";
import { SITE_NAME } from "@/lib/constants";

export function ReviewSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.name,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.ratings.overall,
        bestRating: 10,
        worstRating: 0,
      },
      author: {
        "@type": "Person",
        name: product.author.name,
        jobTitle: product.author.title,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      datePublished: product.reviewDate,
      dateModified: product.lastUpdated,
      reviewBody: product.verdict,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratings.overall,
      bestRating: 10,
      worstRating: 0,
      ratingCount: 1,
    },
    offers: {
      "@type": "Offer",
      price: product.pricing.startingPrice.toString(),
      priceCurrency: "USD",
      description: product.pricing.displayPrice,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
