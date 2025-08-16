import type { MetadataRoute } from "next";
import { fetchLieferbetriebSlugs } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.lieferdienst-bio.de"; // später deine echte Domain
  const slugs = await fetchLieferbetriebSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.7, lastModified: new Date() },
    { url: `${base}/lieferdienste`, changeFrequency: "daily", priority: 0.8, lastModified: new Date() },
  ];

  const detail: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/lieferdienste/${slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...detail];
}
