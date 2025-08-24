// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchGuideSlugs } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lieferdienst-bio.de"; // ggf. für Preview anpassen
  const now = new Date();

  let slugs: string[] = [];
  try {
    slugs = await fetchGuideSlugs();
  } catch {
    slugs = [];
  }

  const dynamicItems: MetadataRoute.Sitemap = slugs.map<MetadataRoute.Sitemap[number]>(
    (s) => ({
      url: `${base}/guides/${s}`,
      changeFrequency: "weekly", // ← Literal bleibt "weekly", nicht string
      lastModified: now,
    })
  );

  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/guides`, lastModified: now },
    ...dynamicItems,
  ];

  return items;
}
