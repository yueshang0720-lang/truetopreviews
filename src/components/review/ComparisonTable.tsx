import type { Product } from "@/types";
import { StarRating } from "@/components/shared/StarRating";
import Link from "next/link";

const COMPARISON_ROWS = [
  { key: "startingPrice", label: "Starting Price", category: "pricing" as const },
  { key: "moneyBackDays", label: "Money-Back Guarantee", category: "pricing" as const },
  { key: "freeVersion", label: "Free Version", category: "pricing" as const },
  { key: "serverCount", label: "Server Count", category: "features" as const },
  { key: "countries", label: "Countries", category: "features" as const },
  { key: "simultaneousConnections", label: "Simultaneous Connections", category: "features" as const },
  { key: "noLogsPolicy", label: "No-Logs Policy", category: "privacy" as const },
  { key: "auditedNoLogs", label: "Independently Audited", category: "privacy" as const },
  { key: "killSwitch", label: "Kill Switch", category: "features" as const },
  { key: "netflixAccess", label: "Netflix Access", category: "features" as const },
  { key: "liveChat", label: "24/7 Live Chat", category: "support" as const },
];

function renderValue(value: string | boolean): React.ReactNode {
  if (typeof value === "boolean") {
    return value ? (
      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  }
  return <span className="text-sm text-slate-700">{value}</span>;
}

export function ComparisonTable({
  currentProduct,
  competitors,
}: {
  currentProduct: Product;
  competitors: Product[];
}) {
  const allProducts = [currentProduct, ...competitors.slice(0, 2)];

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Compare with Competitors</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200">
              <th className="px-4 py-3 text-sm font-semibold text-slate-700 min-w-[160px]">
                Feature
              </th>
              {allProducts.map((p) => (
                <th key={p.slug} className="px-4 py-3 text-center min-w-[120px]">
                  <div className="text-sm font-bold text-slate-900">{p.name}</div>
                  <div className="flex justify-center mt-1">
                    <StarRating rating={p.ratings.overall} size="sm" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.key} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm text-slate-600">{row.label}</td>
                {allProducts.map((p) => (
                  <td key={p.slug} className="px-4 py-3 text-center">
                    {renderValue(p.comparisonData?.[row.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {competitors.length > 0 && (
        <div className="mt-3 text-center">
          <Link
            href={`/compare/${allProducts.map((p) => p.slug).join("/")}`}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Full Comparison &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
