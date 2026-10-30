import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  let sitemap: string | undefined;

  if (configuredOrigin) {
    try {
      const origin = new URL(configuredOrigin);
      if (origin.protocol === "https:" || origin.hostname === "localhost") {
        sitemap = new URL("/sitemap.xml", origin).toString();
      }
    } catch {
      // Avoid publishing an invalid sitemap URL when deployment configuration is missing.
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private processing/API endpoints out of search results and crawl queues.
      disallow: ["/api/"]
    },
    ...(sitemap ? { sitemap } : {})
  };
}
