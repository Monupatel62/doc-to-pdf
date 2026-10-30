import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const articleSlugs = [
  "convert-word-to-pdf-without-losing-formatting",
  "why-pdf-is-useful-for-business-documents",
  "convert-doc-to-pdf-on-mobile",
  "data-privacy-in-online-file-converters",
  "fix-word-to-pdf-formatting-issues"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;

  // Do not emit localhost, malformed, or non-HTTPS canonical URLs in production.
  if (!configuredOrigin) return [];

  let origin: URL;
  try {
    origin = new URL(configuredOrigin);
  } catch {
    return [];
  }

  if (origin.protocol !== "https:" && origin.hostname !== "localhost") return [];

  const base = origin.origin;
  const now = new Date();

  return [
    { url: base + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: base + "/doc-to-pdf", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/docx-to-pdf", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/blog", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...articleSlugs.map(slug => ({
      url: base + "/blog/" + slug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    { url: base + "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: base + "/terms", lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: base + "/about", lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];
}
