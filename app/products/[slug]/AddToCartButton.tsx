"use client";

import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

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
      Add to cart
    </button>
  );
}
