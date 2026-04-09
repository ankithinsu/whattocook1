"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Rahul Sharma");
  const [email] = useState("rahul@example.com");
  const [dietPreference, setDietPreference] = useState("vegetarian");
  const [spiceLevel, setSpiceLevel] = useState("medium");
  const [notifications, setNotifications] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            🍽 What To Cook
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-orange-500">3</p>
              <p className="text-xs text-gray-500">Favourites</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-orange-500">7</p>
              <p className="text-xs text-gray-500">Meals Planned</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-orange-500">12</p>
              <p className="text-xs text-gray-500">Recipes Tried</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 mb-4">
            Settings saved successfully!
          </div>
        )}

        {/* Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Settings</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
              >
                Save
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ) : (
                <p className="text-sm text-gray-600 py-2.5">{name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-sm text-gray-600 py-2.5">{email}</p>
            </div>

            {/* Diet Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diet Preference</label>
              {editing ? (
                <select
                  value={dietPreference}
                  onChange={(e) => setDietPreference(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="eggetarian">Eggetarian</option>
                </select>
              ) : (
                <p className="text-sm text-gray-600 py-2.5 capitalize">{dietPreference}</p>
              )}
            </div>

            {/* Spice Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spice Level</label>
              {editing ? (
                <div className="flex gap-2">
                  {["mild", "medium", "spicy", "extra spicy"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize transition ${
                        spiceLevel === level
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 py-2.5 capitalize">{spiceLevel}</p>
              )}
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notifications</label>
                <p className="text-xs text-gray-400">Get daily recipe suggestions</p>
              </div>
              <button
                onClick={() => { if (editing) setNotifications(!notifications); }}
                className={`w-11 h-6 rounded-full transition flex items-center px-0.5 ${
                  notifications ? "bg-orange-500" : "bg-gray-300"
                } ${!editing ? "opacity-60 cursor-default" : "cursor-pointer"}`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
          <Link href="/favourites" className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span>❤️</span>
              <span className="text-sm text-gray-700">My Favourites</span>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
          <Link href="/meal-planner" className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span>📅</span>
              <span className="text-sm text-gray-700">Meal Planner</span>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
          <Link href="/shopping-list" className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span>🛒</span>
              <span className="text-sm text-gray-700">Shopping List</span>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
        </div>

        {/* Logout (mobile-friendly) */}
        <button
          onClick={handleLogout}
          className="mt-5 w-full border border-red-200 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition"
        >
          Log Out
        </button>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          <Link href="/" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">🔍</span>
            <span className="text-xs">Search</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">🧭</span>
            <span className="text-xs">Explore</span>
          </Link>
          <Link href="/meal-planner" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">📅</span>
            <span className="text-xs">Planner</span>
          </Link>
          <Link href="/favourites" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">❤️</span>
            <span className="text-xs">Favourites</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-0.5 text-orange-500 py-1">
            <span className="text-lg">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
