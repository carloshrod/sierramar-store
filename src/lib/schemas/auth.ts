import { z } from "zod";

export const otpRequestSchema = z.object({
  email: z.email("Ingresa un correo válido"),
});
export type OtpRequestValues = z.infer<typeof otpRequestSchema>;

export const otpVerifySchema = z.object({
  email: z.email("Ingresa un correo válido"),
  code: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d{6}$/, "Solo números"),
});
export type OtpVerifyValues = z.infer<typeof otpVerifySchema>;

export const passwordLoginSchema = z.object({
  email: z.email("Ingresa un correo válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
export type PasswordLoginValues = z.infer<typeof passwordLoginSchema>;

export const registerSchema = z
  .object({
    email: z.email("Ingresa un correo válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const setPasswordSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export type SetPasswordValues = z.infer<typeof setPasswordSchema>;
