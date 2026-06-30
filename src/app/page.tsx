import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { TopPicksSection } from "@/components/home/TopPicksSection";
import { LatestReviews } from "@/components/home/LatestReviews";
import { loadAllCategories } from "@/lib/content/categories";
import { loadFeaturedProducts, loadDealsProducts, loadLatestReviews } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "TrueTopReviews — Expert Reviews & Comparisons",
  description:
    "Expert reviews and comparisons of the best software, electronics, and home appliances. Honest ratings and exclusive deals to help you make informed decisions.",
};

export default async function HomePage() {
  const [categories, featuredProducts, dealsProducts, latestReviews] =
    await Promise.all([
      loadAllCategories(),
      loadFeaturedProducts(3),
      loadDealsProducts(),
      loadLatestReviews(6),
    ]);

  return (
    <>
      <HeroBanner />
      <TrustBar />
      {dealsProducts.length > 0 && <FeaturedDeals products={dealsProducts} />}
      <CategoryGrid categories={categories} />
      {featuredProducts.length > 0 && (
        <TopPicksSection products={featuredProducts} />
      )}
      <LatestReviews products={latestReviews} />
    </>
  );
}
