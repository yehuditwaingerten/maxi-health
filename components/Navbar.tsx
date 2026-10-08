"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useLanguageStore } from "@/store/languageStore";
import { useT } from "@/hooks/useT";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const { lang, toggleLang } = useLanguageStore();
  const t = useT();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-emerald-600 tracking-tight">
          Maxi Health
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/products" className="hover:text-emerald-600 transition-colors">
            {t.nav.products}
          </Link>
          <Link href="/about" className="hover:text-emerald-600 transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/contact" className="hover:text-emerald-600 transition-colors">
            {t.nav.contact}
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {t.nav.cart}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-emerald-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={toggleLang}
            className="text-xs font-bold border border-gray-300 rounded-full px-3 py-1 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            aria-label="Toggle language"
          >
            {lang === "he" ? "EN" : "עב"}
          </button>
        </div>
      </div>
    </nav>
  );
}
