import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { loadPage } from "@/lib/content/pages";

export const metadata = { title: "About Us | TrueTopReviews" };

export default async function AboutPage() {
  const page = await loadPage("about");

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
      <div className="py-12 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{page?.title ?? "About Us"}</h1>
        {page?.content.split("\n\n").map((para, i) => {
          if (para.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-slate-900">{para.slice(3)}</h2>;
          if (para.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-slate-800">{para.slice(4)}</h3>;
          return <p key={i} className="text-slate-700 leading-relaxed mb-4">{para}</p>;
        })}
      </div>
    </Container>
  );
}
