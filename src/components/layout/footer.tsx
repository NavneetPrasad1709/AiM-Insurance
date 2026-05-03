import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SERVICES, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";

const COMPANY_LINKS = [
  { label: "About AiM", href: "/about" },
  { label: "Calculator", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Request a concierge", href: "/request-a-concierge" },
  { label: "How it works", href: "/about#process" },
  { label: "Get started", href: "/contact?intent=quote" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white">
      {/* ─────────── Top CTA strip ─────────── */}
      <section
        aria-label="Free insurance review"
        className="relative border-y border-white/10"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgba(255,200,61,0.10), transparent 60%), #0d0d10",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between md:py-16 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span aria-hidden className="h-px w-10 bg-cta" />
              Free, no-obligation review
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Stop overpaying.{" "}
              <span className="text-cta">Start saving today.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Send us your current declarations page. We&rsquo;ll show you
              exactly where you&rsquo;re overpaying — no fee unless we save
              you over $500.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/contact?intent=quote"
              className="group inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
              style={{
                boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)",
              }}
            >
              Get my free review
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-cta"
            >
              <ICONS.Phone className="size-4" aria-hidden />
              <span className="border-b border-white/30 pb-0.5">
                {SITE_CONFIG.phone}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── Brand + Newsletter row ─────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:px-10 sm:pt-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-7">
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              {SITE_CONFIG.description}
            </p>

            {/* Trust badges */}
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/brand/bbb-logo.webp"
                  alt="BBB Accredited Business"
                  width={56}
                  height={28}
                  className="h-7 w-auto opacity-80"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Accredited
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  role="img"
                  aria-label="5 star rating"
                  className="inline-flex items-center gap-0.5"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ICONS.Star
                      key={i}
                      className="size-4 fill-cta text-cta"
                      aria-hidden
                    />
                  ))}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Google Reviews
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="font-heading text-base font-extrabold tabular-nums text-cta"
                >
                  600+
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Clients served
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <p className="mb-2 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
                Newsletter
              </p>
              <h3
                className="mb-3 font-heading font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                Insurance insights — monthly.
              </h3>
              <p className="mb-5 text-[14px] leading-relaxed text-white/65">
                Quietly delivered. Premium-saving plays, market shifts, and
                the occasional client win. No spam.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── Hairline divider ─────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="border-t border-white/10" aria-hidden />
      </div>

      {/* ─────────── Link columns ─────────── */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Services">
            {SERVICES.map((s) => (
              <FooterLink key={s.slug} href={`/${s.slug}`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Resources">
            {RESOURCE_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span
                aria-hidden
                className="mr-3 inline-block h-px w-8 align-middle bg-cta"
              />
              Get in touch
            </h2>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-start gap-2 text-[14px] text-white/75 transition-colors hover:text-cta"
            >
              <ICONS.Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span className="break-all">{SITE_CONFIG.email}</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-cta"
            >
              <ICONS.Phone className="size-4 shrink-0" aria-hidden />
              {SITE_CONFIG.phone}
            </a>

            {/* Social row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = getIcon(social.icon);
                if (!Icon) return null;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-cta hover:text-cta"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── Bottom bar ─────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row sm:px-10 lg:px-12">
          <p className="text-center text-[12px] text-white/50 sm:text-left">
            © {CURRENT_YEAR} {SITE_CONFIG.name} — A Car Concierge Pro product.
            All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[12px] text-white/55 transition-colors hover:text-cta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-4">
      <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
        <span
          aria-hidden
          className="mr-3 inline-block h-px w-8 align-middle bg-cta"
        />
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-cta"
      >
        <span
          aria-hidden
          className="inline-block h-px w-0 bg-cta transition-[width] duration-300 group-hover:w-3"
        />
        {children}
      </Link>
    </li>
  );
}

export default Footer;
