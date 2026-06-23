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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("filters[isActive][$eq]", "true");
  const res = await strapiPublicFetch<Product[]>(
    `/api/products?${params.toString()}&${POPULATE_PARAMS}`,
  );
  return res.data[0] ?? null;
}

const RELATED_PRODUCTS_LIMIT = 4;

export interface RelatedProductsResult {
  products: Product[];
  /** Which strategy filled the list — lets the caller pick a fitting section title. */
  source: "category" | "best-sellers";
}

/** Same category first (excluding the product itself); tops up with best sellers if there aren't enough. */
export async function getRelatedProducts(
  product: Product,
  limit = RELATED_PRODUCTS_LIMIT,
): Promise<RelatedProductsResult> {
  const sameCategory = product.category
    ? (await getProducts({ category: [product.category.slug] })).filter(
        (candidate) => candidate.documentId !== product.documentId,
      )
    : [];

  if (sameCategory.length >= limit) {
    return { products: sameCategory.slice(0, limit), source: "category" };
  }

  const fallback = await getBestSellers(limit + 1);
  const seen = new Set([
    product.documentId,
    ...sameCategory.map((candidate) => candidate.documentId),
  ]);
  const products = [...sameCategory];

  for (const candidate of fallback) {
    if (products.length === limit) break;
    if (seen.has(candidate.documentId)) continue;
    seen.add(candidate.documentId);
    products.push(candidate);
  }

  return { products, source: sameCategory.length > 0 ? "category" : "best-sellers" };
}
