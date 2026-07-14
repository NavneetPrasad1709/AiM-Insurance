import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const LAST_UPDATED = "May 20, 2026";
const EFFECTIVE_DATE = "May 20, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AiM Insurance collects, uses, shares, and protects the personal information you provide when requesting insurance negotiation services.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | AiM Insurance",
    description:
      "How AiM Insurance collects, uses, shares, and protects your personal information.",
    url: `${SITE_CONFIG.url}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | AiM Insurance",
    description:
      "How AiM Insurance collects, uses, shares, and protects your personal information.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-background pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-gradient-blob opacity-60 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.32em] text-cta">
            Legal · Privacy
          </p>
          <h1
            className="mt-4 font-heading font-extrabold text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.02 }}
          >
            Privacy Policy
          </h1>
          <p className="mt-5 text-base text-text-secondary leading-relaxed">
            This policy explains what personal information AiM Insurance
            collects, how we use and share it, and the choices you have. It
            applies to <span className="text-white">{SITE_CONFIG.url}</span>{" "}
            and the negotiation services we provide.
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
            <h2 className="font-heading text-white">1. Who we are</h2>
            <p>
              AiM Insurance (&ldquo;AiM,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) is an independent insurance negotiation
              service operated by Car Concierge Pro. We do not underwrite
              policies. We act as your advocate to review your existing or
              prospective insurance, gather competing quotes, and negotiate
              terms with licensed carriers and brokers on your behalf.
            </p>
            <p>
              For any privacy question or request, contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-cta">
                {SITE_CONFIG.email}
              </a>{" "}
              or {SITE_CONFIG.phone}.
            </p>

            <h2 className="font-heading text-white">
              2. Information we collect
            </h2>
            <p>We collect the following categories of personal information:</p>
            <ul>
              <li>
                <strong>Contact information:</strong> name, email address,
                phone number, mailing address, and preferred contact method.
              </li>
              <li>
                <strong>Insurance information:</strong> your current
                declarations page, policy numbers, coverage limits,
                deductibles, premium amounts, renewal dates, and claims
                history.
              </li>
              <li>
                <strong>Underwriting information:</strong> driver&rsquo;s
                license number, date of birth, vehicle VINs, vehicle
                make/model/year, property address and characteristics, vessel
                or aircraft registration details, and similar information
                required by carriers to provide a quote.
              </li>
              <li>
                <strong>Household information:</strong> names, dates of birth,
                and license details of co-insureds (spouses, dependents, named
                drivers) that you provide.
              </li>
              <li>
                <strong>Communications:</strong> emails, text messages, phone
                call notes, and form submissions you exchange with our team.
              </li>
              <li>
                <strong>Usage and device information:</strong> IP address,
                browser type and version, operating system, referring URLs,
                pages viewed, and time stamps. We collect this through cookies
                and similar technologies (see Section 7).
              </li>
            </ul>
            <p>
              You may decline to provide certain information, but doing so may
              prevent us from accurately quoting or negotiating your policy.
            </p>

            <h2 className="font-heading text-white">
              3. How we use your information
            </h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>
                Audit your current policy and prepare a savings comparison.
              </li>
              <li>
                Request quotes from carriers and brokers on your behalf, and
                negotiate terms.
              </li>
              <li>
                Communicate with you about your account, scheduled reviews,
                renewals, and savings opportunities.
              </li>
              <li>
                Send service-related messages and, where you opt in, our
                newsletter or savings alerts.
              </li>
              <li>
                Detect, investigate, and prevent fraud, abuse, and security
                incidents.
              </li>
              <li>
                Comply with legal and regulatory obligations, respond to
                lawful requests, and enforce our Terms of Use.
              </li>
              <li>
                Measure and improve our website, marketing, and service
                quality.
              </li>
            </ul>

            <h2 className="font-heading text-white">
              4. How we share your information
            </h2>
            <p>We share personal information only as follows:</p>
            <ul>
              <li>
                <strong>Licensed insurance carriers and brokers:</strong> to
                request quotes, place coverage, and finalize policies on your
                behalf. Each carrier has its own privacy practices.
              </li>
              <li>
                <strong>Service providers</strong> who process data for us:
                hosting, email delivery, analytics, CRM, scheduling, and
                payment processing. They are contractually bound to use the
                information only for the services they provide to us.
              </li>
              <li>
                <strong>Affiliates</strong> within the Car Concierge Pro family
                of brands, for the purposes described in this policy.
              </li>
              <li>
                <strong>Legal and safety:</strong> to comply with applicable
                law, valid legal process, or to protect the rights, property,
                or safety of you, us, or others.
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a
                merger, acquisition, financing, or sale of assets. We will
                notify you of any such change and your choices.
              </li>
            </ul>
            <p>
              <strong>We do not sell your personal information</strong> and we
              do not share it for cross-context behavioral advertising as those
              terms are defined under California law.
            </p>

            <h2 className="font-heading text-white">5. Data retention</h2>
            <p>
              We keep personal information for as long as needed to provide our
              services, comply with our legal and tax obligations, resolve
              disputes, and enforce our agreements. When information is no
              longer needed, we delete it or de-identify it. Insurance records
              are typically retained for at least seven years to satisfy
              regulatory recordkeeping requirements.
            </p>

            <h2 className="font-heading text-white">6. Security</h2>
            <p>
              We use administrative, technical, and physical safeguards
              designed to protect personal information, including TLS in
              transit, encryption at rest for sensitive fields, least-privilege
              access controls, and routine reviews. No system is perfectly
              secure, so we cannot guarantee absolute security. If we learn of
              a security incident affecting your information, we will notify
              you as required by law.
            </p>

            <h2 className="font-heading text-white">
              7. Cookies and analytics
            </h2>
            <p>
              We use cookies and similar technologies to operate the site,
              remember your preferences, and measure performance. We may use
              privacy-preserving analytics providers (such as Google Analytics
              or Vercel Analytics). Most browsers let you refuse or delete
              cookies. If you do, parts of the site may not work properly.
            </p>
            <p>
              We honor the Global Privacy Control (GPC) signal where required
              by law as an opt-out of any sale or share of personal
              information.
            </p>

            <h2 className="font-heading text-white">8. Your choices</h2>
            <ul>
              <li>
                <strong>Marketing emails:</strong> you can unsubscribe at any
                time using the link in any marketing email or by emailing us.
              </li>
              <li>
                <strong>SMS:</strong> reply STOP to opt out of any text
                messages we send you.
              </li>
              <li>
                <strong>Account information:</strong> you may ask us to
                update, correct, or delete your information by contacting us.
              </li>
            </ul>

            <h2 className="font-heading text-white">
              9. Your rights (US residents)
            </h2>
            <p>
              Depending on where you live (including California, Colorado,
              Connecticut, Virginia, Utah, Oregon, Texas, and other states with
              consumer privacy laws), you may have the right to:
            </p>
            <ul>
              <li>Know what personal information we hold about you.</li>
              <li>Access a copy of that information, in a portable format.</li>
              <li>Correct inaccurate information.</li>
              <li>
                Delete personal information, subject to legal exceptions.
              </li>
              <li>
                Opt out of any sale, sharing, or targeted advertising (we do
                not engage in these activities).
              </li>
              <li>
                Limit the use of sensitive personal information for purposes
                beyond what is necessary to provide our service.
              </li>
              <li>
                Appeal a denial of any privacy request, where required by law.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-cta">
                {SITE_CONFIG.email}
              </a>
              . We will verify your identity before responding, and we will
              not discriminate against you for exercising your rights.
            </p>

            <h2 className="font-heading text-white">
              10. Your rights (Canada &amp; UAE residents)
            </h2>
            <p>
              Canadian residents have rights under PIPEDA and applicable
              provincial laws, including the right to access and correct
              personal information. UAE residents have rights under PDPL,
              including the rights to access, correct, erase, and restrict
              processing of personal data. Contact us to exercise these
              rights.
            </p>

            <h2 className="font-heading text-white">11. Children</h2>
            <p>
              Our services are intended for adults. We do not knowingly
              collect personal information from children under 16. If you
              believe a child has provided us information, contact us and we
              will delete it.
            </p>

            <h2 className="font-heading text-white">
              12. International transfers
            </h2>
            <p>
              We are based in the United States and may transfer, store, and
              process information outside your country of residence. We use
              appropriate safeguards where required by law.
            </p>

            <h2 className="font-heading text-white">
              13. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date at the top of this
              page. If changes are material, we will provide a more prominent
              notice (such as by email or an on-site banner).
            </p>

            <h2 className="font-heading text-white">14. Contact us</h2>
            <p>
              Questions, requests, or complaints about this policy?
            </p>
            <ul>
              <li>
                Email:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-cta"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>Phone: {SITE_CONFIG.phone}</li>
              <li>
                Web:{" "}
                <Link href="/contact" className="text-cta">
                  /contact
                </Link>
              </li>
            </ul>
          </article>

          <div className="mt-12 flex flex-wrap gap-3 text-sm text-text-muted">
            <Link href="/terms" className="link-underline text-white">
              Read our Terms of Use →
            </Link>
            <span aria-hidden>·</span>
            <Link href="/contact" className="link-underline text-white">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
