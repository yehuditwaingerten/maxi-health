"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6 text-sm">Add some products and come back!</p>
        <Link
          href="/products"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your cart</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2 mb-6">
        {items.map((item) => (
          <CartItem key={item.productId} {...item} />
        ))}
      </div>

      <div className="flex items-center justify-between text-lg font-bold text-gray-900 mb-6 px-1">
        <span>Total</span>
        <span>₪{totalPrice.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Proceed to checkout
      </Link>
      <Link
        href="/products"
        className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition-colors"
      >
        ← Continue shopping
      </Link>
    </div>
  );
}
