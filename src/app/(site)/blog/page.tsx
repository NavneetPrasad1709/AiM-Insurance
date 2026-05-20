import type { Metadata } from "next";
import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { postsQuery, featuredPostsQuery } from "@/lib/sanity/queries";
import { mockPosts } from "@/data/mock-posts";
import type { PostCardData } from "@/components/blog/post-card";
import { BlogIndexClient } from "./blog-index-client";
import { SITE_CONFIG } from "@/lib/constants";
import {
  AuroraStrands,
  GoldParticleField,
  GrainTexture,
  CornerOrnament,
  SectionDividerArc,
} from "@/components/illustrations/ambience";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyAimCream } from "@/components/sections/why-aim-cream";
import {
  StructuredData,
  breadcrumbSchema,
} from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "AiM Insurance Blog — Tips, News & Savings Guides",
  description:
    "Insurance tips, savings stories, and industry analysis from the negotiation team at AiM Insurance.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AiM Insurance Blog — Tips, News & Savings Guides",
    description:
      "Insurance tips, savings stories, and industry analysis from the negotiation team at AiM Insurance.",
    url: `${SITE_CONFIG.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiM Insurance Blog — Tips, News & Savings Guides",
    description:
      "Insurance tips, savings stories, and industry analysis from the negotiation team at AiM Insurance.",
  },
};

import type { SanityImage } from "@/types";

interface SanityListPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: SanityImage;
  category?: { title?: string };
  author?: { name?: string };
  readingTime?: number;
}

const VALID_CATEGORIES = new Set([
  "Insurance Tips",
  "Savings Stories",
  "Guides",
  "Industry News",
]);

function mapCategory(raw: string | undefined): PostCardData["category"] {
  if (raw && VALID_CATEGORIES.has(raw)) return raw as PostCardData["category"];
  return "Guides";
}

function normalizeSanityPost(p: SanityListPost): PostCardData | null {
  if (!p.slug || !p.title) return null;
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    category: mapCategory(p.category?.title),
    author: p.author?.name ?? "AiM Team",
    publishedAt: p.publishedAt ?? new Date().toISOString(),
    readingTime: p.readingTime ?? 5,
    mainImage: p.mainImage ?? null,
  };
}

async function loadPosts(): Promise<{
  posts: PostCardData[];
  featured: PostCardData[];
}> {
  if (isSanityConfigured()) {
    try {
      const [allRaw, featRaw] = await Promise.all([
        sanityClient.fetch<SanityListPost[]>(postsQuery),
        sanityClient.fetch<SanityListPost[]>(featuredPostsQuery),
      ]);
      const posts = (allRaw ?? [])
        .map(normalizeSanityPost)
        .filter((p): p is PostCardData => p !== null);
      const featured = (featRaw ?? [])
        .map(normalizeSanityPost)
        .filter((p): p is PostCardData => p !== null);
      if (posts.length > 0) return { posts, featured: featured.length ? featured : posts.slice(0, 3) };
    } catch {
      // Fall through to mock data
    }
  }

  const posts: PostCardData[] = mockPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author.name,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
  }));
  return { posts, featured: posts.slice(0, 3) };
}

export default async function BlogPage() {
  const { posts, featured } = await loadPosts();

  const ld = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <StructuredData data={ld} />
      <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-32 sm:pb-20">
        {/* Ambient SVG layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <AuroraStrands opacity={0.35} />
          <GoldParticleField density={28} opacity={0.45} />
          <div className="absolute inset-x-0 -top-24 h-[420px] bg-gradient-blob opacity-70 blur-3xl" />
          <GrainTexture opacity={0.06} />
        </div>
        <CornerOrnament position="tl" size={140} opacity={0.35} />
        <CornerOrnament position="tr" size={140} opacity={0.35} />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-cta">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
            </span>
            The AiM Blog
          </span>
          <h1
            className="mt-5 font-heading font-extrabold text-white tracking-[-0.04em] leading-[0.98]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)" }}
          >
            Tips, stories, and{" "}
            <span className="text-cta">savings playbooks</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed">
            Notes from the negotiation desk — what works, what carriers
            won&rsquo;t tell you, and how to actually pay less for the same
            coverage.
          </p>
        </div>

        {/* Trust signals — Newswire-led */}
        <div className="relative mx-auto mt-12 max-w-5xl px-5 sm:px-8">
          <TrustStrip variant="full" />
        </div>
      </section>

      <section className="relative bg-background pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
        >
          <SectionDividerArc />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-40 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.10), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <BlogIndexClient posts={posts} featured={featured} />
        </div>
      </section>

      <WhyAimCream
        heading="Reading is great. Saving is better."
        intro="Same content carriers don't want you to know — but the real magic is letting AiM run the negotiation for you. 1000+ clients. Average savings: $1,247 a year."
      />
    </>
  );
}
