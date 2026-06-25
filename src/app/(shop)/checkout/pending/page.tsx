import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Section } from "@/components/common/Section";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { buttonVariants } from "@/components/ui/button";
import { getOrderByNumber } from "@/lib/api/orders";

export const metadata: Metadata = {
  title: "Pago en proceso — SierraMar",
};

interface PageProps {
  searchParams: Promise<{ orderNumber?: string }>;
}

export default async function CheckoutPendingPage({ searchParams }: PageProps) {
  const { orderNumber } = await searchParams;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;
  if (!order) notFound();

  return (
    <Section className="text-center">
      <Clock className="mx-auto size-10 text-foreground" />
      <h1 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
        Tu pago está siendo procesado
      </h1>
      <p className="mt-3 text-muted-foreground">
        Te avisaremos por correo en cuanto se confirme. Esto puede tardar unas horas si elegiste
        un medio de pago en efectivo o transferencia.
      </p>
      <div className="mx-auto mt-8 max-w-md">
        <OrderSummary order={order} />
      </div>
      <Link href="/store" className={buttonVariants({ size: "lg", className: "mt-8" })}>
        Seguir comprando
      </Link>
    </Section>
  );
}
