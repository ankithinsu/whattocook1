"use client";

import { useState } from "react";
import Link from "next/link";

interface FavouriteRecipe {
  id: number;
  name: string;
  emoji: string;
  time: string;
  difficulty: string;
  rating: number;
  addedOn: string;
}

const SAMPLE_FAVOURITES: FavouriteRecipe[] = [
  { id: 1, name: "Aloo Sabzi", emoji: "🥔", time: "20 min", difficulty: "Easy", rating: 4.5, addedOn: "2 days ago" },
  { id: 2, name: "Dal Tadka", emoji: "🫘", time: "30 min", difficulty: "Easy", rating: 4.7, addedOn: "5 days ago" },
  { id: 5, name: "Paneer Butter Masala", emoji: "🧀", time: "35 min", difficulty: "Medium", rating: 4.8, addedOn: "1 week ago" },
];

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<FavouriteRecipe[]>(SAMPLE_FAVOURITES);
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");

  function removeFavourite(id: number) {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
  }

  const sorted = [...favourites].sort((a, b) =>
    sortBy === "rating" ? b.rating - a.rating : 0
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            🍽 What To Cook
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/explore" className="text-gray-500 hover:text-orange-500 transition">Explore</Link>
            <Link href="/profile" className="text-gray-500 hover:text-orange-500 transition">Profile</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">❤️ Favourites</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {favourites.length} saved recipe{favourites.length !== 1 ? "s" : ""}
            </p>
          </div>
          {favourites.length > 1 && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "rating")}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="recent">Recently added</option>
              <option value="rating">Highest rated</option>
            </select>
          )}
        </div>

        {/* Favourites List */}
        {sorted.length > 0 ? (
          <div className="space-y-3">
            {sorted.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-orange-300 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <Link href={`/recipe/${recipe.id}`} className="flex items-center gap-3 flex-1">
                    <span className="text-3xl">{recipe.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{recipe.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {recipe.time} · {recipe.difficulty} · ⭐ {recipe.rating}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{recipe.addedOn}</span>
                    <button
                      onClick={() => removeFavourite(recipe.id)}
                      className="text-red-400 hover:text-red-600 transition text-lg"
                      title="Remove from favourites"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🤍</div>
            <p className="font-medium text-gray-600">No favourites yet</p>
            <p className="text-sm mt-1">Save recipes you love to find them easily later</p>
            <Link
              href="/explore"
              className="inline-block mt-4 bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              Explore Recipes
            </Link>
          </div>
        )}
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
          <Link href="/favourites" className="flex flex-col items-center gap-0.5 text-orange-500 py-1">
            <span className="text-lg">❤️</span>
            <span className="text-xs font-medium">Favourites</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
