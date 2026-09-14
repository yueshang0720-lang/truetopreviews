import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { loadBlogPost } from "@/lib/content/blog";
import { loadAllBlogPosts } from "@/lib/content/blog";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await loadAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoMeta.title ?? post.title,
    description: post.seoMeta.description ?? post.excerpt,
    keywords: post.seoMeta.keywords,
  };
}

function renderInline(text: string) {
  const parts = text
    .split(/(\*\*[^*]+\*\*|\[[^\]]*\]\([^)]*\))/g)
    .filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="nofollow sponsored noopener"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${slug}` },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-slate-400">{post.readTimeMinutes} min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>By {post.author}</span>
            <span>&bull;</span>
            <span>{formatDate(post.date)}</span>
            {post.updatedDate && (
              <>
                <span>&bull;</span>
                <span>Updated {formatDate(post.updatedDate)}</span>
              </>
            )}
          </div>
        </div>
        <div className="prose max-w-none">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i}>{block.slice(3)}</h2>;
            }
            if (block.startsWith("### ")) {
              return <h3 key={i}>{block.slice(4)}</h3>;
            }
            const img = block.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
            if (img) {
              return (
                <img
                  key={i}
                  src={img[2]}
                  alt={img[1]}
                  loading="lazy"
                  className="w-full rounded-xl my-6"
                />
              );
            }
            const lines = block.split("\n");
            if (
              lines.length > 1 &&
              lines.every((l) => l.trimStart().startsWith("- "))
            ) {
              return (
                <ul key={i}>
                  {lines.map((l, j) => (
                    <li key={j}>{renderInline(l.trimStart().slice(2))}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{renderInline(block)}</p>;
          })}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="text-brand-600 hover:text-brand-700 font-medium">
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </Container>
  );
}
