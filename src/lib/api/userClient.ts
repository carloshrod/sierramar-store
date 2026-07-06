import "server-only";

import { cookies } from "next/headers";
import { STRAPI_URL } from "@/lib/constants";

export const SESSION_COOKIE = "sierramar_session";

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

/**
 * Fetches Strapi using the current end-user's own JWT (from the session
 * cookie) instead of the app-wide STRAPI_API_TOKEN — for "my own data" calls
 * like the current user or their orders. Returns the raw parsed JSON body
 * as-is: some Strapi endpoints (e.g. `/api/users/me`) return a bare object,
 * others (collection routes like `/api/orders`) return `{data, meta}` — the
 * caller knows which shape to expect for the path it's calling.
 *
 * Returns `null` (rather than throwing) when there's no session or the
 * token is rejected, since "not logged in" is an expected, common case here
 * — unlike `strapiFetch`, whose callers always have a valid app token.
 */
export async function strapiUserFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const res = await fetch(`${STRAPI_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (res.status === 401) return null;

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message as string | undefined;
    throw new Error(message ?? `Strapi request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
