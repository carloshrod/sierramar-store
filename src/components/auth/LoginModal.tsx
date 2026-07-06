"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import {
  otpRequestSchema,
  otpVerifySchema,
  passwordLoginSchema,
  registerSchema,
  type OtpRequestValues,
  type OtpVerifyValues,
  type PasswordLoginValues,
  type RegisterValues,
} from "@/lib/schemas/auth";
import {
  loginWithPassword,
  registerWithPassword,
  requestOtp,
  verifyOtp,
} from "@/lib/actions/auth";
import { useModalStore } from "@/store/useModalStore";

type Tab = "otp" | "password";
type OtpStep = "email" | "code";
type PasswordMode = "login" | "register";

function OtpEmailStep({ onSent }: { onSent: (email: string) => void }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpRequestValues>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: OtpRequestValues) {
    setSubmitError(null);
    const result = await requestOtp(values);
    if (result.ok) {
      onSent(values.email);
      return;
    }
    setSubmitError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <Label htmlFor="login-otp-email">Correo electrónico</Label>
        <Input
          id="login-otp-email"
          type="email"
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>
      {submitError && <p className="text-sm text-destructive">{submitError}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? "Enviando…" : "Enviar código"}
      </Button>
    </form>
  );
}

function OtpCodeStep({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpVerifyValues>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { email, code: "" },
  });

  async function onSubmit(values: OtpVerifyValues) {
    setSubmitError(null);
    const result = await verifyOtp(values);
    if (result.ok) {
      onVerified();
      return;
    }
    setSubmitError(result.error);
  }

  async function handleResend() {
    setIsResending(true);
    setSubmitError(null);
    await requestOtp({ email });
    setIsResending(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="hidden" {...register("email")} />
      <p className="text-sm text-muted-foreground">
        Enviamos un código a <span className="font-medium text-foreground">{email}</span>.
      </p>
      <div>
        <Label htmlFor="login-otp-code">Código de 6 dígitos</Label>
        <Input
          id="login-otp-code"
          inputMode="numeric"
          maxLength={6}
          className="mt-1.5"
          aria-invalid={!!errors.code}
          {...register("code")}
        />
        {errors.code && <p className="mt-1 text-sm text-destructive">{errors.code.message}</p>}
      </div>
      {submitError && <p className="text-sm text-destructive">{submitError}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? "Verificando…" : "Verificar"}
      </Button>
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        >
          Cambiar correo
        </button>
        <Button type="button" variant="link" size="sm" disabled={isResending} onClick={handleResend}>
          {isResending ? "Enviando…" : "Reenviar código"}
        </Button>
      </div>
    </form>
  );
}

function PasswordStep({ onSuccess }: { onSuccess: () => void }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordLoginValues>({
    resolver: zodResolver(passwordLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: PasswordLoginValues) {
    setSubmitError(null);
    const result = await loginWithPassword(values);
    if (result.ok) {
      onSuccess();
      return;
    }
    setSubmitError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <Label htmlFor="login-password-email">Correo electrónico</Label>
        <Input
          id="login-password-email"
          type="email"
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="login-password-password">Contraseña</Label>
        <Input
          id="login-password-password"
          type="password"
          className="mt-1.5"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      {submitError && <p className="text-sm text-destructive">{submitError}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
      </Button>
    </form>
  );
}

function RegisterStep({ onSuccess }: { onSuccess: () => void }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterValues) {
    setSubmitError(null);
    const result = await registerWithPassword(values);
    if (result.ok) {
      onSuccess();
      return;
    }
    setSubmitError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <Label htmlFor="register-email">Correo electrónico</Label>
        <Input
          id="register-email"
          type="email"
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="register-password">Contraseña</Label>
        <Input
          id="register-password"
          type="password"
          className="mt-1.5"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
        <Input
          id="register-confirm-password"
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
        {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
    </form>
  );
}

export function LoginModal() {
  const activeModal = useModalStore((state) => state.activeModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState<Tab>("otp");
  const [otpStep, setOtpStep] = useState<OtpStep>("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [passwordMode, setPasswordMode] = useState<PasswordMode>("login");

  const open = activeModal === "login";

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    closeModal();
    setOtpStep("email");
    setOtpEmail("");
    setPasswordMode("login");

    if (pathname === "/checkout") {
      // A soft `router.refresh()` re-runs Server Components but has been
      // unreliable at picking up the just-set session cookie on this page
      // (the checkout prefill silently stayed empty). A full reload is a
      // fresh request end-to-end — identical to arriving at /checkout
      // already logged in, which is confirmed to prefill correctly.
      window.location.reload();
      return;
    }

    // Re-runs the current page's Server Components elsewhere (e.g. account
    // page, navbar user state) without a full reload.
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inicia sesión</DialogTitle>
          <DialogDescription>
            Accede con un código por correo o con tu contraseña.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 inline-flex gap-1 rounded-full bg-secondary/40 p-1">
          <Button
            type="button"
            size="sm"
            variant={tab === "otp" ? "default" : "ghost"}
            onClick={() => setTab("otp")}
          >
            Código por correo
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tab === "password" ? "default" : "ghost"}
            onClick={() => setTab("password")}
          >
            Contraseña
          </Button>
        </div>

        {tab === "otp" ? (
          otpStep === "email" ? (
            <OtpEmailStep
              onSent={(email) => {
                setOtpEmail(email);
                setOtpStep("code");
              }}
            />
          ) : (
            <OtpCodeStep
              email={otpEmail}
              onVerified={handleSuccess}
              onBack={() => setOtpStep("email")}
            />
          )
        ) : (
          <>
            {passwordMode === "login" ? (
              <PasswordStep onSuccess={handleSuccess} />
            ) : (
              <RegisterStep onSuccess={handleSuccess} />
            )}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {passwordMode === "login" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => setPasswordMode("register")}
                    className="cursor-pointer font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    Crea una
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => setPasswordMode("login")}
                    className="cursor-pointer font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
