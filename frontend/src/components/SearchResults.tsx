"use client";

import { SearchResult, WebResult } from "@/lib/api";

interface SearchResultsProps {
  databaseResults: SearchResult[];
  webResults: WebResult[];
}

export default function SearchResults({
  databaseResults,
  webResults,
}: SearchResultsProps) {
  const hasResults =
    databaseResults.length > 0 ||
    webResults.length > 0;

  if (!hasResults) {
    return (
      <div className="mt-16 flex max-w-xl flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
          🔍
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          No similar images found
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Try searching with another image.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-16 w-full max-w-6xl">

      {/* Database Results */}
      {databaseResults.length > 0 && (
        <div className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Database
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Similar images found in your indexed collection.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {databaseResults.map((result) => (
              <div
                key={result.image_id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                  <img
                    src={result.image_url}
                    alt="Similar image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Similarity
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    {(result.score * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Web Results */}
      {webResults.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Web Results
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Visually similar images found on the web.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {webResults.map((result, index) => (
              <a
                key={`${result.link}-${index}`}
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                  {result.thumbnail && (
                    <img
                      src={result.thumbnail}
                      alt={result.title || "Web result"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {result.title || "View image"}
                  </h3>

                  {result.source && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {result.source}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}