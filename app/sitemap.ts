import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredOrigin) return [];

  let origin: URL;
  try {
    origin = new URL(configuredOrigin);
  } catch {
    return [];
  }

  if (origin.protocol !== "https:" && origin.hostname !== "localhost") return [];

  const base = origin.origin;
  return [
    { url: base + "/", changeFrequency: "weekly", priority: 1 },
    { url: base + "/privacy", changeFrequency: "yearly", priority: 0.3 }
  ];
}
