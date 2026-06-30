"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { SearchDocument, SearchIndex } from "@/types";

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<
    Array<{ item: SearchDocument; score: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      try {
        const res = await fetch("/search-index.json");
        const index: SearchIndex = await res.json();

        if (query.trim()) {
          const fuse = new Fuse(index.documents, {
            keys: ["title", "description", "keywords"],
            threshold: 0.4,
            includeScore: true,
          });
          const fuseResults = fuse.search(query).slice(0, 20);
          setResults(
            fuseResults.map((r) => ({ item: r.item, score: r.score ?? 0 }))
          );
        } else {
          setResults(
            index.documents.map((doc) => ({ item: doc, score: 0 }))
          );
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    doSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse h-24 bg-gray-100 rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg">
          No results found for &quot;{query}&quot;.
        </p>
        <Link
          href="/search"
          className="mt-4 inline-block text-brand-600 hover:text-brand-700 font-medium"
        >
          Browse all reviews
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-slate-500 mb-4">
        {query
          ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
          : `${results.length} total reviews`}
      </p>
      <div className="space-y-4">
        {results.map((r) => (
          <Link
            key={r.item.url}
            href={r.item.url}
            className="block p-5 rounded-xl border border-gray-200 hover:border-brand-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                {r.item.type}
              </span>
              <h2 className="font-semibold text-slate-900">{r.item.title}</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">{r.item.description}</p>
            {r.item.category && (
              <p className="mt-1 text-xs text-brand-500 capitalize">
                {r.item.category}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
