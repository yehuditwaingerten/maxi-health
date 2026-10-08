"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";
import CheckoutForm from "@/components/CheckoutForm";
import { useT } from "@/hooks/useT";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const t = useT();

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">{t.checkout.emptyMessage}</p>
        <Link href="/products" className="text-emerald-600 font-semibold hover:underline">
          {t.checkout.browseProducts}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">{t.checkout.title}</h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-0 py-3">
            {t.checkout.orderSummary}
          </h2>
          {items.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            {t.checkout.deliveryDetails}
          </h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
