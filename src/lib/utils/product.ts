import type { Product, SortOption } from "@/lib/types/product";

/** Products are priced per variant (grind x weight); the card shows the cheapest active one. */
export function getMinVariantPrice(product: Product): number | null {
  const activePrices = (product.variants ?? [])
    .filter((variant) => variant.isActive)
    .map((variant) => variant.price);

  return activePrices.length > 0 ? Math.min(...activePrices) : null;
}

/** Whether the product's active variants span more than one price point. */
export function hasPriceRange(product: Product): boolean {
  const activePrices = (product.variants ?? [])
    .filter((variant) => variant.isActive)
    .map((variant) => variant.price);

  return new Set(activePrices).size > 1;
}

/** Sorts by the same price shown on the card; products with no price sink to the end. */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "recent":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "best-selling":
      // Strapi already sorts by totalSold when `sortBy=totalSold` is sent.
      return sorted;
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort(
        (a, b) =>
          (getMinVariantPrice(a) ?? Infinity) - (getMinVariantPrice(b) ?? Infinity),
      );
    case "price-desc":
      return sorted.sort(
        (a, b) =>
          (getMinVariantPrice(b) ?? -Infinity) - (getMinVariantPrice(a) ?? -Infinity),
      );
  }
}
