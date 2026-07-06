import type { Metadata } from "next";
import { Section } from "@/components/common/Section";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { getCurrentUser, getMyOrders } from "@/lib/api/auth";
import type { CheckoutFormValues } from "@/lib/schemas/checkout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout — SierraMar",
  description: "Completa tus datos de envío y paga con MercadoPago.",
};

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  const orders = user ? await getMyOrders() : [];
  const mostRecent = orders[0];

  const defaultValues: Partial<CheckoutFormValues> | undefined = mostRecent
    ? {
        customerName: mostRecent.customerName,
        customerEmail: user?.email ?? mostRecent.customerEmail,
        customerPhone: mostRecent.customerPhone,
        shippingAddress: mostRecent.shippingAddress,
      }
    : undefined;

  return (
    <Section>
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-muted-foreground">
          Completa tus datos de contacto y envío para finalizar tu compra.
        </p>
      </div>
      <div className="mt-10">
        <CheckoutForm defaultValues={defaultValues} />
      </div>
    </Section>
  );
}
