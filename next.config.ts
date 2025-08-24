// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👉 falls du bereits Optionen hattest (redirects, headers, experimental, etc.),
  //    einfach hier hinein mergen – aber KEIN weiterer "export default" mehr unten!
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dein-wordpress.example", // <-- an deine WP-Domain anpassen
        pathname: "/**",
      },
    ],
  },
  // z.B.:
  // reactStrictMode: true,
  // eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
