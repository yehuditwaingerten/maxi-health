"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { useT } from "@/hooks/useT";
import { categoryNames } from "@/lib/translations";
import { useLanguageStore } from "@/store/languageStore";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew: boolean;
};

type SortOption = "az" | "za" | "price-asc" | "price-desc";

export default function ProductsContent({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const t = useT();
  const lang = useLanguageStore((s) => s.lang);
  const catLabel = (cat: string) => categoryNames[cat]?.[lang] ?? cat;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("az");

  const filtered = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    return [...result].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [products, search, activeCategory, sort]);

  const visibleCategories = activeCategory
    ? [activeCategory]
    : categories.filter((cat) => filtered.some((p) => p.category === cat));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.products.title}</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.products.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="az">{t.products.sortAZ}</option>
          <option value="za">{t.products.sortZA}</option>
          <option value="price-asc">{t.products.sortPriceAsc}</option>
          <option value="price-desc">{t.products.sortPriceDesc}</option>
        </select>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t.products.allCategories}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-emerald-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {catLabel(cat)}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-8">{t.products.count(filtered.length)}</p>

      {/* Products */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{t.products.noResults}</p>
      ) : visibleCategories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-base font-semibold text-emerald-600 uppercase tracking-wide mb-4">
            {catLabel(cat)}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered
              .filter((p) => p.category === cat)
              .map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  category={p.category}
                  isNew={p.isNew}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
