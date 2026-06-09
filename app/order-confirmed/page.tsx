import Link from "next/link";

type Props = { searchParams: { ref?: string } };

export const metadata = { title: "Order Confirmed — Maxi Health" };

export default function OrderConfirmedPage({ searchParams }: Props) {
  const ref = searchParams.ref;

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Order confirmed!</h1>

      {ref ? (
        <p className="text-gray-600 mb-2">
          Your reference number is{" "}
          <span className="font-bold text-emerald-600">{ref}</span>
        </p>
      ) : null}

      <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 mb-8">
        We&apos;ll be in touch soon. Payment is cash on delivery — no need to do anything now.
      </p>

      <Link
        href="/products"
        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
}
