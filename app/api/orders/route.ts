import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/email";

const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerAddress: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
});

function buildReference(id: number): string {
  return `MH-${String(id).padStart(5, "0")}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { customerName, customerPhone, customerAddress, notes, items } =
      parsed.data;

    // Quick pre-check: all products exist and prices match
    const productIds = items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true, stock: true },
    });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products not found" },
        { status: 400 }
      );
    }

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    for (const item of items) {
      const db = productMap.get(item.productId)!;
      if (Math.abs(db.price - item.unitPrice) > 0.01) {
        return NextResponse.json(
          { error: "Price mismatch — please refresh the page and try again" },
          { status: 400 }
        );
      }
    }

    // Use DB prices for totalAmount — never trust the client
    const totalAmount = items.reduce(
      (sum, item) => sum + productMap.get(item.productId)!.price * item.quantity,
      0
    );

    // Inside a transaction: re-check stock, create order, decrement stock atomically
    const finalOrder = await prisma.$transaction(async (tx) => {
      // Re-fetch stock inside transaction to catch concurrent orders
      const locked = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stock: true },
      });

      const stockMap = new Map(locked.map((p) => [p.id, p.stock]));

      for (const item of items) {
        const available = stockMap.get(item.productId) ?? 0;
        if (available < item.quantity) {
          throw new OutOfStockError(item.productId);
        }
      }

      const order = await tx.order.create({
        data: {
          reference: "TEMP",
          customerName,
          customerPhone,
          customerAddress,
          notes,
          totalAmount,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: productMap.get(item.productId)!.price,
            })),
          },
        },
      });

      // Decrement stock for each ordered product
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const reference = buildReference(order.id);

      return tx.order.update({
        where: { id: order.id },
        data: { reference },
        include: { items: { include: { product: true } } },
      });
    });

    await sendOrderNotification(finalOrder);

    return NextResponse.json({ reference: finalOrder.reference }, { status: 201 });
  } catch (err) {
    if (err instanceof OutOfStockError) {
      return NextResponse.json(
        { error: "One or more items are out of stock" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

class OutOfStockError extends Error {
  constructor(public productId: number) {
    super(`Out of stock: product ${productId}`);
  }
}
