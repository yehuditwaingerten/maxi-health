import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import type { Order, OrderItem, Product } from "@/app/generated/prisma/client";

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOrderNotification(order: OrderWithItems) {
  const itemRows = order.items
    .map(
      (item) =>
        `${item.product.name.padEnd(30)} x${item.quantity}   $${(
          item.unitPrice * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const body = `
New order received on Maxi Health!

Reference: ${order.reference}  |  Date: ${order.createdAt.toLocaleString()}

--- Customer ---
Name:    ${order.customerName}
Phone:   ${order.customerPhone}
Address: ${order.customerAddress}
${order.notes ? `Notes:   ${order.notes}` : ""}

--- Items Ordered ---
${itemRows}
${"─".repeat(45)}
Total:   $${order.totalAmount.toFixed(2)}

Payment: Cash on Delivery

Please prepare and deliver the above items.
`.trim();

  await transporter.sendMail({
    from: `"Maxi Health" <${env.GMAIL_USER}>`,
    to: env.OWNER_EMAIL,
    subject: `New Order ${order.reference} — Maxi Health`,
    text: body,
  });
}
