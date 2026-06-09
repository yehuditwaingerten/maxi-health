import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return {};
  return { title: `${product.name} — Maxi Health` };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden md:flex">
        <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0 bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 288px"
            priority
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-2xl font-extrabold text-gray-900">
              ₪{product.price.toFixed(2)}
            </span>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
