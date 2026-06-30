import { Suspense } from "react";
import { Container } from "@/components/ui";
import { SearchContent } from "./SearchContent";

export const metadata = {
  title: "Search | TrueTopReviews",
  description: "Search our database of expert reviews and comparisons.",
};

export default function SearchPage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Search Reviews
        </h1>
        <p className="text-slate-500 mb-8">
          Find the best products and services for your needs.
        </p>
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-xl" />
              ))}
            </div>
          }
        >
          <SearchContent />
        </Suspense>
      </div>
    </Container>
  );
}
