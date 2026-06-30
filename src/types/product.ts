// ===== Core Product/Review Data Model =====

export interface Pricing {
  startingPrice: number;
  priceUnit: string;
  displayPrice: string;
  hasFreeTrial: boolean;
  hasFreeVersion: boolean;
  moneyBackGuaranteeDays: number;
  regularPrice?: number;
}

export interface RatingBreakdown {
  overall: number;
  features: number;
  easeOfUse: number;
  pricing: number;
  support: number;
  reliability: number;
  [key: string]: number;
}

export interface Feature {
  name: string;
  description: string;
  icon?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type AwardTier = "gold" | "silver" | "bronze" | "excellence";

export interface Award {
  tier: AwardTier;
  label: string;
  description?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface ReviewAuthor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  logo: string;
  image: string;
  website: string;
  pricing: Pricing;
  ratings: RatingBreakdown;
  pros: string[];
  cons: string[];
  keyFeatures: Feature[];
  specs: Record<string, string>;
  verdict: string;
  faqs: FAQ[];
  awards: Award[];
  lastUpdated: string;
  reviewDate: string;
  author: ReviewAuthor;
  affiliateUrl: string;
  comparisonData: Record<string, string | boolean>;
  rank?: number;
  seoMeta: SEOMeta;
}
