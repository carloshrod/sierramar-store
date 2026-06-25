import "server-only";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { APP_URL } from "@/lib/constants";
import type { Order } from "@/lib/types/order";

export const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

// MercadoPago requires back_urls.success to be a publicly resolvable domain
// for auto_return to work — it rejects localhost with `invalid_auto_return`.
// Skip it locally; the buyer just sees a "volver al sitio" button instead of
// the ~5s auto-redirect.
const isPubliclyReachable = !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(APP_URL);

/** Creates a Checkout Pro preference and returns the hosted payment URL the buyer should be redirected to. */
export async function createPreference(order: Order): Promise<string> {
  const preference = await new Preference(mpClient).create({
    body: {
      items: order.items.map((item, index) => ({
        id: item.sku ?? `item-${index}`,
        title: item.productName,
        quantity: item.quantity,
        currency_id: order.currency,
        unit_price: item.unitPrice,
      })),
      payer: {
        name: order.customerName,
        email: order.customerEmail,
      },
      external_reference: order.documentId,
      back_urls: {
        success: `${APP_URL}/checkout/success?orderNumber=${order.orderNumber}`,
        pending: `${APP_URL}/checkout/pending?orderNumber=${order.orderNumber}`,
        failure: `${APP_URL}/checkout/failure?orderNumber=${order.orderNumber}`,
      },
      ...(isPubliclyReachable ? { auto_return: "approved" as const } : {}),
      notification_url: `${APP_URL}/api/webhooks/mercadopago`,
    },
  });

  if (!preference.init_point) {
    throw new Error("MercadoPago no devolvió una URL de pago");
  }

  return preference.init_point;
}
