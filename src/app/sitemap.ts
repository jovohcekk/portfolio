import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
