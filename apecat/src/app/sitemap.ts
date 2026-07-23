import type { MetadataRoute } from "next";
import { SITE } from "@/config/apecat";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${SITE.domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
