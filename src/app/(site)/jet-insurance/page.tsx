import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/jet-insurance`;
const TITLE = "Private Jet Insurance — Elite Protection Coming Soon";
const DESCRIPTION =
  "Private jet insurance from AiM — hull, liability, hangar and worldwide flight cover, negotiated with global aviation underwriters. Coming soon — join the waitlist.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/jet-insurance" },
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
  name: "Private Jet Insurance Negotiation",
  serviceType: "Aviation Insurance Negotiation",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: ["Worldwide"],
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
      name: "Jet Insurance",
      item: PAGE_URL,
    },
  ],
};

export default function JetInsurancePage() {
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
        comingSoon
        serviceName="Jet Insurance"
        serviceSlug="jet-insurance"
        heroTitle="Elite aviation cover. Coming soon to AiM."
        heroDescription="We are onboarding global aviation underwriters — Lloyd’s, AIG Aerospace, Global Aerospace and Allianz. Join the waitlist for founder pricing on hull, liability, hangar and worldwide flight cover."
        stats={[
          { value: "Q3 2026", label: "Programme launch" },
          { value: "100", label: "Founder spots" },
          { value: "Lloyd’s", label: "Underwriters" },
        ]}
        benefits={[
          {
            icon: "Shield",
            title: "Hull all-risk coverage",
            description:
              "Agreed-value protection for the airframe, engines and avionics — in flight, ground risk and during taxi.",
          },
          {
            icon: "Handshake",
            title: "Combined single-limit liability",
            description:
              "Bodily injury, passenger and third-party property liability under one CSL — typically $50M–$300M limits.",
          },
          {
            icon: "Award",
            title: "Hangar & ground-risk cover",
            description:
              "Aircraft on the ground, in maintenance and during fuelling — protection beyond the standard hull policy.",
          },
          {
            icon: "TrendingUp",
            title: "Worldwide flight territory",
            description:
              "Negotiated geographic limits including transit, ferry flights, charter operations and AOG ferry.",
          },
        ]}
        coverageTypes={[
          {
            title: "Hull All-Risk",
            description:
              "Flight, taxi and ground risk on a single all-risk basis — agreed value, no depreciation.",
          },
          {
            title: "Aircraft Liability (CSL)",
            description:
              "Combined single-limit for bodily injury, passenger liability and third-party property damage.",
          },
          {
            title: "Passenger Liability",
            description:
              "Per-seat or aggregate liability for passengers carried — chartered, owner-flown or fractional.",
          },
          {
            title: "Ground Risk Hull",
            description:
              "Aircraft on the ground, in hangar, in maintenance and during fuelling — with motion or not in motion.",
          },
          {
            title: "War Risk & Allied Perils",
            description:
              "Hijacking, war, terrorism and political-risk perils — separate sub-limits and territories.",
          },
          {
            title: "Loss of Licence",
            description:
              "Replacement income for owner-pilots if a medical event grounds the FAA medical certificate.",
          },
          {
            title: "Cabin Crew & Pilot Liability",
            description:
              "Workers’ comp, employer liability and personal-accident cover for permanent and contract crew.",
          },
          {
            title: "Spare Parts & Engine Coverage",
            description:
              "Engines off-wing, spare parts in transit and tooling — often missed in standard hull policies.",
          },
        ]}
        faqs={[
          {
            question: "When does AiM’s jet programme officially launch?",
            answer:
              "Q3 2026. We are finalising binders with three Lloyd’s syndicates and two North American aerospace specialists. Waitlist members will be onboarded first, in chronological order, with founder pricing locked for the first policy term.",
          },
          {
            question: "What aircraft types will be covered?",
            answer:
              "Light, midsize and heavy business jets, super-mids, turboprops and select rotorcraft. Initial focus is owner-flown and fractionally owned aircraft up to $40M hull value. Larger heavy-iron and commercial-style fleets are phase two.",
          },
          {
            question: "Does the waitlist commit me to anything?",
            answer:
              "No. Joining the waitlist secures founder pricing and priority onboarding when we launch — that’s it. You can decline the audit, accept it, or use it as leverage with your current broker. No card, no contract.",
          },
          {
            question: "How does jet insurance pricing differ from boat or yacht?",
            answer:
              "Aviation premiums are driven by hull value, pilot experience, aircraft type and geographic territory — not annual mileage. Pilot training records, type ratings and recurrent-training currency are the biggest single levers we negotiate.",
          },
          {
            question: "What about charter and Part 135 operations?",
            answer:
              "Phase two. The launch programme is Part 91 owner-operated and fractional. Part 135 charter, managed-aircraft and air-ambulance operations join the programme in 2027.",
          },
        ]}
        testimonial={{
          quote:
            "AiM saved us $8,400 a year on the yacht — I’m on the jet waitlist before they even launch. Founder pricing is a no-brainer.",
          name: "Alexander V.",
          role: "Yacht client, future jet owner",
          saved: "Future client",
        }}
      />
    </>
  );
}
