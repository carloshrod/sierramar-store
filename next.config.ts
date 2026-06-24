import type { NextConfig } from "next";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
