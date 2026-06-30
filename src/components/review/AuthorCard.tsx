import type { ReviewAuthor } from "@/types";

export function AuthorCard({ author }: { author: ReviewAuthor }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-gray-200">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
        {author.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{author.name}</h3>
        <p className="text-sm text-slate-500">{author.title}</p>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{author.bio}</p>
      </div>
    </div>
  );
}
