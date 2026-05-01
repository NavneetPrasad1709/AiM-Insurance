import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { ICONS, getIcon } from "@/lib/icons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import {
  GoldParticleField,
  AuroraStrands,
  CornerOrnament,
  GrainTexture,
} from "@/components/illustrations/ambience";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import {
  StructuredData,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";

const PAGE_URL = `${SITE_CONFIG.url}/contact`;
const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with AiM Insurance — we negotiate the best rates on car, home, boat, yacht & jet insurance. Reply within 1 business day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${TITLE} — AiM Insurance`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{ intent?: string; service?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const intent = params.intent;

  const ld = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ];

  return (
    <>
      <StructuredData data={ld} />
    <div className="relative bg-background pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm gold glow — top-left */}
        <div
          className="absolute -top-32 left-1/4 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        {/* Cool teal glow — bottom-right, balances the warm gold */}
        <div
          className="absolute bottom-0 -right-32 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.12), transparent 70%)",
          }}
        />
        {/* Soft coral wash — mid-left */}
        <div
          className="absolute top-1/2 -left-32 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 140 66 / 0.08), transparent 70%)",
          }}
        />

        <GoldParticleField density={20} opacity={0.4} />
        <AuroraStrands opacity={0.16} />
        <GrainTexture opacity={0.06} />
        <CornerOrnament position="tl" size={180} opacity={0.28} />
        <CornerOrnament position="br" size={180} opacity={0.28} />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            <li>
              <Link href="/" className="link-underline transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/30">/</li>
            <li className="text-[#ffc83d]" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        <div className="relative max-w-2xl">
          <FloatingOrbs variant="hero" />
          <h1
            className="relative text-white"
            style={{
              fontSize: "clamp(2.4rem, 5.6vw, 4rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Let&rsquo;s talk{" "}
            <span className="text-[#ffc83d]">savings.</span>
          </h1>
          <p className="relative mt-5 text-base sm:text-lg text-white/80 leading-[1.55]">
            Send us a message — quote, existing policy, partnership, anything. A
            real human replies within one business day.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <ContactForm defaultIntent={intent} />
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-[14px] border border-[#232328] bg-[#111113] p-6 sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgb(255 200 61 / 0.22), transparent 70%)",
                  }}
                />
                <h2
                  className="text-white"
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Get in touch
                </h2>

                <ul className="mt-6 flex flex-col gap-4 text-sm">
                  <li>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                      className="link-underline inline-flex items-center gap-3 text-white"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-md border border-[#ffc83d]/30 bg-[#1a0e0a] text-[#ffc83d]">
                        <ICONS.Phone className="size-4" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.18em] text-white/55">
                          Phone
                        </span>
                        <span className="text-[15px] font-semibold">
                          {SITE_CONFIG.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="link-underline inline-flex items-center gap-3 text-white"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-md border border-[#ffc83d]/30 bg-[#1a0e0a] text-[#ffc83d]">
                        <ICONS.Mail className="size-4" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.18em] text-white/55">
                          Email
                        </span>
                        <span className="text-[15px] font-semibold">
                          {SITE_CONFIG.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="inline-flex size-10 items-center justify-center rounded-md border border-[#ffc83d]/30 bg-[#1a0e0a] text-[#ffc83d]">
                      <ICONS.MessageSquare className="size-4" aria-hidden />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-[0.18em] text-white/55">
                        Hours
                      </span>
                      <span className="text-[15px] font-semibold">
                        Mon–Fri · 9 AM – 6 PM EST
                      </span>
                    </span>
                  </li>
                </ul>

                <div className="mt-6 pt-5 border-t border-[#232328]">
                  <span className="text-xs uppercase tracking-[0.18em] text-white/55">
                    Follow us
                  </span>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {SOCIAL_LINKS.map((s) => {
                      const Icon = getIcon(s.icon);
                      if (!Icon) return null;
                      return (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-[#232328] text-white/70 transition-colors hover:border-[#ffc83d]/40 hover:text-[#ffc83d]"
                        >
                          <Icon className="size-4" aria-hidden />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Map placeholder — gradient with pin */}
              <div
                className="relative h-44 overflow-hidden rounded-[14px] border border-[#232328]"
                aria-label="Service area map placeholder"
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 50% 100%, rgb(255 200 61 / 0.28) 0%, transparent 60%), radial-gradient(80% 60% at 0% 0%, rgb(79 224 176 / 0.18) 0%, transparent 60%), linear-gradient(135deg, #111113 0%, #0a0a0a 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                <div className="relative flex h-full flex-col items-center justify-center text-center px-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#ffc83d]/40 bg-[#1a0e0a] text-[#ffc83d]">
                    <ICONS.Sparkles className="size-4" aria-hidden />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Serving USA · Canada · UAE
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Remote-first concierge service
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
