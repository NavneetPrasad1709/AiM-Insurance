import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

/**
 * Renders one or more JSON-LD scripts. Pass any schema-shaped object(s).
 * Safe to render in server components.
 */
interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function StructuredData({ data }: StructuredDataProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Schema generators — pure functions, easy to test, easy to reuse.
   ────────────────────────────────────────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand/aim-logo.webp`,
    description: SITE_CONFIG.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "customer service",
      areaServed: ["US", "CA", "AE"],
      availableLanguage: ["English"],
    },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand/aim-logo.webp`,
    image: `${SITE_CONFIG.url}/brand/aim-logo.webp`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$",
    areaServed: ["United States", "Canada", "United Arab Emirates"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "127",
    },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

interface ServiceSchemaInput {
  name: string;
  slug: string;
  description: string;
}

export function serviceSchema({ name, slug, description }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${SITE_CONFIG.url}/${slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: ["United States", "Canada", "United Arab Emirates"],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: "Free insurance audit and negotiation. $0 if no savings.",
    },
  };
}

interface ArticleSchemaInput {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  tags?: string[];
  image?: string;
}

export function articleSchema({
  title,
  slug,
  excerpt,
  publishedAt,
  authorName,
  tags,
  image,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/brand/aim-logo.webp`,
      },
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${slug}`,
    image: image ?? `${SITE_CONFIG.url}/brand/aim-logo.webp`,
    keywords: tags?.join(", "),
  };
}

interface FaqSchemaInput {
  qas: Array<{ question: string; answer: string }>;
}

export function faqSchema({ qas }: FaqSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
