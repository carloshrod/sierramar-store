"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleLogout() {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    router.push("/");
    router.refresh();
  }

  return (
    <Button type="button" variant="ghost" onClick={handleLogout}>
      <LogOut />
      Cerrar sesión
    </Button>
  );
}
