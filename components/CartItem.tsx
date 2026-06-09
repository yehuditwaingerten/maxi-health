"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

type Props = {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export default function CartItem({ productId, name, imageUrl, price, quantity }: Props) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-50">
        <Image src={imageUrl} alt={name} fill className="object-contain p-1" sizes="64px" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-sm text-gray-500 mt-0.5">₪{price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => updateQuantity(productId, quantity - 1)}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
        <button
          onClick={() => updateQuantity(productId, quantity + 1)}
          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="text-sm font-bold text-gray-900 w-16 text-right shrink-0">
        ₪{(price * quantity).toFixed(2)}
      </div>

      <button
        onClick={() => removeItem(productId)}
        className="text-gray-300 hover:text-red-400 transition-colors ml-1 shrink-0"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
