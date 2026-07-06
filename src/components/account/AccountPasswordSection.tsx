"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import { SetPasswordModal } from "@/components/account/SetPasswordModal";

export function AccountPasswordSection({ hasPassword }: { hasPassword: boolean }) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary/30 p-4 ring-1 ring-border/60">
      <div>
        <p className="font-medium">Contraseña</p>
        <p className="text-sm text-muted-foreground">
          {hasPassword
            ? "Ya tienes una contraseña configurada."
            : "Todavía no has establecido una contraseña."}
        </p>
      </div>
      <Button type="button" variant="outline" onClick={() => openModal("set-password")}>
        {hasPassword ? "Cambiar contraseña" : "Establecer contraseña"}
      </Button>
      <SetPasswordModal hasPassword={hasPassword} />
    </div>
  );
}
