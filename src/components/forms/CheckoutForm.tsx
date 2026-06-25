"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas/checkout";
import { submitCheckout } from "@/lib/actions/checkout";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/useCartStore";

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: {
        fullName: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Colombia",
        phone: "",
      },
    },
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitError(null);
    const result = await submitCheckout(values, items);
    if (result.ok) {
      window.location.assign(result.redirectUrl);
      return;
    }
    setSubmitError(result.error);
  }

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Tu carrito está vacío.</p>
        <Link href="/store" className={buttonVariants({ className: "mt-6" })}>
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12"
    >
      <div className="space-y-6">
        <fieldset className="space-y-5 rounded-3xl bg-background p-6 ring-1 ring-border/60 sm:p-8">
          <legend className="flex items-center gap-3 font-serif text-xl tracking-tight">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-primary-foreground">
              1
            </span>
            Contacto
          </legend>
          <div className="space-y-2">
            <Label htmlFor="customerName">Nombre completo</Label>
            <Input
              id="customerName"
              aria-invalid={!!errors.customerName}
              {...register("customerName")}
            />
            {errors.customerName && (
              <p className="text-sm text-destructive">{errors.customerName.message}</p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Correo electrónico</Label>
              <Input
                id="customerEmail"
                type="email"
                aria-invalid={!!errors.customerEmail}
                {...register("customerEmail")}
              />
              {errors.customerEmail && (
                <p className="text-sm text-destructive">{errors.customerEmail.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Teléfono</Label>
              <Input
                id="customerPhone"
                aria-invalid={!!errors.customerPhone}
                {...register("customerPhone")}
              />
              {errors.customerPhone && (
                <p className="text-sm text-destructive">{errors.customerPhone.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-3xl bg-background p-6 ring-1 ring-border/60 sm:p-8">
          <legend className="flex items-center gap-3 font-serif text-xl tracking-tight">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-primary-foreground">
              2
            </span>
            Dirección de envío
          </legend>
          <div className="space-y-2">
            <Label htmlFor="shippingAddress.fullName">Nombre del destinatario</Label>
            <Input
              id="shippingAddress.fullName"
              aria-invalid={!!errors.shippingAddress?.fullName}
              {...register("shippingAddress.fullName")}
            />
            {errors.shippingAddress?.fullName && (
              <p className="text-sm text-destructive">
                {errors.shippingAddress.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingAddress.line1">Dirección</Label>
            <Input
              id="shippingAddress.line1"
              aria-invalid={!!errors.shippingAddress?.line1}
              {...register("shippingAddress.line1")}
            />
            {errors.shippingAddress?.line1 && (
              <p className="text-sm text-destructive">
                {errors.shippingAddress.line1.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingAddress.line2">Complemento (opcional)</Label>
            <Input id="shippingAddress.line2" {...register("shippingAddress.line2")} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shippingAddress.city">Ciudad</Label>
              <Input
                id="shippingAddress.city"
                aria-invalid={!!errors.shippingAddress?.city}
                {...register("shippingAddress.city")}
              />
              {errors.shippingAddress?.city && (
                <p className="text-sm text-destructive">
                  {errors.shippingAddress.city.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingAddress.state">Departamento (opcional)</Label>
              <Input id="shippingAddress.state" {...register("shippingAddress.state")} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shippingAddress.postalCode">Código postal</Label>
              <Input
                id="shippingAddress.postalCode"
                aria-invalid={!!errors.shippingAddress?.postalCode}
                {...register("shippingAddress.postalCode")}
              />
              {errors.shippingAddress?.postalCode && (
                <p className="text-sm text-destructive">
                  {errors.shippingAddress.postalCode.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingAddress.country">País</Label>
              <Input
                id="shippingAddress.country"
                aria-invalid={!!errors.shippingAddress?.country}
                {...register("shippingAddress.country")}
              />
              {errors.shippingAddress?.country && (
                <p className="text-sm text-destructive">
                  {errors.shippingAddress.country.message}
                </p>
              )}
            </div>
          </div>
        </fieldset>
      </div>

      <div className="h-fit rounded-3xl bg-secondary/30 p-6 ring-1 ring-border/60 sm:p-8 lg:sticky lg:top-24">
        <h2 className="font-serif text-xl tracking-tight">Resumen</h2>
        <Separator className="my-5" />
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.variantId} className="flex justify-between gap-2">
              <span className="text-muted-foreground">
                {item.name} ({item.grindType} {item.weight} g) × {item.quantity}
              </span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-5" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Envío gratis por ahora.</p>

        {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? "Redirigiendo…" : "Pagar con MercadoPago"}
        </Button>
      </div>
    </form>
  );
}
