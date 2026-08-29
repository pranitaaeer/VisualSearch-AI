"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Cpu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 animate-pulse">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              VisualLens AI
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:opacity-95 active:scale-95"
            >
              <span>Dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-900/50 animate-bounce">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Visual Search Engine v2.0</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-gray-900 dark:text-white leading-tight">
            Search by image, <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              discover instantly with AI.
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            The ultimate visual search platform to pinpoint exact matches, near duplicates, and complex patterns using advanced deep learning vector embeddings.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              High-performance vector matching delivering similarity results in milliseconds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-2xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-5">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">AI Embeddings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Deep learning networks analyzing textures, colors, and complex visual elements accurately.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Duplicate Detection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Instantly pinpoint exact matches and near-duplicate asset variations in your database.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} VisualLens AI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}