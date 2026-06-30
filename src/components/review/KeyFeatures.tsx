import type { Feature } from "@/types";

const ICON_MAP: Record<string, string> = {
  shield: "🛡️",
  zap: "⚡",
  network: "🌐",
  monitor: "🖥️",
  server: "🖧",
  lock: "🔒",
  layers: "📚",
  infinity: "♾️",
  "map-pin": "📍",
  refresh: "🔄",
};

export function KeyFeatures({ features }: { features: Feature[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-6">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:border-brand-200 hover:shadow-sm transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-xl">
              {feature.icon ? ICON_MAP[feature.icon] ?? "✨" : "✨"}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{feature.name}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
