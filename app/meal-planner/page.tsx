"use client";

import { useState } from "react";
import Link from "next/link";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"] as const;

type MealPlan = Record<string, Record<string, string>>;

export default function MealPlannerPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [editingSlot, setEditingSlot] = useState<{ day: string; meal: string } | null>(null);
  const [mealInput, setMealInput] = useState("");

  function setMeal(day: string, meal: string, value: string) {
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value },
    }));
    setEditingSlot(null);
    setMealInput("");
  }

  function removeMeal(day: string, meal: string) {
    setMealPlan((prev) => {
      const updated = { ...prev };
      if (updated[day]) {
        const dayMeals = { ...updated[day] };
        delete dayMeals[meal];
        updated[day] = dayMeals;
      }
      return updated;
    });
  }

  const totalMeals = Object.values(mealPlan).reduce(
    (acc, day) => acc + Object.values(day).filter(Boolean).length,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            🍽 What To Cook
          </Link>
          <Link
            href="/shopping-list"
            className="text-sm text-orange-500 font-medium hover:text-orange-600 transition"
          >
            🛒 Shopping List
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Meal Planner</h1>
            <p className="text-sm text-gray-500 mt-0.5">Plan your meals for the week</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
            <p className="text-sm font-medium text-orange-700">{totalMeals} meals planned</p>
          </div>
        </div>

        {/* Weekly Plan */}
        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day} className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{day}</h3>
              <div className="space-y-2">
                {MEAL_TYPES.map((meal) => {
                  const value = mealPlan[day]?.[meal];
                  const isEditing = editingSlot?.day === day && editingSlot?.meal === meal;

                  return (
                    <div key={meal} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-400 w-16">{meal}</span>

                      {isEditing ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={mealInput}
                            onChange={(e) => setMealInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && mealInput.trim()) setMeal(day, meal, mealInput.trim());
                              if (e.key === "Escape") { setEditingSlot(null); setMealInput(""); }
                            }}
                            placeholder="e.g. Dal Tadka"
                            autoFocus
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <button
                            onClick={() => { if (mealInput.trim()) setMeal(day, meal, mealInput.trim()); }}
                            className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition"
                          >
                            Save
                          </button>
                        </div>
                      ) : value ? (
                        <div className="flex-1 flex items-center justify-between bg-orange-50 border border-orange-100 rounded-lg px-3 py-1.5">
                          <span className="text-sm text-gray-800">{value}</span>
                          <button
                            onClick={() => removeMeal(day, meal)}
                            className="text-orange-400 hover:text-red-500 text-sm font-bold ml-2"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingSlot({ day, meal }); setMealInput(""); }}
                          className="flex-1 border border-dashed border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-400 hover:border-orange-300 hover:text-orange-500 transition text-left"
                        >
                          + Add {meal.toLowerCase()}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Generate Shopping List */}
        {totalMeals > 0 && (
          <Link
            href="/shopping-list"
            className="block mt-5 w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition text-center"
          >
            Generate Shopping List →
          </Link>
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
          <Link href="/meal-planner" className="flex flex-col items-center gap-0.5 text-orange-500 py-1">
            <span className="text-lg">📅</span>
            <span className="text-xs font-medium">Planner</span>
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
