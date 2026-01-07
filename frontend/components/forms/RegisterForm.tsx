"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { FiMail, FiLock, FiUser, FiLoader } from "react-icons/fi";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Password tidak cocok");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.data.user) {
        setUser(response.data.user);
        toast.success("Registrasi berhasil! Selamat datang 🎉");
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Registrasi gagal. Coba lagi.";
      toast.error(errorMessage);
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      initial="hidden"
      animate="visible"
    >
      {/* Name Field */}
      <motion.div
        custom={0}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
      >
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
          👤 Nama Lengkap
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
          <div className="relative flex items-center">
            <FiUser className="absolute left-4 text-purple-400 group-hover:text-purple-300 transition" size={20} />
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Nama wajib diisi",
                minLength: {
                  value: 3,
                  message: "Nama minimal 3 karakter",
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/40 border-2 rounded-xl outline-none transition duration-300 text-white placeholder-gray-500 ${
                errors.name
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-gray-600/50 focus:border-purple-500 focus:bg-gray-700/60"
              }`}
              placeholder="John Doe"
            />
          </div>
        </div>
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
          >
            ⚠️ {errors.name.message}
          </motion.p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div
        custom={1}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
      >
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
          📧 Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
          <div className="relative flex items-center">
            <FiMail className="absolute left-4 text-purple-400 group-hover:text-purple-300 transition" size={20} />
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid",
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/40 border-2 rounded-xl outline-none transition duration-300 text-white placeholder-gray-500 ${
                errors.email
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-gray-600/50 focus:border-purple-500 focus:bg-gray-700/60"
              }`}
              placeholder="anda@example.com"
            />
          </div>
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
          >
            ⚠️ {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div
        custom={2}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
      >
        <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-3">
          🔒 Password
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
          <div className="relative flex items-center">
            <FiLock className="absolute left-4 text-purple-400 group-hover:text-purple-300 transition" size={20} />
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/40 border-2 rounded-xl outline-none transition duration-300 text-white placeholder-gray-500 ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-gray-600/50 focus:border-purple-500 focus:bg-gray-700/60"
              }`}
              placeholder="••••••••"
            />
          </div>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
          >
            ⚠️ {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div
        custom={3}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
      >
        <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-gray-300 mb-3">
          🔐 Konfirmasi Password
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
          <div className="relative flex items-center">
            <FiLock className="absolute left-4 text-purple-400 group-hover:text-purple-300 transition" size={20} />
            <input
              id="passwordConfirm"
              type="password"
              {...register("passwordConfirm", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) => value === password || "Password tidak cocok",
              })}
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/40 border-2 rounded-xl outline-none transition duration-300 text-white placeholder-gray-500 ${
                errors.passwordConfirm
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-gray-600/50 focus:border-purple-500 focus:bg-gray-700/60"
              }`}
              placeholder="••••••••"
            />
          </div>
        </div>
        {errors.passwordConfirm && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
          >
            ⚠️ {errors.passwordConfirm.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        custom={4}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
      >
        {isLoading && <FiLoader className="animate-spin" size={20} />}
        {isLoading ? "Sedang Daftar..." : "✨ Daftar"}
      </motion.button>

      {/* Login Link */}
      <motion.p
        custom={5}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
          }),
        }}
        className="text-center text-gray-400 text-sm"
      >
        Sudah punya akun?{" "}
        <Link
          href="/auth/login"
          className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold hover:opacity-80 transition"
        >
          Login di sini
        </Link>
      </motion.p>
    </motion.form>
  );
}
