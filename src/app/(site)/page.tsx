import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBanner } from "@/components/sections/trust-banner";
import { PainStats } from "@/components/sections/pain-stats";
import { CarrierSavings } from "@/components/sections/carrier-savings";
import { ServicesGrid } from "@/components/sections/services-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing-section";
import { Testimonials } from "@/components/sections/testimonials";
import { CalculatorPreview } from "@/components/sections/calculator-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SITE_CONFIG } from "@/lib/constants";
import {
  StructuredData,
  organizationSchema,
  websiteSchema,
  faqSchema,
} from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "AiM Insurance | Never Overpay Your Insurance Premiums",
  },
  description:
    "AiM Insurance connects you with expert negotiators who fight for the best deal to lower your monthly insurance premiums. Serving 800+ clients across USA, Canada & UAE.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AiM Insurance | Never Overpay Your Insurance Premiums",
    description:
      "Same coverage, lower premiums. AiM negotiates car, home, boat, yacht & jet insurance — averaging $1,200+ in annual savings per client.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiM Insurance | Never Overpay Your Insurance Premiums",
    description:
      "Same coverage, lower premiums. AiM negotiates car, home, boat, yacht & jet insurance.",
  },
};

export default function HomePage() {
  const ld = [
    organizationSchema(),
    websiteSchema(),
    faqSchema({
      qas: HOMEPAGE_FAQS.map((f) => ({
        question: f.q,
        answer: f.a,
      })),
    }),
  ];

  return (
    <>
      <StructuredData data={ld} />
      <Hero />
      <TrustBanner />
      <PainStats />
      <CarrierSavings />
      <ServicesGrid />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <CalculatorPreview />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
