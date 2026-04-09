"use client";

import { useState } from "react";
import Link from "next/link";

const RECIPES = [
  {
    id: 1,
    name: "Aloo Sabzi",
    time: "20 min",
    difficulty: "Easy",
    ingredients: ["potato", "onion", "tomato", "turmeric", "cumin", "oil", "salt"],
    steps: ["Heat oil, add cumin seeds", "Add chopped onion, cook till golden", "Add tomato and spices", "Add boiled potato cubes", "Cook 10 min and serve"],
    emoji: "🥔",
  },
  {
    id: 2,
    name: "Dal Tadka",
    time: "30 min",
    difficulty: "Easy",
    ingredients: ["dal", "onion", "tomato", "garlic", "cumin", "turmeric", "oil", "salt"],
    steps: ["Boil dal with turmeric and salt", "Heat oil, add cumin and garlic", "Add onion and tomato, cook well", "Pour tadka over dal", "Simmer 5 min and serve"],
    emoji: "🫘",
  },
  {
    id: 3,
    name: "Egg Bhurji",
    time: "15 min",
    difficulty: "Easy",
    ingredients: ["egg", "onion", "tomato", "green chilli", "oil", "salt", "turmeric"],
    steps: ["Heat oil, sauté onion and chilli", "Add tomato and cook soft", "Beat eggs and pour in", "Scramble on medium heat", "Season and serve with roti"],
    emoji: "🍳",
  },
  {
    id: 4,
    name: "Jeera Rice",
    time: "20 min",
    difficulty: "Easy",
    ingredients: ["rice", "cumin", "oil", "salt", "water"],
    steps: ["Wash and soak rice 15 min", "Heat oil, splutter cumin seeds", "Add rice and fry 2 min", "Add water 1:2 ratio", "Cover and cook 15 min on low"],
    emoji: "🍚",
  },
  {
    id: 5,
    name: "Paneer Butter Masala",
    time: "35 min",
    difficulty: "Medium",
    ingredients: ["paneer", "tomato", "onion", "garlic", "butter", "cream", "cumin", "salt", "turmeric"],
    steps: ["Blend tomato and onion into puree", "Heat butter, add cumin and garlic", "Add puree and cook 10 min", "Add paneer cubes and cream", "Simmer 10 min and serve"],
    emoji: "🧀",
  },
  {
    id: 6,
    name: "Maggi Noodles",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["maggi", "water", "oil", "onion", "tomato"],
    steps: ["Boil 2 cups water", "Add maggi and tastemaker", "Add chopped veggies if you like", "Cook 2 min stirring constantly", "Serve hot"],
    emoji: "🍜",
  },
  {
    id: 7,
    name: "Masala Omelette",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["egg", "onion", "green chilli", "oil", "salt", "turmeric"],
    steps: ["Beat 2 eggs with salt and turmeric", "Add chopped onion and chilli", "Heat oil in pan on medium", "Pour egg mix, spread evenly", "Flip once and cook through"],
    emoji: "🍳",
  },
  {
    id: 8,
    name: "Tomato Rice",
    time: "25 min",
    difficulty: "Easy",
    ingredients: ["rice", "tomato", "onion", "garlic", "cumin", "turmeric", "oil", "salt"],
    steps: ["Cook rice separately", "Heat oil, add cumin and garlic", "Add onion till golden", "Add tomato and spices, cook 8 min", "Mix in cooked rice and serve"],
    emoji: "🍅",
  },
];

function matchRecipes(userIngredients: string[]) {
  const normalized = userIngredients.map((i) => i.trim().toLowerCase()).filter(Boolean);
  if (normalized.length === 0) return [];

  return RECIPES.map((recipe) => {
    const matched = recipe.ingredients.filter((ing) =>
      normalized.some((ui) => ing.includes(ui) || ui.includes(ing))
    );
    const score = Math.round((matched.length / recipe.ingredients.length) * 100);
    return { ...recipe, score, matchedCount: matched.length };
  })
    .filter((r) => r.score >= 30)
    .sort((a, b) => b.score - a.score);
}

export default function Home() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<ReturnType<typeof matchRecipes>>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof RECIPES)[0] | null>(null);
  const [searched, setSearched] = useState(false);

  function addIngredient() {
    const val = input.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients((prev) => [...prev, val]);
    }
    setInput("");
  }

  function removeIngredient(ing: string) {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  }

  function handleSearch() {
    setResults(matchRecipes(ingredients));
    setSearched(true);
    setSelectedRecipe(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") addIngredient();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🍽 What To Cook</h1>
            <p className="text-sm text-gray-500 mt-0.5">Add ingredients you have → get recipe ideas</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/explore" className="text-gray-500 hover:text-orange-500 transition">Explore</Link>
            <Link href="/profile" className="text-gray-500 hover:text-orange-500 transition">Profile</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Input Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What ingredients do you have?
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. potato, onion, tomato..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={addIngredient}
              className="bg-orange-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              Add
            </button>
          </div>

          {/* Ingredient Tags */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {ing}
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="ml-1 text-orange-400 hover:text-orange-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Quick add suggestions */}
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-1.5">Quick add:</p>
            <div className="flex flex-wrap gap-1.5">
              {["onion", "tomato", "potato", "egg", "rice", "dal", "paneer", "garlic"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (!ingredients.includes(s)) setIngredients((p) => [...p, s]);
                  }}
                  className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 transition"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={ingredients.length === 0}
            className="mt-4 w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Find Recipes ({ingredients.length} ingredient{ingredients.length !== 1 ? "s" : ""})
          </button>
        </div>

        {/* Results */}
        {searched && results.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🤔</div>
            <p className="font-medium text-gray-600">No matches found</p>
            <p className="text-sm mt-1">Try adding more ingredients like onion, tomato, or dal</p>
          </div>
        )}

        {results.length > 0 && !selectedRecipe && (
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Found <span className="font-medium text-gray-800">{results.length} recipes</span> you can make
            </p>
            <div className="space-y-3">
              {results.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left hover:border-orange-300 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between">
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
                      <span
                        className={`text-sm font-bold ${
                          recipe.score >= 80
                            ? "text-green-600"
                            : recipe.score >= 50
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      >
                        {recipe.score}%
                      </span>
                      <p className="text-xs text-gray-400">match</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          recipe.score >= 80 ? "bg-green-500" : recipe.score >= 50 ? "bg-orange-400" : "bg-gray-300"
                        }`}
                        style={{ width: `${recipe.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      You have {recipe.matchedCount} of {recipe.ingredients.length} ingredients
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Detail */}
        {selectedRecipe && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="text-sm text-orange-500 hover:text-orange-700 mb-4 flex items-center gap-1"
            >
              ← Back to results
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedRecipe.emoji}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedRecipe.name}</h2>
                <p className="text-sm text-gray-400">{selectedRecipe.time} · {selectedRecipe.difficulty}</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-4">
              <p className="text-sm font-medium text-orange-700 mb-1">Ingredients needed</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecipe.ingredients.map((ing) => (
                  <span key={ing} className="text-xs bg-white border border-orange-200 text-orange-600 px-2 py-0.5 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Steps</p>
              <ol className="space-y-2">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          <Link href="/" className="flex flex-col items-center gap-0.5 text-orange-500 py-1">
            <span className="text-lg">🔍</span>
            <span className="text-xs font-medium">Search</span>
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