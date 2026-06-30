import { Container } from "@/components/ui";

const TRUST_ITEMS = [
  { icon: "🔍", label: "2,000+ Hours of Testing" },
  { icon: "📋", label: "300+ Products Reviewed" },
  { icon: "🔄", label: "Updated Weekly" },
  { icon: "⚡", label: "Independent & Unbiased" },
];

export function TrustBar() {
  return (
    <section className="py-3 bg-brand-900">
      <Container>
        <div className="grid grid-cols-4 gap-3 text-center">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="text-base">{item.icon}</span>
              <span className="text-[11px] font-medium text-brand-100">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
