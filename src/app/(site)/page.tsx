import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { TrustBanner } from "@/components/sections/trust-banner";
import { ServicesGrid } from "@/components/sections/services-grid";
import { RevealObserver } from "@/components/ui/reveal";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs";
import { SITE_CONFIG } from "@/lib/constants";
import {
  StructuredData,
  organizationSchema,
  websiteSchema,
  faqSchema,
} from "@/components/seo/structured-data";

// Below-fold sections: still SSR'd for SEO, but their client JS
// loads as separate async chunks so the homepage TTI/TBT stays low.
const CarrierSavings = dynamic(() =>
  import("@/components/sections/carrier-savings").then((m) => m.CarrierSavings),
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => m.HowItWorks),
);
const PricingCalculator = dynamic(() =>
  import("@/components/sections/pricing-calculator").then(
    (m) => m.PricingCalculator,
  ),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FaqSection),
);
const CtaBanner = dynamic(() =>
  import("@/components/sections/cta-banner").then((m) => m.CtaBanner),
);

export const metadata: Metadata = {
  title: {
    absolute: "AiM Insurance | Never Overpay Your Insurance Premiums",
  },
  description:
    "AiM Insurance connects you with expert negotiators who fight for the best deal to lower your monthly insurance premiums. Serving 1100+ clients across USA, Canada & UAE.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AiM Insurance | Never Overpay Your Insurance Premiums",
    description:
      "Same coverage, lower premiums. AiM negotiates car, home, boat, yacht & jet insurance, averaging $1,247+ in annual savings per client.",
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
      <RevealObserver />
      <StructuredData data={ld} />
      <Hero />
      <TrustBanner />
      <ServicesGrid />
      <CarrierSavings />
      <HowItWorks />
      <PricingCalculator />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
