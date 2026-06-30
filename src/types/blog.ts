import type { SEOMeta } from "./product";

export interface BlogFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  updatedDate?: string;
  category: string;
  image: string;
  tags: string[];
  readTimeMinutes: number;
  seoMeta: SEOMeta;
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
}

export interface Author {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}
