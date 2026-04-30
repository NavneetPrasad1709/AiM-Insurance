import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/boat-insurance`;
const TITLE = "Boat Insurance — Navigate Savings on Coverage";
const DESCRIPTION =
  "AiM negotiates boat insurance with leading marine carriers — hull, liability, towing and personal effects coverage at a lower premium.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/boat-insurance" },
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
  name: "Boat Insurance Negotiation",
  serviceType: "Boat Insurance Negotiation",
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
      name: "Boat Insurance",
      item: PAGE_URL,
    },
  ],
};

export default function BoatInsurancePage() {
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
        serviceName="Boat Insurance"
        serviceSlug="boat-insurance"
        heroTitle="Open water. Closed-margin pricing."
        heroDescription="Marine premiums are notoriously inflated — different carriers price the same hull wildly differently. AiM benchmarks them and negotiates the best deal so you pay for protection, not paperwork."
        stats={[
          { value: "$1,650", label: "Avg. annual savings" },
          { value: "85+", label: "Boat clients" },
          { value: "12", label: "Marine carriers" },
        ]}
        benefits={[
          {
            icon: "Shield",
            title: "Hull coverage that actually pays",
            description:
              "Agreed-value protection for collision, sinking, fire, theft and storm damage — settled at the number on the policy, not depreciated.",
          },
          {
            icon: "Handshake",
            title: "On-water liability protection",
            description:
              "Bodily injury and property damage to other boaters, swimmers, marinas and waterfront property — including legal defence.",
          },
          {
            icon: "Phone",
            title: "Towing & emergency assistance",
            description:
              "On-water towing, fuel delivery, soft ungrounding and trip interruption — most boat owners never realise this is negotiable.",
          },
          {
            icon: "Award",
            title: "Personal effects + gear coverage",
            description:
              "Fishing equipment, electronics, watersports gear, dive equipment and personal property aboard the boat — at replacement cost.",
          },
        ]}
        coverageTypes={[
          {
            title: "Hull & Machinery (Agreed Value)",
            description:
              "Pays the policy value if the boat is totalled — no depreciation deductions.",
          },
          {
            title: "Watercraft Liability",
            description:
              "Bodily injury and property damage to others arising from operation of the vessel.",
          },
          {
            title: "Medical Payments",
            description:
              "Pays medical expenses for you and passengers injured aboard, regardless of fault.",
          },
          {
            title: "Uninsured Boater",
            description:
              "Protects you if struck by an uninsured or hit-and-run boat operator.",
          },
          {
            title: "Trailer Coverage",
            description:
              "Insures the trailer for collision and theft while in tow or at storage.",
          },
          {
            title: "Fishing Equipment",
            description:
              "Rods, reels, electronics, downriggers and tournament gear at agreed value.",
          },
          {
            title: "Wreck Removal",
            description:
              "Pays for the legally required removal of your boat after a covered total loss.",
          },
          {
            title: "Fuel-Spill Liability",
            description:
              "Covers cleanup costs and regulatory fines from fuel or oil discharge.",
          },
        ]}
        faqs={[
          {
            question: "What size and type of boats do you cover?",
            answer:
              "Personal watercraft, bowriders, centre consoles, pontoons, sailboats, cabin cruisers and offshore sport-fishers up to 65 feet. Above 65 feet typically routes into our yacht programme — we’ll tell you which makes more sense.",
          },
          {
            question: "Does my boat policy cover trailering and storage?",
            answer:
              "Yes — most carriers cover the boat in transit on a trailer, in dry storage at marinas, and during winter haul-out. We confirm the navigation territory and lay-up provisions match how you actually use the boat.",
          },
          {
            question: "Will my regular boating record affect the rate?",
            answer:
              "Cleanly. We negotiate experience credits for completed boating safety courses, multi-year clean records and Coast Guard licences. Most carriers will knock 10–25% off if asked — they don’t volunteer it.",
          },
          {
            question: "Do you handle saltwater and offshore navigation?",
            answer:
              "Yes. We negotiate extended navigation territories — coastal, Bahamas, Bermuda triangle and trans-Atlantic — with proper salvage and towing limits matched to where you actually run the boat.",
          },
          {
            question: "What about charter or rental use?",
            answer:
              "Standard pleasure-use policies exclude paid charter. We layer charter-liability endorsements or move you onto a commercial marine policy depending on how often you charter and to whom.",
          },
        ]}
        testimonial={{
          quote:
            "Same agreed-value, same navigation limits, $1,650 less per year. AiM also caught a coverage gap on my trailer that my old broker missed.",
          name: "Marcus T.",
          role: "32-ft offshore sport-fisher, Florida",
          saved: "$1,650/yr",
        }}
      />
    </>
  );
}
