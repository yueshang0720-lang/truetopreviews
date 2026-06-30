import Link from "next/link";
import type { Product } from "@/types";

export function CategorySidebar({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  const top3 = products.slice(0, 3);
  const rest = products.slice(3);
  const bestValue = [...products]
    .sort((a, b) => b.ratings.pricing - a.ratings.pricing)
    .slice(0, 2);
  const topSlugs = top3.map((p) => p.slug).join("/");

  return (
    <aside className="space-y-5">
      {/* Hero illustration */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, white 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />
        <div className="relative">
          <div className="text-5xl mb-3">
            {categoryName.includes("Phone") ? "📱" :
             categoryName.includes("Laptop") ? "💻" :
             categoryName.includes("Earbud") || categoryName.includes("Headphone") ? "🎧" :
             categoryName.includes("Vacuum") ? "🤖" :
             categoryName.includes("Air") ? "🌬️" :
             categoryName.includes("Coffee") ? "☕" :
             categoryName.includes("VPN") ? "🔒" :
             categoryName.includes("Antivirus") ? "🛡️" :
             categoryName.includes("Password") ? "🔑" :
             categoryName.includes("Hosting") ? "🌐" : "⭐"}
          </div>
          <h3 className="font-bold text-lg leading-tight">
            Best {categoryName} of 2026
          </h3>
          <p className="text-white/70 text-xs mt-1">
            {products.length} products tested &bull; Expert reviews
          </p>
        </div>
      </div>

      {/* Top Picks Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-50 to-orange-50 px-4 py-3 border-b border-brand-100">
          <h3 className="font-bold text-brand-900 text-sm flex items-center gap-1.5">
            <span>🏆</span> Top Picks
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {top3.map((p, i) => {
            const colors = [
              "bg-amber-50 text-amber-700 border-amber-200",
              "bg-gray-50 text-gray-600 border-gray-200",
              "bg-orange-50 text-orange-600 border-orange-200",
            ];
            const labels = ["Best Overall", "Runner Up", "Great Value"];
            return (
              <Link
                key={p.slug}
                href={`/reviews/${p.slug}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${colors[i]}`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-400">{labels[i]}</div>
                </div>
                <span className="flex-shrink-0 text-sm font-bold text-green-600">
                  {p.ratings.overall}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Best Value */}
      {bestValue.length > 0 && (
        <div className="bg-green-50/50 rounded-2xl border border-green-100 p-4">
          <h3 className="font-bold text-green-800 text-sm flex items-center gap-1.5 mb-3">
            <span>💰</span> Best Value
          </h3>
          {bestValue.map((p) => (
            <Link
              key={p.slug}
              href={`/reviews/${p.slug}`}
              className="flex items-center justify-between py-2 hover:bg-green-100/30 rounded-lg px-2 -mx-2 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-slate-800">
                  {p.name}
                </div>
                <div className="text-xs text-slate-500">{p.pricing.displayPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-green-700">
                  Score {p.ratings.pricing}/10
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Compare Button */}
      {top3.length >= 2 && (
        <Link
          href={`/compare/${topSlugs}`}
          className="block w-full text-center px-4 py-3 bg-brand-600 text-white text-sm font-semibold rounded-2xl hover:bg-brand-700 transition-colors shadow-sm"
        >
          Compare Top 3 Side-by-Side
        </Link>
      )}

      {/* Also Reviewed */}
      {rest.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">
              Also Reviewed
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/reviews/${p.slug}`}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs text-slate-700 truncate flex-1 mr-2">
                  {p.name}
                </span>
                <span className="flex-shrink-0 text-xs font-semibold text-slate-400">
                  {p.ratings.overall}/10
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* How We Rate */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
          <span>📊</span> How We Rate
        </h3>
        <div className="space-y-2">
          {[
            { label: "Features", desc: "Capabilities and extras" },
            { label: "Ease of Use", desc: "Setup and daily experience" },
            { label: "Value", desc: "Cost vs what you get" },
            { label: "Support", desc: "Help when you need it" },
            { label: "Reliability", desc: "Consistency and durability" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <span className="w-20 text-slate-500 flex-shrink-0">
                {item.label}
              </span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-400 rounded-full"
                  style={{
                    width: `${Math.floor(50 + Math.random() * 45)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/how-we-test"
          className="mt-3 block text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          Full testing methodology &rarr;
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200">
        <h3 className="font-bold text-slate-800 text-sm mb-3">
          At a Glance
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-lg font-extrabold text-brand-700">
              {products.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Tested</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-lg font-extrabold text-green-600">
              {products.length > 0
                ? Math.max(...products.map((p) => p.ratings.overall)).toFixed(1)
                : "-"}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Top Score</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-lg font-extrabold text-amber-600">
              {products.length > 0
                ? "$" + Math.round(
                    products.reduce((sum, p) => sum + p.pricing.startingPrice, 0) /
                      products.length
                  )
                : "-"}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Avg Price</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-lg font-extrabold text-purple-600">
              {new Date().getFullYear()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Updated</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
