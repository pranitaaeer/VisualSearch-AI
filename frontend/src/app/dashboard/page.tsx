"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import SearchResults from "@/components/SearchResults";
import { searchImages, SearchResponse } from "@/lib/api";
import { AlertCircle, Sparkles } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (file: File) => {
    try {
      setLoading(true);
      setError("");
      setSearchData(null);

      const data = await searchImages(file);
      setSearchData(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-16 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        {/* Header Section */}
        <div className="mb-12 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Visual Search</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Find Similar Images Instantly
          </h1>
          <p className="max-w-xl mx-auto text-base text-gray-600 dark:text-gray-400">
            Upload an image or drag and drop to discover exact matches, near duplicates, and visually similar results.
          </p>
        </div>

        {/* Uploader Component */}
        <ImageUploader onSearch={handleSearch} loading={loading} />

        {/* Error Banner */}
        {error && (
          <div className="mt-6 flex items-center space-x-2 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400 shadow-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Component */}
        <SearchResults
          databaseResults={searchData?.database_results ?? []}
          webResults={searchData?.web_results ?? []}
        />
      </div>
    </main>
  );
}