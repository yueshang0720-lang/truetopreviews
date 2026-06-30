/**
 * Build an affiliate tracking URL from a product's official website.
 * Adds tracking parameters so you can earn commission on referred sales.
 *
 * @param baseUrl - The official product URL (e.g., https://www.apple.com/airpods-pro)
 * @param productSlug - The product identifier for tracking
 * @returns URL with tracking parameters appended
 */
export function buildAffiliateUrl(
  baseUrl: string,
  productSlug: string
): string {
  try {
    const url = new URL(baseUrl);
    // Standard tracking parameters — customize these for your affiliate network
    url.searchParams.set("ref", "ttr"); // TrueTopReviews referrer
    url.searchParams.set("pid", productSlug); // Product ID for analytics
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/**
 * Get the display URL with tracking for a product.
 * Uses the product's existing affiliateUrl if set, otherwise builds from website.
 */
export function getProductAffiliateUrl(product: {
  affiliateUrl?: string;
  website: string;
  slug: string;
}): string {
  const base = product.affiliateUrl || product.website;
  return buildAffiliateUrl(base, product.slug);
}
