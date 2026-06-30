export function StarRating({
  rating,
  maxStars = 5,
  showNumeric = false,
  size = "md",
}: {
  rating: number; // 0-10 scale, will be converted to 0-5 for stars
  maxStars?: number;
  showNumeric?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  // Convert 10-point scale to 5-star scale
  const starValue = rating / 2;
  const fullStars = Math.floor(starValue);
  const hasHalf = starValue - fullStars >= 0.25;
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const starSize = sizes[size];
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 10`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className={`${starSize} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {/* Half star */}
      {hasHalf && (
        <svg
          className={`${starSize} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={`${starSize} text-gray-300`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {showNumeric && (
        <span className={`ml-1 ${textSize} font-semibold text-slate-600`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function RatingBadge({
  score,
  outOf = 10,
  size = "md",
}: {
  score: number;
  outOf?: number;
  size?: "sm" | "md" | "lg";
}) {
  const getColor = (s: number) => {
    if (s >= 9) return "bg-green-600";
    if (s >= 8) return "bg-green-500";
    if (s >= 7) return "bg-yellow-500";
    if (s >= 6) return "bg-orange-500";
    return "bg-red-500";
  };

  const sizes = {
    sm: "w-10 h-10 text-lg",
    md: "w-14 h-14 text-xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <div
      className={`${sizes[size]} ${getColor(score)} rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-sm`}
      title={`Score: ${score}/${outOf}`}
    >
      <span className="leading-none">{score.toFixed(1)}</span>
      {size !== "sm" && (
        <span className="text-[0.5em] opacity-80 leading-none mt-0.5">
          /{outOf}
        </span>
      )}
    </div>
  );
}
