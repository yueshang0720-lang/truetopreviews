import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { loadAllBlogPosts } from "@/lib/content/blog";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Buying Guides & Articles | TrueTopReviews",
  description: "Expert buying guides, comparisons, and educational articles to help you make informed decisions.",
};

export default async function BlogIndexPage() {
  const posts = await loadAllBlogPosts();

  return (
    <Container>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Buying Guides &amp; Articles</h1>
          <p className="mt-2 text-slate-500">Expert insights to help you make informed decisions.</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-slate-500 text-center py-16">No articles yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-200 p-6 hover:border-brand-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTimeMinutes} min read</span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.author}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
