"use client";

import { motion } from "framer-motion";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import { FiArrowLeft, FiUserCheck } from "react-icons/fi";

export default function RegisterPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/"
          className="m-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition duration-300 group"
        >
          <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Kembali ke Home
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 flex items-center justify-center px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <span className="text-5xl">🎓</span>
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 mt-4">
              Thesis Finder
            </h1>
            <p className="text-gray-400 text-lg">Buat akun baru Anda</p>
          </motion.div>

          {/* Card with Glow Effect */}
          <motion.div
            variants={itemVariants}
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition" />

            {/* Card */}
            <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
              {/* Check Icon */}
              <div className="absolute -top-6 right-8 bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-lg">
                <FiUserCheck size={24} className="text-white" />
              </div>

              <RegisterForm />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-500 text-xs mt-8"
          >
            © 2026 Thesis Finder. Semua hak dilindungi.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
