import type { RatingBreakdown } from "@/types";
import { RATING_LABELS } from "@/lib/constants";

const ORDERED_KEYS = ["features", "easeOfUse", "pricing", "support", "reliability"];

export function ScoreBreakdown({ ratings }: { ratings: RatingBreakdown }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Rating Breakdown</h2>
      <div className="space-y-4">
        {/* Overall */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <span className="w-32 text-sm font-semibold text-slate-700">Overall</span>
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all"
              style={{ width: `${(ratings.overall / 10) * 100}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-bold text-slate-900">
            {ratings.overall.toFixed(1)}
          </span>
        </div>
        {ORDERED_KEYS.map((key) => {
          const value = ratings[key] ?? 0;
          const pct = (value / 10) * 100;
          const color =
            value >= 9 ? "bg-green-500" : value >= 8 ? "bg-blue-500" : value >= 7 ? "bg-yellow-500" : "bg-orange-500";
          return (
            <div key={key} className="flex items-center gap-4">
              <span className="w-32 text-sm text-slate-600">
                {RATING_LABELS[key] ?? key}
              </span>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold text-slate-700">
                {value.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
