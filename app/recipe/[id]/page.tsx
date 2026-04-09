"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const RECIPES: Record<string, {
  name: string;
  emoji: string;
  time: string;
  difficulty: string;
  servings: number;
  rating: number;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tips: string;
  category: string;
}> = {
  "1": {
    name: "Aloo Sabzi",
    emoji: "🥔",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    rating: 4.5,
    description: "A simple, everyday potato curry that goes perfectly with roti or rice. Quick to make with basic pantry ingredients.",
    ingredients: [
      { name: "Potato", amount: "3 medium, boiled & cubed" },
      { name: "Onion", amount: "1 medium, chopped" },
      { name: "Tomato", amount: "1 medium, chopped" },
      { name: "Turmeric", amount: "1/2 tsp" },
      { name: "Cumin Seeds", amount: "1 tsp" },
      { name: "Oil", amount: "2 tbsp" },
      { name: "Salt", amount: "to taste" },
    ],
    steps: [
      "Heat oil in a pan, add cumin seeds and let them splutter.",
      "Add chopped onion and cook until golden brown, about 3-4 minutes.",
      "Add chopped tomato, turmeric, and salt. Cook until tomatoes are soft.",
      "Add boiled and cubed potatoes. Mix well with the masala.",
      "Cook on medium heat for 8-10 minutes, stirring occasionally.",
      "Garnish with fresh coriander and serve hot with roti or rice.",
    ],
    tips: "For extra flavour, add a pinch of amchur (dry mango powder) at the end.",
    category: "Main Course",
  },
  "2": {
    name: "Dal Tadka",
    emoji: "🫘",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    rating: 4.7,
    description: "Comforting yellow dal tempered with aromatic spices. A staple in every Indian household.",
    ingredients: [
      { name: "Toor Dal", amount: "1 cup" },
      { name: "Onion", amount: "1 medium, chopped" },
      { name: "Tomato", amount: "1 medium, chopped" },
      { name: "Garlic", amount: "4 cloves, minced" },
      { name: "Cumin Seeds", amount: "1 tsp" },
      { name: "Turmeric", amount: "1/2 tsp" },
      { name: "Oil/Ghee", amount: "2 tbsp" },
      { name: "Salt", amount: "to taste" },
    ],
    steps: [
      "Wash and pressure cook dal with turmeric and salt for 3-4 whistles.",
      "Heat oil or ghee in a pan, add cumin seeds.",
      "Add minced garlic and sauté until golden.",
      "Add onion and cook until translucent.",
      "Add tomato and cook until soft and mushy.",
      "Pour this tadka over the cooked dal and simmer for 5 minutes.",
      "Serve hot with steamed rice or roti.",
    ],
    tips: "Add a squeeze of lemon juice before serving for a tangy kick.",
    category: "Main Course",
  },
};

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const recipe = RECIPES[id];
  const [isFavourite, setIsFavourite] = useState(false);
  const [servings, setServings] = useState(recipe?.servings ?? 2);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="text-2xl font-bold text-gray-900">🍽 What To Cook</Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="text-4xl mb-3">🍽</div>
          <p className="font-medium text-gray-600">Recipe not found</p>
          <p className="text-sm text-gray-400 mt-1">This recipe may have been removed or doesn't exist yet.</p>
          <Link href="/explore" className="inline-block mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium">
            ← Browse all recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">🍽 What To Cook</Link>
          <button
            onClick={() => setIsFavourite(!isFavourite)}
            className={`text-2xl transition ${isFavourite ? "scale-110" : ""}`}
          >
            {isFavourite ? "❤️" : "🤍"}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Back link */}
        <Link href="/explore" className="text-sm text-orange-500 hover:text-orange-700 mb-4 flex items-center gap-1">
          ← Back to recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mt-3 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">{recipe.emoji}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{recipe.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{recipe.time}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{recipe.difficulty}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{recipe.category}</span>
                <span className="text-xs font-medium text-orange-500">⭐ {recipe.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">{recipe.description}</p>
        </div>

        {/* Servings Adjuster */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Servings</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 transition flex items-center justify-center"
            >
              -
            </button>
            <span className="text-lg font-bold text-gray-900 w-6 text-center">{servings}</span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 transition flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4">
          <h2 className="text-sm font-medium text-orange-700 mb-3">Ingredients</h2>
          <div className="space-y-2">
            {recipe.ingredients.map((ing) => (
              <div key={ing.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-800">{ing.name}</span>
                <span className="text-gray-500">{ing.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Steps</h2>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        {recipe.tips && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
            <h2 className="text-sm font-medium text-yellow-700 mb-1">💡 Tip</h2>
            <p className="text-sm text-yellow-800">{recipe.tips}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsFavourite(!isFavourite)}
            className={`flex-1 py-3 rounded-xl font-medium transition text-center border ${
              isFavourite
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
            }`}
          >
            {isFavourite ? "❤️ Saved" : "🤍 Save to Favourites"}
          </button>
          <Link
            href="/meal-planner"
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition text-center"
          >
            📅 Add to Plan
          </Link>
        </div>
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
          <Link href="/profile" className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-orange-500 transition py-1">
            <span className="text-lg">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
