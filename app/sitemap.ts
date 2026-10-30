import type { MetadataRoute } from "next";
export const dynamic = "force-dynamic";
export default function sitemap(): MetadataRoute.Sitemap {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredOrigin) return [];
  let origin: URL;
  try { origin = new URL(configuredOrigin); } catch { return []; }
  if (origin.protocol !== "https:" && origin.hostname !== "localhost") return [];
  const base = origin.origin;
  const articleSlugs = [
  "convert-word-to-pdf-without-losing-formatting",
  "why-pdf-is-useful-for-business-documents",
  "convert-doc-to-pdf-on-mobile",
  "data-privacy-in-online-file-converters",
  "fix-word-to-pdf-formatting-issues"
];
  return [
    { url: base + "/", changeFrequency: "weekly", priority: 1 },
    { url: base + "/doc-to-pdf", changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/docx-to-pdf", changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/blog", changeFrequency: "weekly", priority: 0.7 },
    ...articleSlugs.map(slug => ({ url: base + "/blog/" + slug, changeFrequency: "monthly" as const, priority: 0.65 })),
    { url: base + "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: base + "/terms", changeFrequency: "yearly", priority: 0.3 },
    { url: base + "/about", changeFrequency: "yearly", priority: 0.3 }
  ];
}
