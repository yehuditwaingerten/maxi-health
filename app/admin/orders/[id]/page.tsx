import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusSelector from "./StatusSelector";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const order = await prisma.order.findUnique({ where: { id: Number(params.id) } });
  if (!order) return {};
  return { title: `${order.reference} — Admin` };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminOrderDetailPage({ params }: Props) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 inline-block">
        ← Back to orders
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{order.reference}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date(order.createdAt).toLocaleString("he-IL")}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
          {order.status}
        </span>
      </div>

      {/* Customer info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 space-y-2 text-sm">
        <h2 className="font-semibold text-gray-700 mb-3">Customer</h2>
        <p><span className="text-gray-500 w-20 inline-block">Name</span> {order.customerName}</p>
        <p><span className="text-gray-500 w-20 inline-block">Phone</span> {order.customerPhone}</p>
        <p><span className="text-gray-500 w-20 inline-block">Address</span> {order.customerAddress}</p>
        {order.notes && (
          <p><span className="text-gray-500 w-20 inline-block">Notes</span> {order.notes}</p>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h2 className="font-semibold text-gray-700 mb-4 text-sm">Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-800">{item.product.name}</span>
                <span className="text-gray-400 ml-2">× {item.quantity}</span>
              </div>
              <span className="font-semibold text-gray-900 shrink-0">
                ₪{(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between font-bold text-sm">
          <span>Total</span>
          <span>₪{order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Status update */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-700 mb-4 text-sm">Update status</h2>
        <StatusSelector orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
