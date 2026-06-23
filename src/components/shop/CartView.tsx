"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Section } from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartLineItem } from "@/components/shop/CartLineItem";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/useCartStore";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Section className="text-center">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-muted-foreground">
          Explora el catálogo y encuentra tu próximo café.
        </p>
        <Link href="/store" className={buttonVariants({ size: "lg", className: "mt-8" })}>
          Ir a la tienda
        </Link>
      </Section>
    );
  }

  return (
    <Section>
      <Link
        href="/store"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
        Seguir comprando
      </Link>

      <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Tu carrito</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.variantId} className="py-6 first:pt-0">
              <CartLineItem
                item={item}
                onUpdateQuantity={(quantity) => updateQuantity(item.variantId, quantity)}
                onRemove={() => removeItem(item.variantId)}
              />
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-3xl bg-secondary/30 p-6 ring-1 ring-border/60">
          <h2 className="font-serif text-lg tracking-tight">Resumen</h2>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Envío e impuestos se calculan en el checkout.
          </p>
          <Link
            href="/checkout"
            className={buttonVariants({ size: "lg", className: "mt-6 w-full" })}
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </Section>
  );
}
