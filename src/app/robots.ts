// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // API nicht indexieren
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
