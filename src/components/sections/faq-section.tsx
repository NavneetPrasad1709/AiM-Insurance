"use client";

import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ICONS } from "@/lib/icons";
import { SITE_CONFIG } from "@/lib/constants";

const FAQS = [
  {
    q: "Do you charge for negotiating insurance?",
    a: "Our consultation and negotiation service is free for our clients. We're paid by partner carriers when we place your business — and only if the coverage and price are genuinely better than what you have. If we can't beat your current policy, you owe us nothing.",
  },
  {
    q: "Can you really get me a better rate than going direct?",
    a: "Most of the time, yes. Direct quotes are anchored to whatever the carrier's website algorithm spits out — they don't account for negotiation, multi-line discounts, or underwriter relationships. Our team works the levers carriers won't show you. Average client savings: $1,200+ per year for the same coverage.",
  },
  {
    q: "Do I still sign up with the insurance company directly?",
    a: "Yes. The policy is between you and the carrier — we just negotiate the terms and handle the paperwork. You own the policy, you make the payments, you control everything. We're your advocate, not a middleman billing you.",
  },
  {
    q: "What if I already have insurance?",
    a: "Even better. Send us your declarations page and we'll audit it for free. If we find savings, we'll show you the side-by-side comparison and let you decide. If we don't, we'll tell you that too — and you'll know your current policy is competitive.",
  },
];

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="relative bg-background-cream py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.MessageSquare className="size-3.5 text-[#ffc83d]" aria-hidden />
              Have questions?
            </span>
            <h2
              id="faq-heading"
              className="mt-5 text-white"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Everything you want to{" "}
              <span className="text-[#ffc83d]">know first.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white max-w-xl leading-[1.55]">
              The questions we hear most. Don&apos;t see yours? Reach out — we
              answer every email.
            </p>

            <div className="mt-10">
              <Accordion type="single" defaultValue={FAQS[0].q}>
                {FAQS.map((f) => (
                  <AccordionItem key={f.q} value={f.q} question={f.q}>
                    {f.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 rounded-[12px] bg-[#111113] p-7 lg:p-8 border border-[#232328]">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-[#1a0e0a] text-[#ffc83d] border border-[#ffc83d]/30">
                <ICONS.HeartHandshake className="size-5" aria-hidden />
              </span>
              <h3
                className="mt-5 text-white"
                style={{
                  fontSize: "1.4rem",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.15,
                }}
              >
                Still have questions?
              </h3>
              <p className="mt-2 text-white text-[15px] leading-[1.55]">
                Our concierge team is here to help you save.
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                    className="link-underline inline-flex items-center gap-2 text-[#e8e8ec] hover:text-white transition-colors duration-150"
                  >
                    <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="link-underline inline-flex items-center gap-2 text-[#e8e8ec] hover:text-white transition-colors duration-150"
                  >
                    <ICONS.Mail className="size-4 text-[#ffc83d]" aria-hidden />
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
              <Link
                href="/contact"
                className="btn-shine cta-primary mt-7 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Contact us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
