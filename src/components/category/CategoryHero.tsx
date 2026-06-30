export function CategoryHero({
  category,
}: {
  category: { name: string; longDescription: string; testingCriteria: string[] };
}) {
  return (
    <section className="bg-gradient-to-b from-brand-900 to-brand-800 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Best {category.name} of 2026
        </h1>
        <p className="mt-4 text-lg text-brand-100 max-w-3xl leading-relaxed">
          {category.longDescription}
        </p>
        {category.testingCriteria.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.testingCriteria.map((criterion, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/10 rounded-lg p-4"
              >
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-brand-100">{criterion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
