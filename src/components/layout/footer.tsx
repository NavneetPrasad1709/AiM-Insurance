import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { SERVICES, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Calculator", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F0F11] text-white">
      <FooterBackgroundGradient />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p className="max-w-xs text-[16px] leading-relaxed text-white/70">
              Unlock Savings with Unbiased &amp; Ongoing Insurance Monitoring.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-white/50">
              <span className="inline-flex items-center gap-2">
                <ICONS.Shield className="size-4 text-cta" aria-hidden />
                BBB Accredited Business
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ICONS.Star
                      key={i}
                      className="size-3.5 fill-cta text-cta"
                      aria-hidden
                    />
                  ))}
                </span>
                Google Reviews
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="flex flex-col gap-3">
            <h2 className="font-heading text-xs font-semibold uppercase tracking-widest text-cta">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[16px] text-white/70 transition-colors hover:text-cta"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="flex flex-col gap-3">
            <h2 className="font-heading text-xs font-semibold uppercase tracking-widest text-cta">
              Our Services
            </h2>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="text-[16px] text-white/70 transition-colors hover:text-cta"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Newsletter + Social */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-xs font-semibold uppercase tracking-widest text-cta">
              Get in Touch
            </h2>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 text-[16px] text-white/70 transition-colors hover:text-cta break-all"
                >
                  <ICONS.Mail className="size-4 shrink-0" aria-hidden />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 text-[16px] text-white/70 transition-colors hover:text-cta"
                >
                  <ICONS.Phone className="size-4 shrink-0" aria-hidden />
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>

            <NewsletterForm />

            <div className="mt-1 flex flex-wrap items-center gap-2">
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
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cta hover:text-cta"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            © {CURRENT_YEAR} {SITE_CONFIG.name} — Product by Car Concierge Pro
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[16px] text-white/70 transition-colors hover:text-cta"
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

export default Footer;
