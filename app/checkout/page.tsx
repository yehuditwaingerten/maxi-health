"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Nothing to checkout — your cart is empty.</p>
        <Link href="/products" className="text-emerald-600 font-semibold hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-0 py-3">
            Order summary
          </h2>
          {items.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            Delivery details
          </h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
