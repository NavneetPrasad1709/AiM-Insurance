import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url).replace(
  /\/$/,
  "",
);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
