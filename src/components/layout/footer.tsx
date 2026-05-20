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

const TEL_HREF = `tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`;
const MAIL_HREF = `mailto:${SITE_CONFIG.email}`;

export function Footer() {
  return (
    <footer
      className="relative bg-[#0a0a0a] text-white"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
      }}
    >
      {/* ─────────── Top fade ─────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,200,61,0.35) 50%, transparent 100%)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*                    LEAD: brand + contact (mobile)               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-7">
            <Logo variant="light" />

            {/* Tagline — short on mobile, full on lg */}
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70 lg:hidden">
              Expert negotiators fight for the best deal — same coverage,
              lower premiums.
            </p>
            <p className="mt-5 hidden max-w-md text-[15px] leading-relaxed text-white/70 lg:block">
              {SITE_CONFIG.description}
            </p>

            {/* ── Mobile quick-contact card (visible <lg) ── */}
            <div className="mt-6 grid grid-cols-1 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-2 lg:hidden">
              <a
                href={TEL_HREF}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5 active:bg-white/10"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cta/15 text-cta">
                  <ICONS.Phone className="size-4" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Call us
                  </span>
                  <span className="text-base font-semibold text-white tabular-nums">
                    {SITE_CONFIG.phone}
                  </span>
                </span>
              </a>
              <a
                href={MAIL_HREF}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5 active:bg-white/10"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cta/15 text-cta">
                  <ICONS.Mail className="size-4" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Email us
                  </span>
                  <span className="truncate text-[15px] font-semibold text-white">
                    {SITE_CONFIG.email}
                  </span>
                </span>
              </a>
            </div>

            {/* Get-quote CTA — mobile only */}
            <Link
              href="/contact?intent=quote"
              className="btn-shine mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 text-[15px] font-heading font-bold text-[#0a0a0a] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 lg:hidden"
            >
              Get my free quote
              <ICONS.ArrowRight className="size-4" aria-hidden />
            </Link>

            {/* Trust strip — tight on mobile, generous on lg */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7 lg:mt-7 lg:gap-x-8 lg:gap-y-4">
              <li className="flex items-center gap-2.5">
                <Image
                  src="/brand/bbb-logo.webp"
                  alt="BBB Accredited Business"
                  width={56}
                  height={28}
                  className="h-6 w-auto opacity-80 sm:h-7"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Accredited
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  role="img"
                  aria-label="5 star Google rating"
                  className="inline-flex items-center gap-0.5"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ICONS.Star
                      key={i}
                      className="size-3.5 fill-cta text-cta sm:size-4"
                      aria-hidden
                    />
                  ))}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Google
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="font-heading text-[15px] font-extrabold tabular-nums text-cta sm:text-base"
                >
                  1000+
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Clients
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter — slimmer on mobile */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-cta sm:tracking-[0.36em]">
                Newsletter
              </p>
              <h3
                className="mt-2 font-heading font-bold uppercase text-white"
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                Insurance insights — monthly.
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:mt-3 sm:text-[14px]">
                Premium-saving plays and market shifts. Quietly delivered.
                No spam.
              </p>
              <div className="mt-4 sm:mt-5">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── Divider ─────────── */}
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:mt-14 sm:px-8 lg:mt-16 lg:px-12">
        <div className="border-t border-white/10" aria-hidden />
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*                    LINK COLUMNS                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        {/* Mobile: 2-col Services + Company, then Resources full-width.
            sm: 3-col with Resources joining.
            lg: original 4-col with Get-in-touch column. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10">
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

          {/* Resources — full-width on mobile, normal column on sm+ */}
          <div className="col-span-2 sm:col-span-1">
            <FooterColumn title="Resources">
              {RESOURCE_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Desktop-only "Get in touch" column — mobile has the card up top */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            <ColumnTitle>Get in touch</ColumnTitle>
            <a
              href={MAIL_HREF}
              className="inline-flex items-start gap-2 text-[14px] text-white/75 transition-colors hover:text-cta"
            >
              <ICONS.Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span className="break-all">{SITE_CONFIG.email}</span>
            </a>
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-cta"
            >
              <ICONS.Phone className="size-4 shrink-0" aria-hidden />
              {SITE_CONFIG.phone}
            </a>
            <SocialRow alignment="start" />
          </div>
        </div>

        {/* Mobile social row — centered, below the link grid */}
        <div className="mt-10 flex justify-center lg:hidden">
          <SocialRow alignment="center" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*                    BOTTOM BAR                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between sm:px-8 sm:py-7 lg:px-12">
          {/* Legal links FIRST on mobile (under bigger touch area), copyright LAST */}
          <ul className="order-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2 sm:justify-end">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[13px] font-medium text-white/65 transition-colors hover:text-cta sm:text-[12px]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="order-1 text-center text-[12px] leading-relaxed text-white/70 sm:order-1 sm:text-left">
            © {CURRENT_YEAR} {SITE_CONFIG.name}
            <span className="hidden sm:inline">
              {" "}— A Car Concierge Pro product. All rights reserved.
            </span>
            <span className="block sm:hidden">
              A Car Concierge Pro product.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-cta sm:tracking-[0.36em]">
      <span
        aria-hidden
        className="mr-3 inline-block h-px w-6 align-middle bg-cta sm:w-8"
      />
      {children}
    </h2>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3 sm:gap-4">
      <ColumnTitle>{title}</ColumnTitle>
      <ul className="flex flex-col gap-2 sm:gap-2.5">{children}</ul>
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
        className="group inline-flex items-center gap-2 py-1 text-[15px] text-white/80 transition-colors hover:text-cta sm:text-[14px]"
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

function SocialRow({ alignment }: { alignment: "start" | "center" }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2.5 ${
        alignment === "center" ? "justify-center" : "mt-3 justify-start"
      }`}
    >
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
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-cta hover:text-cta active:translate-y-0 sm:size-10"
          >
            <Icon className="size-[18px] sm:size-4" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}

export default Footer;
