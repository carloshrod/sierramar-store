"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@/lib/types/user";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User | null> => {
      const res = await fetch("/api/me");
      const body = await res.json();
      return body.user;
    },
    staleTime: 60 * 1000,
  });
}
