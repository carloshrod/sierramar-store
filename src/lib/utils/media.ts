import { STRAPI_URL } from "@/lib/constants";

/** Strapi returns absolute URLs for remote providers (S3, etc.) but relative `/uploads/...` paths for local storage. */
export function getStrapiMediaUrl(url: string): string {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
