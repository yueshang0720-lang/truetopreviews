export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateUrl(...segments: string[]): string {
  return "/" + segments.filter(Boolean).join("/");
}

export function getRatingColor(score: number): string {
  if (score >= 9) return "bg-green-600";
  if (score >= 8) return "bg-green-500";
  if (score >= 7) return "bg-yellow-500";
  if (score >= 6) return "bg-orange-500";
  return "bg-red-500";
}

export function getRankBadgeColor(rank: number): {
  bg: string;
  text: string;
  border: string;
} {
  switch (rank) {
    case 1:
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-300",
      };
    case 2:
      return {
        bg: "bg-gray-50",
        text: "text-gray-600",
        border: "border-gray-300",
      };
    case 3:
      return {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-300",
      };
    default:
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      };
  }
}

export function getRankLabel(rank: number): string {
  switch (rank) {
    case 1:
      return "Best Overall";
    case 2:
      return "Runner Up";
    case 3:
      return "Also Great";
    default:
      return `Rank #${rank}`;
  }
}
