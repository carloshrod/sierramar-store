import "server-only";

import { STRAPI_URL } from "@/lib/constants";
import type { StrapiResponse } from "@/lib/types/strapi";

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<StrapiResponse<T>> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message as string | undefined;
    throw new Error(message ?? `Strapi request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<StrapiResponse<T>>;
}
