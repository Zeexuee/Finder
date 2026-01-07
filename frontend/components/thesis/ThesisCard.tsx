"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

interface ThesisCardProps {
  id: string;
  title: string;
  fieldOfStudy: string;
  keywords: string[];
  abstractSummary: string;
}

export default function ThesisCard({
  id,
  title,
  fieldOfStudy,
  keywords,
  abstractSummary,
}: ThesisCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/thesis/${id}`}>
        <div className="group h-full bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-md border border-gray-700/50 hover:border-purple-500/50 rounded-2xl p-6 transition duration-300 cursor-pointer relative overflow-hidden">
          {/* Glow on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30 group-hover:border-purple-400/50 transition">
                {fieldOfStudy}
              </span>
            </motion.div>

            {/* Icon */}
            <motion.div
              animate={{ rotate: 5 }}
              whileHover={{ rotate: 0 }}
              className="mb-3"
            >
              <FiBookOpen className="text-2xl text-purple-400 group-hover:text-pink-400 transition" />
            </motion.div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-3 text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition duration-300 line-clamp-2">
              {title}
            </h3>

            {/* Abstract */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition">
              {abstractSummary}
            </p>

            {/* Keywords */}
            {keywords && keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {keywords.slice(0, 2).map((keyword, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-1 bg-gray-700/40 text-gray-300 rounded text-xs border border-gray-600/30 group-hover:border-purple-500/30 group-hover:bg-gray-700/60 transition"
                  >
                    {keyword}
                  </motion.span>
                ))}
                {keywords.length > 2 && (
                  <span className="px-2 py-1 text-gray-400 text-xs">+{keywords.length - 2}</span>
                )}
              </div>
            )}

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition duration-300"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <span className="text-sm font-bold">View Details</span>
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <FiArrowRight size={16} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
