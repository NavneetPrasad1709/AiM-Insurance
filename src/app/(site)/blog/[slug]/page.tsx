import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import type { SanityImage } from "@/types";
import {
  postBySlugQuery,
  relatedPostsQuery,
  postSlugsQuery,
} from "@/lib/sanity/queries";
import {
  mockPosts,
  getRelatedMockPosts,
  type MockPost,
} from "@/data/mock-posts";
import { PostContent, extractHeadings } from "@/components/blog/post-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SocialShare } from "@/components/blog/social-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { PostHeroArtwork } from "@/components/blog/post-hero-artwork";
import type { PostCardData } from "@/components/blog/post-card";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import {
  GoldParticleField,
  AuroraStrands,
  GrainTexture,
  CornerOrnament,
  SectionDividerArc,
} from "@/components/illustrations/ambience";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyAimCream } from "@/components/sections/why-aim-cream";
import {
  StructuredData,
  articleSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";
import { ICONS } from "@/lib/icons";
import { SITE_CONFIG } from "@/lib/constants";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ResolvedPost {
  title: string;
  slug: string;
  excerpt: string;
  category: MockPost["category"];
  author: { name: string; role: string; bio: string };
  publishedAt: string;
  readingTime: number;
  tags: string[];
  body: string | unknown[];
  mainImage?: SanityImage | null;
}

interface SanityFullPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  body: unknown[];
  tags?: string[];
  mainImage?: SanityImage;
  category?: { title?: string };
  author?: { name?: string; role?: string; bio?: string };
  readingTime?: number;
  seo?: { title?: string; description?: string };
  _id: string;
}

interface SanityRelated {
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

function mapCategory(raw: string | undefined): MockPost["category"] {
  if (raw && VALID_CATEGORIES.has(raw)) return raw as MockPost["category"];
  return "Guides";
}

async function getPost(slug: string): Promise<ResolvedPost | null> {
  if (isSanityConfigured()) {
    try {
      const sp = await sanityClient.fetch<SanityFullPost | null>(
        postBySlugQuery,
        { slug },
      );
      if (sp && sp.title) {
        return {
          title: sp.title,
          slug: sp.slug,
          excerpt: sp.excerpt ?? "",
          category: mapCategory(sp.category?.title),
          author: {
            name: sp.author?.name ?? "AiM Team",
            role: sp.author?.role ?? "Insurance Negotiator",
            bio: sp.author?.bio ?? "",
          },
          publishedAt: sp.publishedAt,
          readingTime: sp.readingTime ?? 5,
          tags: sp.tags ?? [],
          body: sp.body ?? [],
          mainImage: sp.mainImage ?? null,
        };
      }
    } catch {
      // fall through
    }
  }

  const m = mockPosts.find((p) => p.slug === slug);
  if (!m) return null;
  return {
    title: m.title,
    slug: m.slug,
    excerpt: m.excerpt,
    category: m.category,
    author: m.author,
    publishedAt: m.publishedAt,
    readingTime: m.readingTime,
    tags: m.tags,
    body: m.content,
  };
}

async function getRelated(slug: string): Promise<PostCardData[]> {
  if (isSanityConfigured()) {
    try {
      const rs = await sanityClient.fetch<SanityRelated[]>(relatedPostsQuery, {
        slug,
        categoryIds: [],
      });
      const mapped = (rs ?? [])
        .filter((p) => p.slug && p.title)
        .map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt ?? "",
          category: mapCategory(p.category?.title),
          author: p.author?.name ?? "AiM Team",
          publishedAt: p.publishedAt,
          readingTime: p.readingTime ?? 5,
          mainImage: p.mainImage ?? null,
        }));
      if (mapped.length) return mapped;
    } catch {
      // fall through to mock
    }
  }

  const related = getRelatedMockPosts(slug);
  return related.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author.name,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
  }));
}

export async function generateStaticParams() {
  if (isSanityConfigured()) {
    try {
      const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
      if (slugs && slugs.length) {
        return slugs.filter(Boolean).map((slug) => ({ slug }));
      }
    } catch {
      // fall through to mock
    }
  }
  return mockPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const related = await getRelated(slug);

  const ld = [
    articleSchema({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      authorName: post.author.name,
      tags: post.tags,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <article className="relative bg-background">
      <ScrollProgress />

      <StructuredData data={ld} />

      {/* Page-level ambient layer */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
        <AuroraStrands opacity={0.22} />
        <GoldParticleField density={20} opacity={0.4} />
        <div className="absolute left-1/2 -top-32 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-blob opacity-70 blur-3xl" />
        <GrainTexture opacity={0.05} />
      </div>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
          <li>
            <Link
              href="/"
              className="hover:text-cta transition-colors"
            >
              Home
            </Link>
          </li>
          <ICONS.ChevronRight className="size-3" aria-hidden />
          <li>
            <Link
              href="/blog"
              className="hover:text-cta transition-colors"
            >
              Blog
            </Link>
          </li>
          <ICONS.ChevronRight className="size-3" aria-hidden />
          <li className="line-clamp-1 max-w-[18rem] text-text-secondary">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="relative mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-cta-light px-3 py-1 text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-cta">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
          </span>
          {post.category}
        </span>
        <h1
          className="mt-5 font-heading font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
        >
          {post.title}
        </h1>
        <p className="mt-5 text-xl text-text-secondary leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-text-muted">
          <span className="font-heading font-semibold text-text-secondary">
            {post.author.name}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <ICONS.Clock className="size-3.5" aria-hidden />
            {post.readingTime} min read
          </span>
        </div>
      </header>

      {/* Featured artwork */}
      <div className="relative mx-auto mt-10 max-w-5xl px-5 sm:px-8">
        <PostHeroArtwork
          category={post.category}
          mainImage={post.mainImage}
          title={post.title}
        />
      </div>

      {/* Trust signals — Newswire-led, compact under hero */}
      <div className="relative mx-auto mt-8 max-w-5xl px-5 sm:px-8">
        <TrustStrip variant="compact" />
      </div>

      {/* Body + TOC */}
      <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <CornerOrnament position="tl" size={120} opacity={0.2} className="hidden lg:block" />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <PostContent content={post.body} />

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                <span className="mr-2 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Tags
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10">
              <SocialShare url={`/blog/${post.slug}`} title={post.title} />
            </div>

            {/* Author card — cream block on dark page for warmth */}
            <aside className="mt-12 overflow-hidden rounded-2xl border border-[#0a0a0a]/10 bg-[#fbfaf5] p-6 shadow-[0_20px_60px_-30px_rgba(255,200,61,0.35)]">
              <div className="flex items-start gap-4">
                <div
                  aria-hidden
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-[#fff5d4] text-lg font-heading font-bold text-[#0a0a0a] ring-2 ring-[#ffc83d]/40"
                >
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading font-bold text-[#0a0a0a]">
                    {post.author.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-[#5a5a64]">
                    {post.author.role}
                  </p>
                  {post.author.bio && (
                    <p className="mt-2 text-base text-[#3a3a44] leading-[1.6]">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </aside>

            <SectionDividerArc className="mt-16" />

            <RelatedPosts posts={related} />

            {/* CTA banner */}
            <aside className="relative mt-16 overflow-hidden rounded-2xl border border-cta/30 bg-cta p-8 text-background sm:p-10">
              {/* Decorative starburst */}
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-25"
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * Math.PI * 2) / 12;
                  const x1 = 100 + Math.cos(angle) * 30;
                  const y1 = 100 + Math.sin(angle) * 30;
                  const x2 = 100 + Math.cos(angle) * 90;
                  const y2 = 100 + Math.sin(angle) * 90;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#0a0a0a"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="22" fill="none" stroke="#0a0a0a" strokeWidth="1.4" />
              </svg>

              <div className="relative">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
                  Stop overpaying
                </p>
                <h3
                  className="mt-3 font-heading font-extrabold tracking-[-0.02em] leading-[1.05] text-background"
                  style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)" }}
                >
                  Get your free insurance quote
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-background/80">
                  We negotiate with carriers on your behalf — same coverage,
                  lower premium. Average client saves $1,200 a year.
                </p>
                <Link
                  href="/contact?intent=quote"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-heading font-semibold text-cta transition-transform hover:-translate-y-0.5"
                >
                  Start my quote
                  <ICONS.ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </aside>
          </div>

          {/* TOC sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>

      {/* Full-width cream block — Why AiM */}
      <WhyAimCream
        heading="You read the article. Now save the money."
        intro="Every story above has a fix. AiM is the fix. Send us your declarations page and we'll show you exactly what you can save — same coverage, lower premium."
      />
    </article>
  );
}
