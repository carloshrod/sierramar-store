"use server";

import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas/checkout";
import { getVariantsByIds } from "@/lib/api/product-variants";
import { createOrder } from "@/lib/api/orders";
import { createPreference } from "@/lib/mercadopago";
import type { CartItem } from "@/lib/types/cart";
import type { OrderItem } from "@/lib/types/order";

export type SubmitCheckoutResult =
  | { ok: true; redirectUrl: string }
  | { ok: false; error: string };

/**
 * Re-validates prices/stock straight from Strapi (never trusts the cart's
 * client-side price snapshot), creates the Order — which triggers the
 * existing Strapi middleware that decrements stock — then creates the
 * MercadoPago preference the client redirects to.
 */
export async function submitCheckout(
  values: CheckoutFormValues,
  cartItems: CartItem[],
): Promise<SubmitCheckoutResult> {
  if (cartItems.length === 0) {
    return { ok: false, error: "Tu carrito está vacío." };
  }

  const parsed = checkoutSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Revisa los datos del formulario." };
  }

  const variants = await getVariantsByIds(cartItems.map((item) => item.variantId));
  const variantById = new Map(variants.map((variant) => [variant.id, variant]));

  const items: OrderItem[] = [];
  for (const cartItem of cartItems) {
    const variant = variantById.get(cartItem.variantId);
    if (!variant || !variant.isActive) {
      return { ok: false, error: `"${cartItem.name}" ya no está disponible.` };
    }
    if (variant.stock < cartItem.quantity) {
      return {
        ok: false,
        error: `Solo quedan ${variant.stock} unidades de "${cartItem.name}".`,
      };
    }
    items.push({
      productVariant: variant.documentId,
      productName: variant.product?.name ?? cartItem.name,
      sku: variant.sku,
      quantity: cartItem.quantity,
      unitPrice: variant.price,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let order;
  try {
    order = await createOrder({
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
      items,
      shippingAddress: parsed.data.shippingAddress,
      subtotal,
      shippingCost: 0,
      tax: 0,
      total: subtotal,
      currency: "COP",
      paymentMethod: "mercadopago",
    });
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : "No se pudo crear la orden.",
    };
  }

  try {
    const redirectUrl = await createPreference(order);
    return { ok: true, redirectUrl };
  } catch (cause) {
    // The MercadoPago SDK throws the raw parsed error body (not always an
    // Error instance) on non-2xx responses — log it so the actual API
    // complaint shows up in the server console instead of being swallowed.
    console.error("MercadoPago preference creation failed:", cause);
    const message =
      cause && typeof cause === "object" && "message" in cause
        ? String((cause as { message: unknown }).message)
        : undefined;
    return {
      ok: false,
      error: message ?? "No se pudo iniciar el pago con MercadoPago. Intenta de nuevo.",
    };
  }
}
