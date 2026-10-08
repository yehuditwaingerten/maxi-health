"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useT } from "@/hooks/useT";

const schema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(7),
  customerAddress: z.string().min(5),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const clearCart = useCartStore((s) => s.clearCart);
  const t = useT();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const body = {
      ...data,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.price,
      })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setError("root", { message: t.form.error });
      return;
    }

    const { reference } = await res.json() as { reference: string };
    clearCart();
    router.push(`/order-confirmed?ref=${reference}`);
  };

  const field =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition";
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const err = "text-xs text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={label}>{t.form.fullName}</label>
        <input {...register("customerName")} className={field} placeholder="ישראל ישראלי" />
        {errors.customerName && <p className={err}>{t.form.nameRequired}</p>}
      </div>

      <div>
        <label className={label}>{t.form.phoneNumber}</label>
        <input {...register("customerPhone")} type="tel" className={field} placeholder="050-000-0000" />
        {errors.customerPhone && <p className={err}>{t.form.phoneRequired}</p>}
      </div>

      <div>
        <label className={label}>{t.form.deliveryAddress}</label>
        <input {...register("customerAddress")} className={field} placeholder="רחוב, עיר" />
        {errors.customerAddress && <p className={err}>{t.form.addressRequired}</p>}
      </div>

      <div>
        <label className={label}>
          {t.form.notes}{" "}
          <span className="text-gray-400 font-normal">{t.form.optional}</span>
        </label>
        <textarea {...register("notes")} rows={3} className={field} placeholder={t.form.notesPlaceholder} />
      </div>

      {errors.root && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errors.root.message}
        </p>
      )}

      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
        <span className="text-gray-600">{t.form.totalLabel(items.length)}</span>
        <span className="font-bold text-gray-900 text-base">₪{totalPrice.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {isSubmitting ? t.form.placingOrder : t.form.placeOrder}
      </button>
    </form>
  );
}
