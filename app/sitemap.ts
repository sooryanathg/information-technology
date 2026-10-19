import type { MetadataRoute } from "next";

// Production site URL (can be overridden via NEXT_PUBLIC_SITE_URL environment variable)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://information-technology-gamma.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/placement`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
