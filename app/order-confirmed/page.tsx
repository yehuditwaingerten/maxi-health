import OrderConfirmedContent from "@/components/OrderConfirmedContent";

type Props = { searchParams: { ref?: string } };

export const metadata = { title: "Order Confirmed" };

export default function OrderConfirmedPage({ searchParams }: Props) {
  return <OrderConfirmedContent orderRef={searchParams.ref} />;
}
