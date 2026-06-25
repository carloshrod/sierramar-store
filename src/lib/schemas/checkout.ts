import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(1, "Ingresa tu nombre completo"),
  customerEmail: z.email("Ingresa un correo válido"),
  customerPhone: z.string().min(1, "Ingresa un número de contacto"),
  shippingAddress: z.object({
    fullName: z.string().min(1, "Ingresa el nombre del destinatario"),
    line1: z.string().min(1, "Ingresa la dirección"),
    line2: z.string().optional(),
    city: z.string().min(1, "Ingresa la ciudad"),
    state: z.string().optional(),
    postalCode: z.string().min(1, "Ingresa el código postal"),
    country: z.string().min(1, "Ingresa el país"),
    phone: z.string().optional(),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
