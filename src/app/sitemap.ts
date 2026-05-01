import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { mockPosts } from "@/data/mock-posts";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url).replace(
  /\/$/,
  "",
);

interface StaticEntry {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}

const STATIC_ROUTES: StaticEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/car-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/home-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/boat-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/yacht-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/jet-insurance", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/calculator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/request-a-concierge", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogUrls: MetadataRoute.Sitemap = mockPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticUrls, ...blogUrls];
}
