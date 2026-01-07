"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { authAPI } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      toast.success("Logout berhasil 👋");
      router.push("/");
    } catch (error) {
      toast.error("Logout gagal");
      console.error("Logout error:", error);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo with Animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Thesis Finder</h1>
              <p className="text-xs text-gray-500 -mt-1">AI-Powered</p>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          {user ? (
            <>
              {/* User is logged in */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-full transition duration-300 flex items-center gap-2 font-semibold ${
                    isActive("/dashboard")
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <FiUser size={18} />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
              </motion.div>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 transition duration-300 flex items-center gap-2 font-semibold"
              >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </>
          ) : (
            <>
              {/* User is not logged in */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300 text-gray-700 hover:text-gray-900 font-semibold"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition duration-300 text-white font-semibold"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
