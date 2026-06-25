import type { NextConfig } from "next";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
);

const appUrl = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : null;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Next.js blocks cross-origin requests to dev-only assets (_next/*, HMR)
  // by default. When NEXT_PUBLIC_APP_URL points at a tunnel (ngrok) instead
  // of localhost — needed to test MercadoPago's auto_return/webhook — that
  // host has to be allowlisted or the page never hydrates client-side.
  allowedDevOrigins: appUrl && appUrl.hostname !== "localhost" ? [appUrl.hostname] : undefined,
  images: {
    remotePatterns: [
      // Product/category media served by the Strapi CMS
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
      },
    ],
    // Strapi runs on localhost in dev; in production NEXT_PUBLIC_STRAPI_URL
    // points at a real public host, so this stays off there.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
