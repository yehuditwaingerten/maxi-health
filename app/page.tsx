import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "asc" },
  });

  return <HomeContent featured={featured} />;
}
