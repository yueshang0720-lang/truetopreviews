import type { SEOMeta } from "./product";

export interface Category {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  products: string[];
  buyingGuideIntro: string;
  testingCriteria: string[];
  seoMeta: SEOMeta;
}
