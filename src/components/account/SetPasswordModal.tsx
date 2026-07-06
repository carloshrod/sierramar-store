"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPasswordSchema, type SetPasswordValues } from "@/lib/schemas/auth";
import { setOrChangePassword } from "@/lib/actions/auth";
import { useModalStore } from "@/store/useModalStore";

export function SetPasswordModal({ hasPassword }: { hasPassword: boolean }) {
  const activeModal = useModalStore((state) => state.activeModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const open = activeModal === "set-password";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: SetPasswordValues) {
    setSubmitError(null);
    const result = await setOrChangePassword(values);
    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    reset();

    if (result.loggedOut) {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
      openModal("login");
      return;
    }

    closeModal();
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{hasPassword ? "Cambiar contraseña" : "Establecer contraseña"}</DialogTitle>
          <DialogDescription>
            {hasPassword
              ? "Ingresa tu contraseña actual y la nueva."
              : "Crea una contraseña para poder iniciar sesión sin código."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {hasPassword && (
            <div>
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input
                id="current-password"
                type="password"
                className="mt-1.5"
                aria-invalid={!!errors.currentPassword}
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-destructive">{errors.currentPassword.message}</p>
              )}
            </div>
          )}
          <div>
            <Label htmlFor="new-password">Nueva contraseña</Label>
            <Input
              id="new-password"
              type="password"
              className="mt-1.5"
              aria-invalid={!!errors.newPassword}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-destructive">{errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              className="mt-1.5"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
          {submitError && <p className="text-sm text-destructive">{submitError}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Guardando…" : "Guardar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
