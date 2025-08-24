// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchGuideSlugs } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lieferdienst-bio.de"; // ggf. für Preview anpassen
  let slugs: string[] = [];
  try {
    slugs = await fetchGuideSlugs();
  } catch {
    slugs = [];
  }

  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/guides`, lastModified: now },
    ...slugs.map((s) => ({
      url: `${base}/guides/${s}`,
      changeFrequency: "weekly",
    })),
  ];
}
