import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { loadPage } from "@/lib/content/pages";

export const metadata = { title: "How We Test | TrueTopReviews" };

export default async function HowWeTestPage() {
  const page = await loadPage("how-we-test");

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How We Test", href: "/how-we-test" }]} />
      <div className="py-12 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{page?.title ?? "How We Test"}</h1>
        {page?.content.split("\n\n").map((para, i) => {
          if (para.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-slate-900">{para.slice(3)}</h2>;
          return <p key={i} className="text-slate-700 leading-relaxed mb-4">{para}</p>;
        })}
      </div>
    </Container>
  );
}
