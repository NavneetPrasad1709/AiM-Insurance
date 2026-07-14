import type { Metadata } from "next";
import Link from "next/link";
import { ConciergeForm } from "@/components/forms/concierge-form";
import { ICONS } from "@/lib/icons";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/request-a-concierge`;
const TITLE = "Request A Concierge";
const DESCRIPTION =
  "Request a dedicated insurance concierge from AiM. We negotiate the best rates on car, home, boat, yacht & jet insurance. Same coverage, lower premium.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/request-a-concierge" },
  openGraph: {
    title: `${TITLE} | AiM Insurance`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | AiM Insurance`,
    description: DESCRIPTION,
  },
};

const TRUST_STATS = [
  { v: "1100+", l: "Clients served" },
  { v: "$6.14M+", l: "Negotiated savings" },
  { v: "$1,247+", l: "Avg. annual savings" },
];

const WHAT_YOU_GET = [
  "Dedicated personal concierge",
  "Expert insurance negotiation",
  "Multi-carrier comparison (50+)",
  "Ongoing rate monitoring",
  "Zero-hassle switching",
];

export default function RequestAConciergePage() {
  return (
    <div className="relative bg-background pt-12 pb-24 sm:pt-16 sm:pb-32">
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 right-1/4 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            <li>
              <Link href="/" className="link-underline transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/30">/</li>
            <li className="text-[#ffc83d]" aria-current="page">
              Request A Concierge
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: form (60%) */}
          <div className="lg:col-span-7">
            <ConciergeForm />
          </div>

          {/* RIGHT: sidebar (40%) */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
              {/* Why AiM */}
              <div className="rounded-[14px] border border-[#232328] bg-[#111113] p-6">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#0a0a0a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.Sparkles className="size-3 text-[#ffc83d]" aria-hidden />
                  Why AiM
                </span>
                <ul className="mt-4 grid grid-cols-3 gap-3">
                  {TRUST_STATS.map((s) => (
                    <li
                      key={s.l}
                      className="rounded-[10px] border border-[#232328] bg-[#0a0a0a] p-3 text-center"
                    >
                      <div
                        className="text-lg font-extrabold tabular-nums text-[#ffc83d]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.v}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/90">
                        {s.l}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <ICONS.Shield className="size-4 text-[#ffc83d]" aria-hidden />
                    BBB Accredited
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex" role="img" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <ICONS.Star
                          key={i}
                          className="size-3 fill-[#ffc83d] text-[#ffc83d]"
                          aria-hidden
                        />
                      ))}
                    </span>
                    Google Reviews
                  </span>
                </div>
              </div>

              {/* What you get */}
              <div className="rounded-[14px] border border-[#232328] bg-[#111113] p-6">
                <h3
                  className="text-white"
                  style={{
                    fontSize: "1rem",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  What you get
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {WHAT_YOU_GET.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-white/90"
                    >
                      <ICONS.CheckCircle2
                        className="size-4 shrink-0 mt-0.5 text-[#ffc83d]"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="rounded-[14px] border border-[#232328] bg-[#111113] p-6">
                <span
                  className="quote-glyph text-5xl"
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="-mt-3 text-base leading-[1.55] text-white">
                  Same coverage I had with Allstate, $1,400 less per year. AiM did
                  all the paperwork. I literally signed two PDFs.
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">
                    Sarah M.{" "}
                    <span className="font-normal text-white/90">· Toronto</span>
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffc83d] tabular-nums"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Saved $1,400/yr
                  </span>
                </div>
              </div>

              {/* Questions */}
              <div className="rounded-[14px] border border-[#232328] bg-[#111113] p-6">
                <h3
                  className="text-white"
                  style={{
                    fontSize: "1rem",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Questions?
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  <li>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                      className="link-underline inline-flex items-center gap-2 text-white"
                    >
                      <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
                      {SITE_CONFIG.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="link-underline inline-flex items-center gap-2 text-white"
                    >
                      <ICONS.Mail className="size-4 text-[#ffc83d]" aria-hidden />
                      {SITE_CONFIG.email}
                    </a>
                  </li>
                  <li className="text-white/90 mt-1">Mon-Fri · 9 AM to 6 PM EST</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
