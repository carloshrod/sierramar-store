import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Section } from "@/components/common/Section";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { AccountPasswordSection } from "@/components/account/AccountPasswordSection";
import { LogoutButton } from "@/components/account/LogoutButton";
import { getCurrentUser, getMyOrders } from "@/lib/api/auth";
import { formatMonthYear } from "@/lib/utils/date";

export const metadata: Metadata = {
  title: "Mi cuenta — SierraMar",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const orders = await getMyOrders();

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Mi cuenta</h1>
            <p className="mt-2 text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">
              Cliente desde {formatMonthYear(user.createdAt)}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8">
          <AccountPasswordSection hasPassword={user.hasPassword} />
        </div>

        <Separator className="my-10" />

        <h2 className="font-serif text-2xl tracking-tight">Tus pedidos</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-muted-foreground">Aún no tienes pedidos.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <OrderSummary key={order.documentId} order={order} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
