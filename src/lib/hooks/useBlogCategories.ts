import { useQuery } from "@tanstack/react-query";
import { getBlogCategories } from "@/lib/api/blog-categories";

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
    staleTime: 10 * 60 * 1000,
  });
}
