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

    const totalAmount = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Create order without reference first to get the auto-incremented id
    const order = await prisma.order.create({
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
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    const reference = buildReference(order.id);

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { reference },
      include: { items: { include: { product: true } } },
    });

    await sendOrderNotification(updatedOrder);

    return NextResponse.json({ reference }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
