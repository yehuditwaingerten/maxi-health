"use client";

import Image from "next/image";
import AddToCartButton from "@/app/products/[slug]/AddToCartButton";
import { useT } from "@/hooks/useT";
import { categoryNames } from "@/lib/translations";
import { useLanguageStore } from "@/store/languageStore";

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  descriptionHe: string | null;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
};

export default function ProductContent({ product }: { product: Product }) {
  const t = useT();
  const lang = useLanguageStore((s) => s.lang);
  const catLabel = categoryNames[product.category]?.[lang] ?? product.category;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden md:flex">
        <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0 bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 288px"
            priority
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            {catLabel}
          </span>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {lang === "he" && product.descriptionHe ? product.descriptionHe : product.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-2xl font-extrabold text-gray-900">
                ₪{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 block mt-0.5">{t.product.each}</span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
