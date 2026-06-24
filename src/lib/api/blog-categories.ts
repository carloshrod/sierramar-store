import { strapiPublicFetch } from "@/lib/api/public-client";
import type { BlogCategory } from "@/lib/types/blog-category";

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const res = await strapiPublicFetch<BlogCategory[]>(
    "/api/blog-categories?sort=name:asc",
  );
  return res.data;
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  const res = await strapiPublicFetch<BlogCategory[]>(
    `/api/blog-categories?${params.toString()}`,
  );
  return res.data[0] ?? null;
}
