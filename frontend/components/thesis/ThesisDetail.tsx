"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { searchAPI } from "@/lib/api";
import { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiLoader } from "react-icons/fi";

interface Thesis {
  id: string;
  title: string;
  fieldOfStudy: string;
  keywords: string[];
  method: string;
  abstractSummary: string;
  author?: string;
  year?: number;
}

interface RelatedThesis {
  id: string;
  title: string;
  fieldOfStudy: string;
  similarity?: number;
}

interface Props {
  id: string;
}

export default function ThesisDetailComponent({ id }: Props) {
  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [related, setRelated] = useState<RelatedThesis[]>([]);
  const [methodRecommendations, setMethodRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchThesisDetail = async () => {
      try {
        setIsLoading(true);
        
        // Fetch thesis detail
        const detailRes = await searchAPI.getDetail(id);
        setThesis(detailRes.data);

        // Fetch related thesis
        const relatedRes = await searchAPI.getRelated(id, 5);
        setRelated(relatedRes.data.related || []);

        // Fetch method recommendations
        if (detailRes.data.keywords?.length > 0) {
          const methodRes = await searchAPI.recommendMethod(detailRes.data.keywords);
          setMethodRecommendations(methodRes.data.recommendations || []);
        }
      } catch (error: any) {
        const errorMsg = error.response?.data?.error || "Gagal memuat detail thesis";
        toast.error(errorMsg);
        console.error("Error fetching thesis detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThesisDetail();
  }, [id]);

  const handleDownload = () => {
    toast.success("Download dimulai...");
    // TODO: Implement download functionality
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Dihapus dari favorit" : "Ditambahkan ke favorit");
    // TODO: Save to backend
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link disalin ke clipboard!");
    } catch (error) {
      toast.error("Gagal menyalin link");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FiLoader className="animate-spin mx-auto mb-4" size={40} />
          <p className="text-gray-400">Memuat detail thesis...</p>
        </div>
      </div>
    );
  }

  if (!thesis) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Thesis tidak ditemukan</p>
        <Link href="/" className="text-purple-400 hover:text-purple-300">
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
        <FiArrowLeft size={20} />
        Kembali ke Pencarian
      </Link>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{thesis.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-300">
                {thesis.author && (
                  <div>
                    <span className="text-gray-400">Author:</span> {thesis.author}
                  </div>
                )}
                {thesis.year && (
                  <div>
                    <span className="text-gray-400">Year:</span> {thesis.year}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 ml-4">
              <button
                onClick={handleFavorite}
                className={`p-3 rounded-lg transition ${
                  isFavorite
                    ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
                title="Add to favorites"
              >
                <FiHeart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition"
                title="Share"
              >
                <FiShare2 size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2"
                title="Download"
              >
                <FiDownload size={20} />
              </button>
            </div>
          </div>

          {/* Field of Study Badge */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-full text-sm font-medium">
              {thesis.fieldOfStudy}
            </span>
          </div>
        </div>

        {/* Keywords */}
        {thesis.keywords && thesis.keywords.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Keywords</h3>
            <div className="flex flex-wrap gap-3">
              {thesis.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-600/50 transition"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Abstract */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Abstract</h3>
          <p className="text-gray-300 leading-relaxed">{thesis.abstractSummary}</p>
        </div>

        {/* Research Method */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Research Method</h3>
          <p className="text-gray-300 bg-gray-700/30 p-4 rounded-lg">{thesis.method}</p>
        </div>

        {/* Recommended Methods */}
        {methodRecommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Recommended Research Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {methodRecommendations.map((method, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-700/30 border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition"
                >
                  <p className="text-gray-300">{method}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Thesis */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Thesis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((relatedItem) => (
              <Link
                key={relatedItem.id}
                href={`/thesis/${relatedItem.id}`}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-400 transition line-clamp-2">
                  {relatedItem.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{relatedItem.fieldOfStudy}</p>
                {relatedItem.similarity && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                        style={{ width: `${(relatedItem.similarity || 0) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {Math.round((relatedItem.similarity || 0) * 100)}%
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
