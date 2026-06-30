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
          {post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-slate-900">{para.slice(3)}</h2>;
            }
            if (para.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-slate-800">{para.slice(4)}</h3>;
            }
            return <p key={i} className="text-slate-700 leading-relaxed mb-4">{para}</p>;
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
