import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { AboutValues } from "@/components/sections/about-values";
import { AboutDifferent } from "@/components/sections/about-different";
import { AboutStats } from "@/components/sections/about-stats";
import { MediaFeatures } from "@/components/sections/media-features";
import { AboutCta } from "@/components/sections/about-cta";
import { SITE_CONFIG } from "@/lib/constants";
import {
  StructuredData,
  organizationSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "About AiM Insurance — Expert Insurance Negotiators",
  description:
    "Founded by Neel Mehta of Car Concierge Pro, AiM Insurance negotiates lower premiums on car, home, boat, yacht and jet insurance — same coverage, lower cost.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AiM Insurance — Expert Insurance Negotiators",
    description:
      "We don't sell insurance. We negotiate what's best for you. 1000+ clients across the US, Canada and UAE — averaging $1,200+ in annual savings.",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About AiM Insurance — Expert Insurance Negotiators",
    description:
      "We don't sell insurance. We negotiate what's best for you.",
  },
};

export default function AboutPage() {
  const ld = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ]),
  ];

  return (
    <>
      <StructuredData data={ld} />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutDifferent />
      <AboutStats />
      <MediaFeatures />
      <AboutCta />
    </>
  );
}
