import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api/posts";
import type { PostFilters } from "@/lib/types/post";

export function usePosts(filters: PostFilters = {}, page = 1) {
  return useQuery({
    queryKey: ["posts", filters, page],
    queryFn: () => getPosts(filters, page),
  });
}
