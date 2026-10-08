import { prisma } from "@/lib/prisma";
import ProductsContent from "@/components/ProductsContent";

export const dynamic = "force-dynamic";
export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { category: "asc" } });
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return <ProductsContent products={products} categories={categories} />;
}
