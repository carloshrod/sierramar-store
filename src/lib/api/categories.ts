import { strapiPublicFetch } from "@/lib/api/public-client";
import type { Category } from "@/lib/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await strapiPublicFetch<Category[]>(
    "/api/categories?sort=name:asc",
  );
  return res.data;
}
