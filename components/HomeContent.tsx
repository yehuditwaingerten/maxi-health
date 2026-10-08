"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useT } from "@/hooks/useT";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function HomeContent({ featured }: { featured: Product[] }) {
  const t = useT();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {t.home.heroTitle}
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
            {t.home.heroSubtitle}
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-emerald-600 font-bold px-7 py-3 rounded-full shadow hover:shadow-lg hover:bg-emerald-50 transition-all"
          >
            {t.home.shopAll}
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{t.home.featured}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              price={p.price}
              imageUrl={p.imageUrl}
              category={p.category}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="text-emerald-600 font-semibold hover:underline">
            {t.home.viewAll}
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-gray-100 bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
          <div>
            <div className="text-2xl mb-1">🚚</div>
            <div className="font-semibold text-gray-700">{t.home.fastDelivery}</div>
            <div>{t.home.toYourDoor}</div>
          </div>
          <div>
            <div className="text-2xl mb-1">💳</div>
            <div className="font-semibold text-gray-700">{t.home.cashOnDelivery}</div>
            <div>{t.home.payWhenReceive}</div>
          </div>
          <div>
            <div className="text-2xl mb-1">✅</div>
            <div className="font-semibold text-gray-700">{t.home.qualityGuaranteed}</div>
            <div>{t.home.premiumIngredients}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
