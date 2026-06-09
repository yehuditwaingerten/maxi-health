import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ select: { slug: true, createdAt: true } });

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `https://maxi-health.com/products/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: "https://maxi-health.com/", changeFrequency: "weekly", priority: 1 },
    { url: "https://maxi-health.com/products", changeFrequency: "weekly", priority: 0.9 },
    ...productUrls,
  ];
}
