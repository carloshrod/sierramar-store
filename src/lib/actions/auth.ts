"use server";

import { cookies } from "next/headers";
import { STRAPI_URL } from "@/lib/constants";
import { SESSION_COOKIE, getSessionToken } from "@/lib/api/userClient";
import {
  otpRequestSchema,
  otpVerifySchema,
  passwordLoginSchema,
  registerSchema,
  setPasswordSchema,
  type OtpRequestValues,
  type OtpVerifyValues,
  type PasswordLoginValues,
  type RegisterValues,
  type SetPasswordValues,
} from "@/lib/schemas/auth";
import type { AuthResponse } from "@/lib/types/user";

export type AuthActionResult = { ok: true } | { ok: false; error: string };

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

async function setSessionCookie(jwt: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

// Strapi's built-in users-permissions endpoints (/api/auth/local,
// /api/auth/local/register) throw their own hardcoded English messages —
// our custom endpoints (otp, account/set-password) are already in Spanish
// and don't need this. Anything not in this map falls back to a generic
// Spanish message rather than ever showing raw English in the UI.
const STRAPI_BUILTIN_ERROR_TRANSLATIONS: Record<string, string> = {
  "Invalid identifier or password": "Correo o contraseña incorrectos.",
  "Your account has been blocked by an administrator": "Tu cuenta fue bloqueada por un administrador.",
  "Your account email is not confirmed": "Tu correo todavía no ha sido confirmado.",
  "Email or Username are already taken": "Ya existe una cuenta con ese correo.",
  "This provider is disabled": "Este método de acceso no está disponible.",
  "Register action is currently disabled": "El registro no está disponible en este momento.",
};

function translateBuiltinAuthError(cause: unknown, fallback: string): string {
  const message = cause instanceof Error ? cause.message : undefined;
  return (message && STRAPI_BUILTIN_ERROR_TRANSLATIONS[message]) ?? fallback;
}

async function postAuth(path: string, body: unknown, authToken?: string): Promise<AuthResponse> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const parsed = await res.json().catch(() => null);
    throw new Error(parsed?.error?.message ?? "No se pudo completar la solicitud.");
  }

  return res.json() as Promise<AuthResponse>;
}

export async function requestOtp(values: OtpRequestValues): Promise<AuthActionResult> {
  const parsed = otpRequestSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Ingresa un correo válido." };
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/otp/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error?.message ?? "No se pudo enviar el código.");
    }
    return { ok: true };
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : "No se pudo enviar el código.",
    };
  }
}

export async function verifyOtp(values: OtpVerifyValues): Promise<AuthActionResult> {
  const parsed = otpVerifySchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Revisa el código ingresado." };
  }

  try {
    const { jwt } = await postAuth("/api/otp/verify", parsed.data);
    await setSessionCookie(jwt);
    return { ok: true };
  } catch (cause) {
    return { ok: false, error: cause instanceof Error ? cause.message : "Código inválido." };
  }
}

export async function loginWithPassword(values: PasswordLoginValues): Promise<AuthActionResult> {
  const parsed = passwordLoginSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Revisa tu correo y contraseña." };
  }

  try {
    const { jwt } = await postAuth("/api/auth/local", {
      identifier: parsed.data.email,
      password: parsed.data.password,
    });
    await setSessionCookie(jwt);
    return { ok: true };
  } catch (cause) {
    return {
      ok: false,
      error: translateBuiltinAuthError(cause, "No se pudo iniciar sesión."),
    };
  }
}

export async function registerWithPassword(values: RegisterValues): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa los datos." };
  }

  let jwt: string;
  try {
    const result = await postAuth("/api/auth/local/register", {
      username: parsed.data.email,
      email: parsed.data.email,
      password: parsed.data.password,
    });
    jwt = result.jwt;
  } catch (cause) {
    return {
      ok: false,
      error: translateBuiltinAuthError(cause, "No se pudo crear la cuenta."),
    };
  }

  try {
    // Brand-new accounts always start with hasPassword=false, so this is the
    // same endpoint the account page uses to *set* a password (no
    // currentPassword needed) — it also flips hasPassword to true.
    const { jwt: finalJwt } = await postAuth(
      "/api/account/set-password",
      { newPassword: parsed.data.password },
      jwt,
    );
    await setSessionCookie(finalJwt);
    return { ok: true };
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : "No se pudo crear la cuenta.",
    };
  }
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export type SetPasswordResult =
  | { ok: true; loggedOut: boolean }
  | { ok: false; error: string };

export async function setOrChangePassword(values: SetPasswordValues): Promise<SetPasswordResult> {
  const parsed = setPasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa los datos." };
  }

  const token = await getSessionToken();
  if (!token) {
    return { ok: false, error: "Tu sesión expiró. Vuelve a iniciar sesión." };
  }

  // currentPassword is only sent when the account already had a password
  // (the form doesn't render that field for a first-time set) — that's an
  // actual password change, which should force re-authentication.
  const isPasswordChange = Boolean(parsed.data.currentPassword);

  try {
    const { jwt } = await postAuth(
      "/api/account/set-password",
      { currentPassword: parsed.data.currentPassword, newPassword: parsed.data.newPassword },
      token,
    );

    if (isPasswordChange) {
      const store = await cookies();
      store.delete(SESSION_COOKIE);
      return { ok: true, loggedOut: true };
    }

    await setSessionCookie(jwt);
    return { ok: true, loggedOut: false };
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : "No se pudo guardar la contraseña.",
    };
  }
}
