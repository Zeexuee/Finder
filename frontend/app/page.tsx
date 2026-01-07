"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { searchAPI } from "@/lib/api";
import { useSearchStore } from "@/lib/store";
import ThesisCard from "@/components/thesis/ThesisCard";
import { FiLoader, FiSearch, FiTrendingUp, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const { setResults, setLoading, results, isLoading } = useSearchStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Silakan masukkan keyword pencarian");
      return;
    }
    setLoading(true);

    try {
      const response = await searchAPI.search({
        query,
        fieldOfStudy: fieldOfStudy || undefined,
        limit: 10,
      });
      setResults(response.data.results);
      if (response.data.results.length === 0) {
        toast("Tidak ada hasil yang ditemukan. Coba keyword lain.", { icon: "🔍" });
      } else {
        toast.success(`Ditemukan ${response.data.results.length} hasil!`);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error("Pencarian gagal. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const trendingTopics = [
    { emoji: "🤖", label: "AI & Machine Learning" },
    { emoji: "📱", label: "Mobile Development" },
    { emoji: "☁️", label: "Cloud Computing" },
    { emoji: "🔐", label: "Cybersecurity" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-b from-white to-gray-50 pb-20 pt-16 sm:pt-24 lg:pb-32 lg:pt-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block p-3 rounded-2xl bg-purple-50 text-3xl mb-6 shadow-sm">🎓</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block xl:inline">Temukan Referensi</span>{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 xl:inline">
                Skripsi Terbaik
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Gunakan kekuatan AI untuk mencari judul, dataset, dan referensi penelitian yang relevan dengan kebutuhan akademismu.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-xl p-2 md:p-3 gap-2 md:gap-3 items-stretch shadow-purple-900/5">
                
                {/* Search Input */}
                <div className="flex-1 relative flex items-center">
                  <FiSearch className="absolute left-4 text-purple-500 text-xl" />
                  <input
                    type="text"
                    placeholder="Cari topik, kata kunci, metodologi..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 md:py-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
                  />
                </div>

                {/* Divider on desktop */}
                <div className="hidden md:block w-px bg-gray-200 my-2"></div>

                {/* Filter Select */}
                <div className="relative md:w-64">
                   <select
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full h-full appearance-none bg-transparent pl-4 pr-10 py-3 md:py-4 text-gray-700 font-medium focus:outline-none cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <option value="">📚 Semua Bidang</option>
                    <option value="Computer Science">💻 Komputer</option>
                    <option value="Engineering">⚙️ Teknik</option>
                    <option value="Data Science">📊 Data</option>
                    <option value="Information Security">🔒 Keamanan</option>
                    <option value="Health Technology">🏥 Kesehatan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-8 py-3 md:py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300
                    ${isLoading || !query.trim() 
                      ? "bg-gray-300 cursor-not-allowed" 
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/30"}
                  `}
                >
                  {isLoading ? (
                    <FiLoader className="animate-spin text-xl" />
                  ) : (
                    <>
                      <span>Cari</span>
                      <FiArrowRight className="text-xl" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Results Area */}
          <div className="max-w-7xl mx-auto">
            {results.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Hasil Pencarian
                    <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {results.length} Found
                    </span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((thesis) => (
                    <motion.div 
                      key={thesis.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThesisCard
                        id={thesis.id}
                        title={thesis.title}
                        fieldOfStudy={thesis.fieldOfStudy}
                        keywords={thesis.keywords || []}
                        abstractSummary={thesis.abstractSummary || "Tidak ada ringkasan tersedia."}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : !isLoading ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiTrendingUp className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Pencarian Populer</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {trendingTopics.map((topic, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setQuery(topic.label)}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-300 group"
                    >
                      <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{topic.emoji}</span>
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {topic.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <FiLoader className="relative animate-spin text-5xl text-purple-600 mb-4" />
                </div>
                <p className="text-gray-500 font-medium text-lg animate-pulse">Sedang mencari referensi terbaik...</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
