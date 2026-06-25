import { strapiFetch } from "@/lib/api/client";
import type { CreateOrderInput, Order } from "@/lib/types/order";

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  // Strapi 5 omits components/relations from the response unless populate is
  // requested explicitly — without this, `order.items` would come back undefined.
  const res = await strapiFetch<Order>("/api/orders?populate[items]=true", {
    method: "POST",
    body: JSON.stringify({ data: input }),
  });
  return res.data;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const params = new URLSearchParams();
  params.set("filters[orderNumber][$eq]", orderNumber);
  params.set("populate[items][populate]", "productVariant");
  params.set("populate[shippingAddress]", "true");

  const res = await strapiFetch<Order[]>(`/api/orders?${params.toString()}`);
  return res.data[0] ?? null;
}

export async function updateOrder(
  documentId: string,
  data: Partial<Pick<Order, "status" | "paymentStatus" | "paymentMethod">>,
): Promise<Order> {
  const res = await strapiFetch<Order>(`/api/orders/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });
  return res.data;
}
