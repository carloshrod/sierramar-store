import { STRAPI_URL } from "@/lib/constants";
import type { StrapiResponse } from "@/lib/types/strapi";

/**
 * Fetches public Strapi data without the server-only API token. Safe to call
 * from both Server and Client Components — only hits endpoints the Public
 * role can read (catalog browsing), never the authenticated endpoints in
 * `lib/api/client.ts`.
 */
export async function strapiPublicFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<StrapiResponse<T>> {
  let res: Response;

  try {
    res = await fetch(`${STRAPI_URL}${path}`, init);
  } catch (cause) {
    throw new Error(
      `No se pudo conectar con Strapi en ${STRAPI_URL}. ¿Está corriendo el CMS?`,
      { cause },
    );
  }

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<StrapiResponse<T>>;
}
