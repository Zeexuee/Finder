"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { authAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { FiLoader, FiEdit2, FiLogOut, FiHeart, FiClock } from "react-icons/fi";
import Link from "next/link";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function DashboardComponent() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch current user
        if (!user) {
          const response = await authAPI.getMe();
          if (response.data) {
            setUserData(response.data);
            setUser(response.data);
          }
        } else {
          setUserData(user as any);
        }

        // Load favorites from localStorage (placeholder for backend integration)
        const savedFavorites = localStorage.getItem("thesis_favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        // Load search history from localStorage (placeholder for backend integration)
        const savedHistory = localStorage.getItem("thesis_history");
        if (savedHistory) {
          setSearchHistory(JSON.parse(savedHistory).slice(-10)); // Last 10
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Not authenticated
          router.push("/auth/login");
        } else {
          console.error("Error fetching user data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, setUser, router]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      toast.success("Logout berhasil");
      router.push("/");
    } catch (error) {
      toast.error("Logout gagal");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FiLoader className="animate-spin mx-auto mb-4" size={40} />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user && !userData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Anda harus login untuk mengakses dashboard</p>
        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
          Login sekarang
        </Link>
      </div>
    );
  }

  const displayUser = userData || user;

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {displayUser?.name}! 👋</h1>
            <p className="text-gray-400">{displayUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition flex items-center gap-2"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Role</p>
            <p className="font-semibold capitalize">{displayUser?.role || "User"}</p>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Member Since</p>
            <p className="font-semibold">Recently</p>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-1">Account Status</p>
            <p className="font-semibold text-green-400">Active</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="mt-6 flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
          <FiEdit2 size={18} />
          Edit Profile
        </button>
      </div>

      {/* Search History Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <FiClock size={24} />
          <h2 className="text-2xl font-bold">Recent Searches</h2>
        </div>

        {searchHistory.length > 0 ? (
          <div className="space-y-3">
            {searchHistory.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg hover:bg-gray-700/40 transition"
              >
                <div>
                  <p className="font-semibold">{item.query}</p>
                  <p className="text-sm text-gray-400">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "Recently"}
                  </p>
                </div>
                <Link
                  href="/"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  Search Again →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 py-8 text-center">No search history yet</p>
        )}
      </div>

      {/* Favorites Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <FiHeart size={24} />
          <h2 className="text-2xl font-bold">Favorite Thesis</h2>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((thesis) => (
              <Link
                key={thesis.id}
                href={`/thesis/${thesis.id}`}
                className="group bg-gray-700/30 hover:bg-gray-700/50 rounded-lg p-4 transition border border-gray-600/50 hover:border-purple-500/50"
              >
                <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition line-clamp-2">
                  {thesis.title}
                </h3>
                <p className="text-sm text-gray-400">{thesis.fieldOfStudy}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No favorite thesis yet</p>
            <Link href="/" className="text-purple-400 hover:text-purple-300">
              Start exploring thesis →
            </Link>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/30 rounded-xl p-6">
          <div className="text-4xl font-bold mb-2">{searchHistory.length}</div>
          <p className="text-gray-400">Total Searches</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600/20 to-transparent border border-pink-500/30 rounded-xl p-6">
          <div className="text-4xl font-bold mb-2">{favorites.length}</div>
          <p className="text-gray-400">Saved Thesis</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/30 rounded-xl p-6">
          <div className="text-4xl font-bold mb-2">∞</div>
          <p className="text-gray-400">Downloads Available</p>
        </div>
      </div>
    </div>
  );
}
