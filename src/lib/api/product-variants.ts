import { strapiFetch } from "@/lib/api/client";
import type { GrindType } from "@/lib/types/product";

export interface VariantWithProduct {
  id: number;
  documentId: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  grindType: GrindType;
  weight: number;
  product: { name: string } | null;
}

/**
 * Re-reads price/stock/isActive straight from Strapi by numeric id — the
 * authoritative source used when building an order, since the client's cart
 * only carries a price snapshot taken at add-to-cart time.
 */
export async function getVariantsByIds(ids: number[]): Promise<VariantWithProduct[]> {
  if (ids.length === 0) return [];

  const params = new URLSearchParams();
  ids.forEach((id, i) => params.append(`filters[id][$in][${i}]`, String(id)));
  params.set("populate[product]", "true");

  const res = await strapiFetch<VariantWithProduct[]>(
    `/api/product-variants?${params.toString()}`,
  );
  return res.data;
}
