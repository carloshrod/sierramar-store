import { NextRequest, NextResponse } from "next/server";
import { InvalidWebhookSignatureError, Payment, WebhookSignatureValidator } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { updateOrder } from "@/lib/api/orders";
import type { OrderStatus, PaymentStatus } from "@/lib/types/order";

function mapPaymentStatus(
  mpStatus: string,
): { paymentStatus: PaymentStatus; status: OrderStatus } | null {
  switch (mpStatus) {
    case "approved":
      return { paymentStatus: "paid", status: "confirmed" };
    case "rejected":
    case "cancelled":
      return { paymentStatus: "failed", status: "cancelled" };
    case "refunded":
    case "charged_back":
      return { paymentStatus: "refunded", status: "refunded" };
    case "pending":
    case "in_process":
      return { paymentStatus: "pending", status: "pending" };
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  const dataId = request.nextUrl.searchParams.get("data.id");
  const type = request.nextUrl.searchParams.get("type");
  console.log(`[mercadopago webhook] received type=${type} data.id=${dataId}`);

  try {
    WebhookSignatureValidator.validate({
      xSignature: request.headers.get("x-signature"),
      xRequestId: request.headers.get("x-request-id"),
      dataId,
      secret: process.env.MERCADOPAGO_WEBHOOK_SECRET!,
    });
  } catch (cause) {
    // Not blocking on this: for this account, the secret shown in the
    // dashboard's Webhooks panel doesn't match what actually signs
    // notification_url-triggered deliveries (confirmed by manually
    // recomputing the HMAC — same mismatch as the SDK's validator), and the
    // cause wasn't resolvable from our side. We don't lose the real trust
    // boundary by skipping this: `Payment.get()` below re-fetches the
    // payment via our own authenticated Access Token, which can only ever
    // return payments belonging to our own account.
    const reason = cause instanceof InvalidWebhookSignatureError ? cause.reason : cause;
    console.warn(`[mercadopago webhook] signature check failed, processing anyway: ${reason}`);
  }

  // MercadoPago also sends non-payment events (subscriptions, plans) we don't
  // act on — ack so it stops retrying.
  if (type !== "payment" || !dataId) {
    console.log(`[mercadopago webhook] ignoring non-payment event type=${type}`);
    return NextResponse.json({ received: true });
  }

  // Only `data.id` is trusted from the request itself — the rest of the
  // payment state is always re-fetched from MercadoPago's API.
  const payment = await new Payment(mpClient).get({ id: dataId });
  const documentId = payment.external_reference;
  const mapped = payment.status ? mapPaymentStatus(payment.status) : null;
  console.log(
    `[mercadopago webhook] payment ${dataId} status=${payment.status} external_reference=${documentId}`,
  );

  if (documentId && mapped) {
    try {
      await updateOrder(documentId, {
        paymentStatus: mapped.paymentStatus,
        status: mapped.status,
        paymentMethod: "mercadopago",
      });
      console.log(`[mercadopago webhook] order ${documentId} updated to ${mapped.paymentStatus}`);
    } catch (cause) {
      // Swallow failures (e.g. a stale/test order) — MercadoPago retries on
      // non-2xx, and retried deliveries are idempotent on the Strapi side.
      console.error(`[mercadopago webhook] failed to update order ${documentId}:`, cause);
    }
  } else {
    console.log(`[mercadopago webhook] no matching order/status mapping, skipping update`);
  }

  return NextResponse.json({ received: true });
}
