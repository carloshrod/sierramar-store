import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Placeholder images used by the sample seed data
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
