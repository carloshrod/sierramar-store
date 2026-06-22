import { strapiPublicFetch } from "@/lib/api/public-client";
import type { Product, ProductFilters, SortOption } from "@/lib/types/product";

const POPULATE_PARAMS =
  "populate[images]=true&populate[category]=true&populate[variants]=true";

function buildProductFiltersQuery(filters: ProductFilters = {}): string {
  const params = new URLSearchParams();
  params.set("filters[isActive][$eq]", "true");

  filters.category?.forEach((slug, i) =>
    params.append(`filters[category][slug][$in][${i}]`, slug),
  );
  filters.roastLevel?.forEach((value, i) =>
    params.append(`filters[roastLevel][$in][${i}]`, value),
  );
  filters.method?.forEach((value, i) =>
    params.append(`filters[method][$in][${i}]`, value),
  );
  filters.process?.forEach((value, i) =>
    params.append(`filters[process][$in][${i}]`, value),
  );

  // Matches if any active variant (grind x weight) falls in the range —
  // not just the cheapest one shown on the card.
  if (filters.priceMin !== undefined) {
    params.set("filters[variants][price][$gte]", String(filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    params.set("filters[variants][price][$lte]", String(filters.priceMax));
  }

  return params.toString();
}

export async function getProducts(
  filters: ProductFilters = {},
  sort: SortOption = "recent",
): Promise<Product[]> {
  const query = buildProductFiltersQuery(filters);
  // Most sort options are applied client-side (see sortProducts) since they
  // key off values already in the response. "best-selling" is the
  // exception: totalSold is computed server-side, so it has to be sorted
  // there too — ask Strapi via the custom `sortBy` param.
  const sortByParam = sort === "best-selling" ? "&sortBy=totalSold" : "";
  const res = await strapiPublicFetch<Product[]>(
    `/api/products?${query}&${POPULATE_PARAMS}&sort=name:asc${sortByParam}`,
  );
  return res.data;
}

export async function getBestSellers(limit = 3): Promise<Product[]> {
  const res = await strapiPublicFetch<Product[]>(
    `/api/products/best-sellers?limit=${limit}`,
  );
  return res.data;
}
