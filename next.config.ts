// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Verhindert, dass Vercel den Build wegen ESLint-Fehlern stoppt
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // falls du später next/image verwendest
      { protocol: "https", hostname: "lieferdienst-bio.de", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "*.lieferdienst-bio.de", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
