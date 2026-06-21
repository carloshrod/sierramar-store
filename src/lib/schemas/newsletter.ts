import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Ingresa un correo válido"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
