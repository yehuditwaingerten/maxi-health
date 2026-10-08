import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductContent from "@/components/ProductContent";

type Props = { params: { slug: string } };

const getProduct = cache((slug: string) =>
  prisma.product.findUnique({ where: { slug } })
);

export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return { title: `${product.name} — Maxi Health` };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return <ProductContent product={product} />;
}
