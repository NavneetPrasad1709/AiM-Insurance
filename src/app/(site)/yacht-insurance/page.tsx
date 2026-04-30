import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/yacht-insurance`;
const TITLE = "Yacht Insurance — Luxury Coverage Negotiated for You";
const DESCRIPTION =
  "AiM negotiates yacht insurance with global blue-water carriers — full hull, P&I, crew and worldwide navigation cover at a tailored premium.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/yacht-insurance" },
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
  name: "Yacht Insurance Negotiation",
  serviceType: "Yacht Insurance Negotiation",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: ["United States", "Canada", "United Arab Emirates", "Worldwide"],
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
      name: "Yacht Insurance",
      item: PAGE_URL,
    },
  ],
};

export default function YachtInsurancePage() {
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
        serviceName="Yacht Insurance"
        serviceSlug="yacht-insurance"
        heroTitle="Blue-water coverage. Bespoke premiums."
        heroDescription="Yachts deserve more than off-the-shelf marine policies. AiM negotiates with Lloyd’s syndicates, blue-water specialists and global underwriters to engineer cover around your hull, your crew and your itinerary."
        stats={[
          { value: "$8,400", label: "Avg. annual savings" },
          { value: "40+", label: "Yacht clients" },
          { value: "Worldwide", label: "Navigation cover" },
        ]}
        benefits={[
          {
            icon: "Shield",
            title: "Full hull & machinery cover",
            description:
              "Agreed-value protection on hull, engines, generators, electronics, tenders and toys — all at survey-validated replacement cost.",
          },
          {
            icon: "HeartHandshake",
            title: "Crew & captain protection",
            description:
              "USL&H, Jones Act and international crew liability — including medical, repatriation and loss-of-income for licensed crew.",
          },
          {
            icon: "Handshake",
            title: "Charter liability layered in",
            description:
              "Bareboat, term and crewed charter exposures underwritten properly — without voiding pleasure-use coverage when not chartering.",
          },
          {
            icon: "TrendingUp",
            title: "Worldwide navigation territory",
            description:
              "Mediterranean, Caribbean, Pacific, transit, lay-up and shipyard periods — negotiated to match your actual cruising plan.",
          },
        ]}
        coverageTypes={[
          {
            title: "Hull & Machinery (Agreed Value)",
            description:
              "Total-loss settlement at the surveyed agreed value — no depreciation, no market-value disputes.",
          },
          {
            title: "Protection & Indemnity (P&I)",
            description:
              "Third-party liability for bodily injury, property damage, pollution and crew claims — typically $5M–$25M limits.",
          },
          {
            title: "Charter Liability",
            description:
              "Endorsement allowing charter use with proper underwriting — without voiding the policy.",
          },
          {
            title: "Crew Coverage",
            description:
              "Workers’ comp, USL&H, Jones Act, medical, disability and repatriation for permanent and seasonal crew.",
          },
          {
            title: "Pollution Liability",
            description:
              "Cleanup, removal and regulatory fines for fuel, oil and waste discharge — coastal and international waters.",
          },
          {
            title: "Consequential Loss / Loss of Hire",
            description:
              "Lost charter income or replacement-vessel costs while the yacht is laid up after a covered loss.",
          },
          {
            title: "Tenders, Toys & Watersports",
            description:
              "Tenders, jet skis, dive gear, paddleboards and watersport equipment scheduled at full value.",
          },
          {
            title: "Crew Personal Effects",
            description:
              "Crew baggage, uniforms and personal property — separate from passenger personal effects.",
          },
        ]}
        faqs={[
          {
            question: "Does the policy follow me through the Mediterranean and Caribbean seasons?",
            answer:
              "Yes. We negotiate dual-territory navigation with seasonal lay-up provisions — Mediterranean summer, Caribbean winter, transit included — so the policy moves with the yacht instead of restarting at every change of address.",
          },
          {
            question: "How is the agreed value set, and can it be adjusted?",
            answer:
              "Set by a recent condition-and-value survey or a verified market appraisal. We re-survey every 3 years and adjust the agreed value at renewal — protecting you from both over-insurance and under-insurance as the market moves.",
          },
          {
            question: "Do you cover charter operations?",
            answer:
              "Yes — bareboat, term and fully crewed charter, with the right underwriter for each. We also negotiate dual-use endorsements that let you charter occasionally without paying full commercial rates year-round.",
          },
          {
            question: "What about crew injuries and Jones Act exposure?",
            answer:
              "Critical and often mispriced. We pair P&I limits with proper crew-liability cover — Jones Act, USL&H, Maritime Employers Liability — and confirm coverage extends to seasonal and contracted crew, not just permanent.",
          },
          {
            question: "How do you handle high-value tenders and toys?",
            answer:
              "Each tender, jet ski, hydrofoil, dive system and watersports asset is scheduled with its own agreed value. Aggregate policies leave gaps — we schedule line-by-line so a $300K tender is covered like a $300K tender.",
          },
        ]}
        testimonial={{
          quote:
            "Same Lloyd’s syndicate, same global navigation, $8,400 less. AiM also restructured my crew cover so I’m no longer paying full commercial rates for occasional charter.",
          name: "Alexander V.",
          role: "78-ft motor yacht, Mediterranean",
          saved: "$8,400/yr",
        }}
      />
    </>
  );
}
