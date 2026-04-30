import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/car-insurance`;
const TITLE = "Car Insurance Negotiation — Save $1200+ Annually";
const DESCRIPTION =
  "AiM negotiates your car insurance rate with 50+ carriers — same coverage, average $1,200/year saved. Free audit. No obligation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/car-insurance" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Car Insurance Negotiation",
  serviceType: "Car Insurance Negotiation",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: ["United States", "Canada", "United Arab Emirates"],
  description: DESCRIPTION,
  url: PAGE_URL,
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Insurance Services",
      item: `${SITE_CONFIG.url}/#services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Car Insurance",
      item: PAGE_URL,
    },
  ],
};

export default function CarInsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <ServicePageTemplate
        serviceName="Car Insurance"
        serviceSlug="car-insurance"
        heroTitle="Drive premium coverage. Pay economy prices."
        heroDescription="AiM negotiates with 50+ carriers to drop your auto premium without trimming a single line of coverage. Average client saves $1,200 a year."
        stats={[
          { value: "600+", label: "Car clients" },
          { value: "$1,200", label: "Avg. annual savings" },
          { value: "30%", label: "Avg. premium reduction" },
        ]}
        benefits={[
          {
            icon: "TrendingUp",
            title: "Lower premiums, same risk profile",
            description:
              "We strip carrier markup, not coverage. Average client pockets $1,200/year for the exact same protection.",
          },
          {
            icon: "Shield",
            title: "Coverage stays bulletproof",
            description:
              "Liability limits, deductibles, comprehensive, collision — every line stays. We negotiate price, not safety.",
          },
          {
            icon: "BarChart3",
            title: "50+ carriers compared",
            description:
              "Geico, Progressive, State Farm, Allstate, Liberty Mutual and 45 more. We benchmark them all so you don’t have to.",
          },
          {
            icon: "Eye",
            title: "Ongoing rate monitoring",
            description:
              "Carriers raise rates quietly at renewal. We watch the market every quarter and flag the moment a better deal exists.",
          },
        ]}
        coverageTypes={[
          {
            title: "Bodily Injury Liability",
            description:
              "Covers medical bills, lost wages, and legal costs if you injure someone in an at-fault accident.",
          },
          {
            title: "Property Damage Liability",
            description:
              "Pays to repair or replace another driver’s vehicle or property when you’re at fault.",
          },
          {
            title: "Collision Coverage",
            description:
              "Pays for damage to your own car after a crash with another vehicle or object — regardless of fault.",
          },
          {
            title: "Comprehensive Coverage",
            description:
              "Theft, vandalism, hail, fire, falling objects, animal strikes — every non-collision hit to your vehicle.",
          },
          {
            title: "Uninsured / Underinsured Motorist",
            description:
              "Protects you when the at-fault driver has no insurance or not enough to cover your damages.",
          },
          {
            title: "Medical Payments / PIP",
            description:
              "Covers medical bills for you and your passengers regardless of who caused the crash.",
          },
          {
            title: "Gap Insurance",
            description:
              "Pays the difference between your loan balance and the car’s actual cash value if it’s totalled.",
          },
          {
            title: "Roadside & Rental",
            description:
              "Towing, lockout service, fuel delivery, and a rental car while yours is being repaired.",
          },
        ]}
        faqs={[
          {
            question: "How much can I actually save on car insurance with AiM?",
            answer:
              "Our 600+ auto clients average $1,200 in yearly savings, with about a 30% drop on the typical policy. Multi-car households tend to land higher — $1,800 to $2,400 a year is common when we consolidate everything onto a single optimised policy.",
          },
          {
            question: "Do you handle the entire switching process?",
            answer:
              "Yes. Once you approve the new policy, AiM files the application, coordinates effective dates so you’re never uninsured, cancels your old policy, and chases the prorated refund from your prior carrier. You sign two documents — that’s it.",
          },
          {
            question: "What information do you need to start the audit?",
            answer:
              "Just your current declarations page (the 1-page summary your carrier sends every renewal), your driver’s license number, and a list of vehicles and drivers on the policy. Five minutes of your time, zero credit card.",
          },
          {
            question: "How often do you re-shop my rate after I switch?",
            answer:
              "Every 6 months we benchmark your policy against the live market. If we spot a better rate at the same coverage level, we email you a 1-page comparison. You decide whether to move — there’s no auto-switching without your approval.",
          },
          {
            question: "Can you help with multi-car or multi-driver policies?",
            answer:
              "That’s where we save the most. We layer multi-car, multi-policy (auto+home), good-driver, defensive-driving, and pay-in-full discounts that single-line agents don’t bother stacking. Households with 2+ vehicles typically save $2,000+ per year.",
          },
        ]}
        testimonial={{
          quote:
            "Same coverage I had with Allstate, $1,400 less per year. AiM did all the paperwork — I literally signed two PDFs.",
          name: "Sarah M.",
          role: "Two-car household, Toronto",
          saved: "$1,400/yr",
        }}
      />
    </>
  );
}
