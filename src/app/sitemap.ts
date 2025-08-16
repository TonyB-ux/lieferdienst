// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de";

  // Optional: dynamisch die Lieferdienst-Slugs beziehen
  try {
    const res = await fetch(`${base}/api/slugs`, { next: { revalidate: 60 } });
    const json = await res.json().catch(() => ({}));
    const slugs: string[] = Array.isArray(json?.slugs) ? json.slugs : [];

    const items: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${base}/lieferdienste/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/lieferdienste`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
      ...items,
    ];
  } catch {
    // Fallback: nur die statischen Seiten, damit es nie 404 gibt
    return [
      { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/lieferdienste`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ];
  }
}
