export interface SearchDocument {
  slug: string;
  title: string;
  description: string;
  type: "product" | "category" | "blog";
  category?: string;
  url: string;
  keywords: string[];
}

export interface SearchIndex {
  version: number;
  generatedAt: string;
  documents: SearchDocument[];
}

export interface SearchResult {
  item: SearchDocument;
  score: number;
  matches?: ReadonlyArray<{
    key: string;
    indices: ReadonlyArray<[number, number]>;
  }>;
}
