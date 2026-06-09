"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

type Props = {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductCard({ id, name, slug, price, imageUrl, category }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/products/${slug}`} className="block overflow-hidden rounded-t-2xl">
        <div className="relative aspect-square w-full bg-gray-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
          {category}
        </span>
        <Link href={`/products/${slug}`} className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition-colors line-clamp-2">
          {name}
        </Link>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-bold text-gray-900">
            ₪{price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem({ productId: id, name, imageUrl, price })}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
