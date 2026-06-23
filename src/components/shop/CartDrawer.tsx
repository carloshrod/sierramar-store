"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLink } from "@/components/common/ArrowLink";
import { buttonVariants } from "@/components/ui/button";
import { CartLineItem } from "@/components/shop/CartLineItem";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b border-border px-4 pt-4 pb-3">
          <SheetTitle>Tu carrito</SheetTitle>
          <SheetDescription className="sr-only">
            Resumen de los productos en tu carrito
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
            <ShoppingBag className="size-8 text-muted-foreground" />
            <p className="font-serif text-lg tracking-tight">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              Explora el catálogo y encuentra tu próximo café.
            </p>
            <Link
              href="/store"
              onClick={closeCart}
              className={buttonVariants({ className: "mt-2" })}
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-5 overflow-y-auto px-4">
              {items.map((item) => (
                <li key={item.variantId}>
                  <CartLineItem
                    item={item}
                    onUpdateQuantity={(quantity) => updateQuantity(item.variantId, quantity)}
                    onRemove={() => removeItem(item.variantId)}
                    onNavigate={closeCart}
                  />
                </li>
              ))}
            </ul>

            <SheetFooter className="border-t border-border px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-serif text-lg tracking-tight">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Envío e impuestos se calculan en el checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className={buttonVariants({ size: "lg", className: "mt-1 w-full" })}
              >
                Finalizar compra
              </Link>
              <ArrowLink
                href="/cart"
                onClick={closeCart}
                className="mt-1 self-center text-muted-foreground hover:text-foreground"
              >
                Ver carrito completo
              </ArrowLink>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
