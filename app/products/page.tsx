import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Products — Maxi Health" };

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { category: "asc" } });

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">All products</h1>
      <p className="text-sm text-gray-500 mb-8">{products.length} products</p>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-base font-semibold text-emerald-600 uppercase tracking-wide mb-4">
            {cat}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products
              .filter((p) => p.category === cat)
              .map((p) => (
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
        </div>
      ))}
    </div>
  );
}
