import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { DEFAULT_SORT, type ProductFilters, type SortOption } from "@/lib/types/product";

export function useProducts(filters: ProductFilters, sort: SortOption = DEFAULT_SORT) {
  return useQuery({
    queryKey: ["products", filters, sort],
    queryFn: () => getProducts(filters, sort),
  });
}
