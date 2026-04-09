"use client";

import { useState } from "react";
import Link from "next/link";

interface ShoppingItem {
  id: number;
  name: string;
  category: string;
  checked: boolean;
}

const INITIAL_ITEMS: ShoppingItem[] = [
  { id: 1, name: "Onion (1 kg)", category: "Vegetables", checked: false },
  { id: 2, name: "Tomato (500 g)", category: "Vegetables", checked: false },
  { id: 3, name: "Potato (1 kg)", category: "Vegetables", checked: false },
  { id: 4, name: "Green Chilli (100 g)", category: "Vegetables", checked: false },
  { id: 5, name: "Rice (1 kg)", category: "Grains & Pulses", checked: false },
  { id: 6, name: "Dal - Toor (500 g)", category: "Grains & Pulses", checked: false },
  { id: 7, name: "Cumin Seeds", category: "Spices", checked: false },
  { id: 8, name: "Turmeric Powder", category: "Spices", checked: false },
  { id: 9, name: "Oil (1 L)", category: "Other", checked: false },
  { id: 10, name: "Paneer (200 g)", category: "Dairy", checked: false },
];

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>(INITIAL_ITEMS);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  function toggleItem(id: number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }

  function addItem() {
    if (!newItem.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: newItem.trim(), category: newCategory, checked: false },
    ]);
    setNewItem("");
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearChecked() {
    setItems((prev) => prev.filter((item) => !item.checked));
  }

  const categories = [...new Set(items.map((item) => item.category))];
  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            🍽 What To Cook
          </Link>
          <Link
            href="/meal-planner"
            className="text-sm text-orange-500 font-medium hover:text-orange-600 transition"
          >
            ← Meal Planner
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">🛒 Shopping List</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {checkedCount} of {items.length} items done
            </p>
          </div>
          {checkedCount > 0 && (
            <button
              onClick={clearChecked}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Clear done ({checkedCount})
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div
            className="h-2 rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${items.length > 0 ? (checkedCount / items.length) * 100 : 0}%` }}
          />
        </div>

        {/* Add Item */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addItem(); }}
              placeholder="Add an item..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>Vegetables</option>
              <option>Grains & Pulses</option>
              <option>Spices</option>
              <option>Dairy</option>
              <option>Other</option>
            </select>
            <button
              onClick={addItem}
              className="bg-orange-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Items by Category */}
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="mb-4">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                {category}
              </h3>
              <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                        item.checked
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {item.checked && (
                        <span className="text-xs">✓</span>
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm ${
                        item.checked ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🛒</div>
            <p className="font-medium text-gray-600">Your shopping list is empty</p>
            <p className="text-sm mt-1">Add items or generate from your meal plan</p>
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
