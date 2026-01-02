"use client";

import { useState } from "react";
import { searchAPI } from "@/lib/api";
import { useSearchStore } from "@/lib/store";

export default function Home() {
  const [query, setQuery] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const { setResults, setLoading, results, isLoading } = useSearchStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await searchAPI.search({
        query,
        fieldOfStudy: fieldOfStudy || undefined,
        limit: 10,
      });
      setResults(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-md bg-black/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎓 Thesis Finder
          </h1>
          <div className="space-x-4">
            <button className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition">
              Login
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Thesis Title
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            AI-powered search to discover thesis ideas, methodologies, and research datasets
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-lg p-6 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search thesis topics, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-4 py-2 text-white"
              >
                <option value="">All Fields of Study</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Information Security">Information Security</option>
                <option value="Health Technology">Health Technology</option>
              </select>

              <button
                type="submit"
                disabled={isLoading || !query}
                className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                {isLoading ? "Searching..." : "🔍 Search"}
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((thesis) => (
              <div
                key={thesis.id}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/60 transition group cursor-pointer"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-300 transition line-clamp-2">
                  {thesis.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <p>📚 {thesis.fieldOfStudy}</p>
                  <p>🔬 Method: {thesis.method || "N/A"}</p>
                  {thesis.keywords && thesis.keywords.length > 0 && (
                    <p>🏷️ {thesis.keywords.slice(0, 3).join(", ")}</p>
                  )}
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-semibold">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !isLoading && query && (
          <div className="text-center text-gray-400">
            <p className="text-lg">No results found. Try different keywords.</p>
          </div>
        )}

        {!query && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold mb-2">Smart Search</h3>
              <p className="text-sm text-gray-400">Find thesis titles by keywords and field</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-transparent border border-pink-500/30 rounded-lg p-6">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold mb-2">AI Generation</h3>
              <p className="text-sm text-gray-400">Generate unique titles and outlines</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Research Data</h3>
              <p className="text-sm text-gray-400">Access datasets and methodologies</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
