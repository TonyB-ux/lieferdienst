// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // verhinder Build-Abbruch durch ESLint-Fehler auf Vercel
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lieferdienst-bio.de", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "*.lieferdienst-bio.de", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;

export default {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dein-wordpress.example", pathname: "/**" },
    ],
  },
};