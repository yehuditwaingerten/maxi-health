import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Vitamin C 1000mg",
    slug: "vitamin-c-1000mg",
    description: "High-potency Vitamin C for immune support and antioxidant protection. 100 tablets.",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    category: "Vitamins",
    stock: 150,
  },
  {
    name: "Vitamin D3 5000 IU",
    slug: "vitamin-d3-5000iu",
    description: "Supports bone health, immune function, and mood. 90 softgels.",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400",
    category: "Vitamins",
    stock: 120,
  },
  {
    name: "Omega-3 Fish Oil",
    slug: "omega-3-fish-oil",
    description: "Pure EPA & DHA from deep-sea fish. Supports heart and brain health. 60 softgels.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
    category: "Omega",
    stock: 100,
  },
  {
    name: "Magnesium Glycinate 400mg",
    slug: "magnesium-glycinate-400mg",
    description: "Highly absorbable magnesium for muscle relaxation, sleep, and stress relief. 120 capsules.",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
    category: "Minerals",
    stock: 90,
  },
  {
    name: "Zinc 50mg",
    slug: "zinc-50mg",
    description: "Essential trace mineral for immune defense, wound healing, and skin health. 100 tablets.",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1626977398024-e9c8a6b13d61?w=400",
    category: "Minerals",
    stock: 200,
  },
  {
    name: "B-Complex Complete",
    slug: "b-complex-complete",
    description: "Full spectrum of B vitamins including B1, B2, B6, B12, and folate. Supports energy and metabolism. 100 capsules.",
    price: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400",
    category: "Vitamins",
    stock: 110,
  },
  {
    name: "Probiotic 50 Billion CFU",
    slug: "probiotic-50-billion",
    description: "10 strains of beneficial bacteria for gut health and digestive balance. 30 capsules.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400",
    category: "Digestive",
    stock: 75,
  },
  {
    name: "Calcium + Vitamin D3",
    slug: "calcium-vitamin-d3",
    description: "Optimal calcium absorption formula with Vitamin D3 co-factor. Supports bone density. 120 tablets.",
    price: 13.99,
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=400",
    category: "Minerals",
    stock: 130,
  },
  {
    name: "Multivitamin Daily",
    slug: "multivitamin-daily",
    description: "Complete daily multivitamin with 23 essential vitamins and minerals. 90 tablets.",
    price: 22.99,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
    category: "Vitamins",
    stock: 180,
  },
  {
    name: "Iron 65mg",
    slug: "iron-65mg",
    description: "Gentle, non-constipating iron formula with Vitamin C for enhanced absorption. 100 tablets.",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    category: "Minerals",
    stock: 160,
  },
];

async function main() {
  console.log("Seeding database...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
