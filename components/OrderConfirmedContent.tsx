"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";

export default function OrderConfirmedContent({ orderRef }: { orderRef?: string }) {
  const t = useT();

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">{t.orderConfirmed.title}</h1>

      {orderRef ? (
        <p className="text-gray-600 mb-2">
          {t.orderConfirmed.referencePrefix}{" "}
          <span className="font-bold text-emerald-600">{orderRef}</span>
        </p>
      ) : null}

      <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 mb-8">
        {t.orderConfirmed.message}
      </p>

      <Link
        href="/products"
        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        {t.orderConfirmed.continueShopping}
      </Link>
    </div>
  );
}
