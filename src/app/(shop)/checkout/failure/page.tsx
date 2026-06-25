import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleX } from "lucide-react";
import { Section } from "@/components/common/Section";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { buttonVariants } from "@/components/ui/button";
import { getOrderByNumber } from "@/lib/api/orders";

export const metadata: Metadata = {
  title: "Pago no procesado — SierraMar",
};

interface PageProps {
  searchParams: Promise<{ orderNumber?: string }>;
}

export default async function CheckoutFailurePage({ searchParams }: PageProps) {
  const { orderNumber } = await searchParams;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;
  if (!order) notFound();

  return (
    <Section className="text-center">
      <CircleX className="mx-auto size-10 text-destructive" />
      <h1 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
        Tu pago no pudo procesarse
      </h1>
      <p className="mt-3 text-muted-foreground">
        No te preocupes, no se realizó ningún cargo. Puedes intentarlo de nuevo.
      </p>
      <div className="mx-auto mt-8 max-w-md">
        <OrderSummary order={order} />
      </div>
      <Link href="/checkout" className={buttonVariants({ size: "lg", className: "mt-8" })}>
        Intentar de nuevo
      </Link>
    </Section>
  );
}
