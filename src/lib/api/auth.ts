import "server-only";

import { strapiUserFetch } from "@/lib/api/userClient";
import type { User } from "@/lib/types/user";
import type { Order } from "@/lib/types/order";
import type { StrapiResponse } from "@/lib/types/strapi";

/** `/api/users/me` returns the sanitized user as a bare object, not the `{data,meta}` envelope. */
export async function getCurrentUser(): Promise<User | null> {
  return strapiUserFetch<User>("/api/users/me");
}

export async function getMyOrders(): Promise<Order[]> {
  const params = new URLSearchParams();
  params.set("populate[items][populate]", "productVariant");
  params.set("populate[shippingAddress]", "true");
  params.set("sort", "createdAt:desc");

  const res = await strapiUserFetch<StrapiResponse<Order[]>>(`/api/orders?${params.toString()}`);
  return res?.data ?? [];
}
