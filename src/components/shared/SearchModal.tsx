"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import type { SearchDocument, SearchIndex } from "@/types";

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Load index on mount
  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchIndex) => setIndex(data))
      .catch(() => setIndex(null));
  }, []);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => {
        const input = document.getElementById("search-modal-input");
        input?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Search as user types
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([]);
      return;
    }
    const fuse = new Fuse(index.documents, {
      keys: ["title", "description", "keywords"],
      threshold: 0.4,
    });
    const r = fuse.search(query).slice(0, 8);
    setResults(r.map((x) => x.item));
    setSelectedIndex(0);
  }, [query, index]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
          onClose();
        }
      }
    },
    [results, selectedIndex, query, router, onClose]
  );

  // Global Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Trigger open via a custom event since we can't call setState from here
          window.dispatchEvent(new CustomEvent("open-search"));
        }
      }
    };
    window.addEventListener("keydown", handler);
    // Listen for the custom event
    const openHandler = () => {
      document.dispatchEvent(new CustomEvent("trigger-search-open"));
    };
    window.addEventListener("open-search", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-search", openHandler);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeBadge = (type: string) => {
    const colors: Record<string, string> = {
      product: "bg-blue-100 text-blue-700",
      category: "bg-green-100 text-green-700",
      blog: "bg-purple-100 text-purple-700",
    };
    return colors[type] ?? "bg-gray-100 text-gray-600";
  };

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-x-0 top-[15%] mx-auto max-w-xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <svg
              className="w-5 h-5 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search-modal-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Search reviews, categories, guides... (e.g. "VPN")'
              className="flex-1 text-base text-slate-900 placeholder-slate-400 outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-slate-400 bg-slate-100 rounded font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {query.trim() && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((item, i) => (
                <button
                  key={item.url}
                  onClick={() => {
                    router.push(item.url);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                    i === selectedIndex ? "bg-brand-50" : ""
                  }`}
                >
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded mt-0.5 ${typeBadge(item.type)}`}
                  >
                    {item.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-400">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {!query.trim() && (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              Type to search reviews, categories, and guides
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
