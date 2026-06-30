import type { SEOMeta } from "./product";

export interface Comparison {
  slugs: string[];
  title: string;
  description: string;
  features: string[];
  verdict: {
    categoryWinners: Record<string, string>;
    overallWinner: string;
    overallReasoning: string;
  };
  seoMeta: SEOMeta;
}
