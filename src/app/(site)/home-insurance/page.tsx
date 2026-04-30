import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/home-insurance`;
const TITLE = "Home Insurance — Pay Less for Premium Coverage";
const DESCRIPTION =
  "AiM negotiates your home insurance with top carriers — full dwelling, liability, and personal property protection at the lowest possible premium.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/home-insurance" },
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
  name: "Home Insurance Negotiation",
  serviceType: "Home Insurance Negotiation",
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
      name: "Home Insurance",
      item: PAGE_URL,
    },
  ],
};

export default function HomeInsurancePage() {
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
        serviceName="Home Insurance"
        serviceSlug="home-insurance"
        heroTitle="Protect the house. Stop overpaying for it."
        heroDescription="Owners and renters across the US, Canada and UAE trust AiM to negotiate the same dwelling, liability and contents coverage at a meaningfully lower premium."
        stats={[
          { value: "$1,400", label: "Avg. annual savings" },
          { value: "200+", label: "Homeowner clients" },
          { value: "24h", label: "Audit turnaround" },
        ]}
        benefits={[
          {
            icon: "Shield",
            title: "Property + dwelling protection",
            description:
              "Replacement-cost coverage on the structure, attached structures and detached garages — negotiated, not generic.",
          },
          {
            icon: "Handshake",
            title: "Personal liability that holds up",
            description:
              "Bodily injury and property damage caused by you, your family or your pets — including legal defence costs.",
          },
          {
            icon: "TrendingUp",
            title: "Natural-disaster add-ons",
            description:
              "Wildfire, windstorm, hail and severe-weather riders priced for your actual ZIP, not a regional average.",
          },
          {
            icon: "Award",
            title: "Personal property at full value",
            description:
              "Furniture, electronics, jewellery and high-value items insured at replacement cost — scheduled where it matters.",
          },
        ]}
        coverageTypes={[
          {
            title: "Dwelling (Coverage A)",
            description:
              "Rebuilds the structure of your home after a covered loss — fire, windstorm, lightning and more.",
          },
          {
            title: "Other Structures (Coverage B)",
            description:
              "Detached garages, fences, sheds, gazebos and pools — typically 10% of dwelling limit.",
          },
          {
            title: "Personal Property (Coverage C)",
            description:
              "Furniture, electronics, clothing and household goods — open-perils or named-perils, your choice.",
          },
          {
            title: "Loss of Use (Coverage D)",
            description:
              "Hotel, food and additional living expenses while your home is uninhabitable after a covered loss.",
          },
          {
            title: "Personal Liability (Coverage E)",
            description:
              "Lawsuits for bodily injury or property damage — including legal defence beyond the policy limit.",
          },
          {
            title: "Medical Payments (Coverage F)",
            description:
              "Pays small medical bills for guests injured on your property regardless of fault.",
          },
          {
            title: "Flood / Earthquake Riders",
            description:
              "Standard policies exclude these — we layer separate riders or NFIP policies where you actually need them.",
          },
          {
            title: "Scheduled Personal Property",
            description:
              "Jewellery, fine art, watches and collectibles insured individually with no per-item sub-limit.",
          },
        ]}
        faqs={[
          {
            question: "Will I have to switch carriers to save?",
            answer:
              "Often, yes — but not always. About 30% of audits end with us renegotiating with your existing carrier instead of moving you, because once they see we’re actively shopping, retention departments sharpen the pencil. Either way, you decide.",
          },
          {
            question: "Does this work if I just bought my home?",
            answer:
              "Especially well. New-purchase quotes are the most over-priced moment in the entire policy lifecycle because lenders rush you. Send us your binder before the first renewal and we’ll typically save 25–35% before the policy auto-renews.",
          },
          {
            question: "Do you handle landlord and rental property policies?",
            answer:
              "Yes — DP-1, DP-3 and full landlord packages with loss-of-rent and liability included. Multi-property investors typically save the most because we consolidate to a single carrier with portfolio pricing.",
          },
          {
            question: "What about flood, earthquake and hurricane coverage?",
            answer:
              "Standard HO-3 policies exclude all three. We add NFIP flood policies, private excess flood, earthquake and named-storm endorsements priced against your specific exposure — not a national pool.",
          },
          {
            question: "How accurate is the 24-hour savings estimate?",
            answer:
              "Within 5%. We pull live carrier rate filings, not last-year cached quotes. The number you see in your audit is the number that lands on the binding page, assuming nothing changes in your underwriting profile.",
          },
        ]}
        testimonial={{
          quote:
            "Same dwelling limit, same liability, same deductible. $1,236 less. I don’t know why I waited so long.",
          name: "Daniel R.",
          role: "Homeowner, Austin TX",
          saved: "$1,236/yr",
        }}
      />
    </>
  );
}
