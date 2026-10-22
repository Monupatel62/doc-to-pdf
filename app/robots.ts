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
      // Do not publish a malformed sitemap URL when deployment config is missing or invalid.
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    ...(sitemap ? { sitemap } : {})
  };
}
