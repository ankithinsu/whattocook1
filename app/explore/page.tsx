"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Breakfast", emoji: "🍳", count: 12 },
  { name: "Lunch", emoji: "🍛", count: 18 },
  { name: "Dinner", emoji: "🍽", count: 15 },
  { name: "Snacks", emoji: "🥪", count: 8 },
  { name: "Desserts", emoji: "🍮", count: 6 },
  { name: "Drinks", emoji: "🥤", count: 5 },
];

const TRENDING_RECIPES = [
  { id: 1, name: "Butter Chicken", emoji: "🍗", time: "40 min", difficulty: "Medium", rating: 4.8, category: "Dinner" },
  { id: 2, name: "Masala Dosa", emoji: "🥞", time: "30 min", difficulty: "Medium", rating: 4.7, category: "Breakfast" },
  { id: 3, name: "Chole Bhature", emoji: "🫘", time: "45 min", difficulty: "Medium", rating: 4.6, category: "Lunch" },
  { id: 4, name: "Pav Bhaji", emoji: "🍞", time: "35 min", difficulty: "Easy", rating: 4.5, category: "Dinner" },
  { id: 5, name: "Gulab Jamun", emoji: "🍩", time: "50 min", difficulty: "Hard", rating: 4.9, category: "Desserts" },
  { id: 6, name: "Mango Lassi", emoji: "🥭", time: "5 min", difficulty: "Easy", rating: 4.4, category: "Drinks" },
  { id: 7, name: "Vada Pav", emoji: "🍔", time: "25 min", difficulty: "Easy", rating: 4.3, category: "Snacks" },
  { id: 8, name: "Biryani", emoji: "🍚", time: "60 min", difficulty: "Hard", rating: 4.9, category: "Lunch" },
  { id: 9, name: "Poha", emoji: "🍲", time: "15 min", difficulty: "Easy", rating: 4.2, category: "Breakfast" },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = TRENDING_RECIPES.filter((recipe) => {
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    const matchesSearch = !searchQuery || recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            🍽 What To Cook
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/favourites" className="text-gray-500 hover:text-orange-500 transition">Favourites</Link>
            <Link href="/profile" className="text-gray-500 hover:text-orange-500 transition">Profile</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition ${
                  selectedCategory === cat.name
                    ? "border-orange-300 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
                }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.count} recipes</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700">
              {selectedCategory ? selectedCategory : "Trending"} Recipes
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-orange-500 hover:text-orange-600"
              >
                Clear filter
              </button>
            )}
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium text-gray-600">No recipes found</p>
              <p className="text-sm mt-1">Try a different category or search term</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipe/${recipe.id}`}
                  className="block bg-white border border-gray-200 rounded-2xl p-4 hover:border-orange-300 hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{recipe.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{recipe.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {recipe.time} · {recipe.difficulty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-orange-500">⭐ {recipe.rating}</span>
                      <p className="text-xs text-gray-400">{recipe.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          <Link href="/" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">🔍</span>
            <span className="text-xs">Search</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center gap-0.5 text-orange-500 py-1">
            <span className="text-lg">🧭</span>
            <span className="text-xs font-medium">Explore</span>
          </Link>
          <Link href="/meal-planner" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">📅</span>
            <span className="text-xs">Planner</span>
          </Link>
          <Link href="/favourites" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">❤️</span>
            <span className="text-xs">Favourites</span>
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
