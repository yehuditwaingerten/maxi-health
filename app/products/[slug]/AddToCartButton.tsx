"use client";

import { useCartStore } from "@/store/cartStore";
import { useT } from "@/hooks/useT";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const t = useT();

  return (
    <button
      onClick={() =>
        addItem({
          productId: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
        })
      }
      className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
    >
      {t.product.addToCart}
    </button>
  );
}
