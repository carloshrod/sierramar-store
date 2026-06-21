"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleCheck, Loader2, Mail } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  newsletterSchema,
  type NewsletterValues,
} from "@/lib/schemas/newsletter";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  function onSubmit() {
    // TODO: conectar a un endpoint real de suscripción cuando exista.
    setSubmitted(true);
    reset();
  }

  return (
    <Section tone="dark" className="py-16 sm:py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <Mail strokeWidth={1.25} className="size-8 text-background/50" />

        <div className="max-w-md space-y-2">
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Sé de los primeros en probarlo
          </h2>
          <p className="text-background/70">
            Antes de abrir la tienda, compartimos lotes limitados, notas de cata
            y acceso anticipado a nuestras suscripciones con quienes se suman
            aquí.
          </p>
        </div>

        {submitted ? (
          <p className="flex items-center gap-2 text-sm font-medium animate-in fade-in zoom-in-95 duration-300">
            <CircleCheck className="size-4 text-background/80" />
            Gracias por sumarte. Te avisaremos antes que a nadie.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="w-full max-w-md"
          >
            <Label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="tu@correo.com"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "newsletter-email-error" : undefined
                }
                className="h-12 w-full min-w-0 rounded-full bg-background px-5 text-foreground placeholder:text-muted-foreground sm:flex-1"
                {...register("email")}
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                disabled={isSubmitting}
                className="shrink-0"
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                {isSubmitting ? "Enviando…" : "Suscribirme"}
              </Button>
            </div>
            {errors.email ? (
              <p
                id="newsletter-email-error"
                className="mt-2 text-sm text-background/80"
              >
                {errors.email.message}
              </p>
            ) : (
              <p className="mt-3 text-xs text-background/50">
                Sin spam. Un correo ocasional, cancelable cuando quieras.
              </p>
            )}
          </form>
        )}
      </div>
    </Section>
  );
}
