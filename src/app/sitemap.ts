// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lieferdienst-bio.de";
  const now = new Date().toISOString();
  const slugs = await getGuideSlugs(200).catch(() => []);
  const guides = slugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/guides`, lastModified: now, priority: 0.8 },
    ...guides,
  ];
}
