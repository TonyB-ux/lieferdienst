
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cms.lieferdienst-bio.de"], // + ggf. "i0.wp.com", "i1.wp.com", "i2.wp.com"
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;