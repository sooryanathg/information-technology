import type { MetadataRoute } from "next";

// Production site URL (can be overridden via NEXT_PUBLIC_SITE_URL environment variable)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://information-technology-gamma.vercel.app";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
