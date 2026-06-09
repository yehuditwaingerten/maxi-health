import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Feel your best every day
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Premium vitamins and supplements — no subscription, no hassle. Order online and pay on delivery.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-emerald-600 font-bold px-7 py-3 rounded-full shadow hover:shadow-lg hover:bg-emerald-50 transition-all"
          >
            Shop all products
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Featured products</h2>
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
          <Link
            href="/products"
            className="text-emerald-600 font-semibold hover:underline"
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-gray-100 bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
          <div>
            <div className="text-2xl mb-1">🚚</div>
            <div className="font-semibold text-gray-700">Fast delivery</div>
            <div>To your door</div>
          </div>
          <div>
            <div className="text-2xl mb-1">💳</div>
            <div className="font-semibold text-gray-700">Cash on delivery</div>
            <div>Pay when you receive</div>
          </div>
          <div>
            <div className="text-2xl mb-1">✅</div>
            <div className="font-semibold text-gray-700">Quality guaranteed</div>
            <div>Premium ingredients</div>
          </div>
        </div>
      </section>
    </div>
  );
}
