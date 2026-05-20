import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const LAST_UPDATED = "May 20, 2026";
const EFFECTIVE_DATE = "May 20, 2026";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the AiM Insurance website and our insurance negotiation services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | AiM Insurance",
    description:
      "The terms governing your use of the AiM Insurance website and our insurance negotiation services.",
    url: `${SITE_CONFIG.url}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | AiM Insurance",
    description:
      "The terms governing your use of the AiM Insurance website and our insurance negotiation services.",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-background pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-gradient-blob opacity-60 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.32em] text-cta">
            Legal · Terms
          </p>
          <h1
            className="mt-4 font-heading font-extrabold text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.02 }}
          >
            Terms of Use
          </h1>
          <p className="mt-5 text-base text-text-secondary leading-relaxed">
            These terms govern your use of {SITE_CONFIG.url} and the insurance
            negotiation services AiM provides. By using the site or engaging us
            for a review, you agree to these terms.
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
            <h2 className="font-heading text-white">1. About AiM</h2>
            <p>
              AiM Insurance (&ldquo;AiM,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) is an independent insurance negotiation
              service operated by Car Concierge Pro. We are not an insurance
              carrier and we do not underwrite, bind, or issue insurance
              policies. We act as your advocate to review existing or
              prospective insurance, gather competing quotes, and negotiate
              terms with licensed carriers and brokers on your behalf. The
              insurance contract is always between you and the carrier.
            </p>

            <h2 className="font-heading text-white">2. Eligibility</h2>
            <p>
              You must be at least 18 years old and legally able to enter into
              binding contracts in your jurisdiction to use our services. By
              using the site, you represent that you meet these requirements.
            </p>

            <h2 className="font-heading text-white">
              3. Our services and fees
            </h2>
            <p>
              The initial review of your policy is free. If we negotiate a
              lower premium than your current or competing offer for materially
              the same coverage, AiM may charge a success fee equal to a share
              of the first-year savings we negotiate. We will disclose the
              exact fee in writing before you accept any quote, and the fee is
              only owed if you choose to bind a policy we negotiated. If we
              cannot beat your current policy, you owe us nothing.
            </p>
            <p>
              You are responsible for paying premiums directly to the carrier
              you select. AiM does not collect or remit premium payments.
            </p>

            <h2 className="font-heading text-white">
              4. No insurance advice
            </h2>
            <p>
              Our team is made up of negotiation specialists, not licensed
              attorneys, accountants, or financial planners. Information we
              provide is for general informational purposes and is not legal,
              tax, or fiduciary advice. Coverage decisions are yours. We
              encourage you to consult a licensed insurance agent,
              broker-of-record, or attorney for advice tailored to your
              circumstances.
            </p>

            <h2 className="font-heading text-white">5. Your responsibilities</h2>
            <ul>
              <li>
                Provide accurate, complete, and current information about
                yourself, your household, and the assets you want covered.
              </li>
              <li>
                Promptly tell us about changes — new drivers, vehicles, homes,
                vessels, aircraft, or claims — that could affect coverage.
              </li>
              <li>
                Review every quote, policy document, and binder for accuracy
                before binding coverage. You are responsible for what you
                accept.
              </li>
              <li>
                Pay premiums on time and follow the carrier&rsquo;s claims and
                cancellation procedures.
              </li>
              <li>
                Use the site lawfully — do not attempt to disrupt it, probe its
                security, scrape it without permission, or use it to harass
                others.
              </li>
            </ul>

            <h2 className="font-heading text-white">
              6. Quotes are estimates
            </h2>
            <p>
              Quotes are non-binding until you accept them in writing and the
              carrier issues a policy. Premiums, coverage, eligibility,
              discounts, and effective dates are set by the carrier and may
              change based on underwriting review, motor vehicle records,
              credit-based insurance scores, inspections, or other carrier
              criteria. Savings figures shown on our site (such as
              &ldquo;average savings of $1,247 a year&rdquo;) are based on
              historical client outcomes and are not a guarantee of your
              individual savings.
            </p>

            <h2 className="font-heading text-white">
              7. Intellectual property
            </h2>
            <p>
              The site, including its text, graphics, logos, images, and code,
              is owned by AiM or its licensors and is protected by copyright,
              trademark, and other laws. You may view and use the site for
              personal, non-commercial purposes. You may not copy, modify,
              distribute, republish, or create derivative works without our
              prior written permission, except for short excerpts with proper
              attribution and a link back to the source.
            </p>

            <h2 className="font-heading text-white">8. Third-party links</h2>
            <p>
              The site may link to third-party sites, including carrier portals
              and review platforms. We do not control those sites and are not
              responsible for their content, products, services, or privacy
              practices. Your use of any third-party site is at your own risk.
            </p>

            <h2 className="font-heading text-white">9. User communications</h2>
            <p>
              When you contact us — by form, email, phone, or SMS — you agree
              that we may respond using the channels you provided. We may
              record or transcribe calls for quality assurance and
              recordkeeping where permitted by law. Standard message and data
              rates may apply for SMS.
            </p>

            <h2 className="font-heading text-white">
              10. Disclaimer of warranties
            </h2>
            <p>
              THE SITE AND OUR SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND
              &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS
              OR IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY. WE DO
              NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR
              SECURE, OR THAT ANY NEGOTIATION WILL RESULT IN SAVINGS.
            </p>

            <h2 className="font-heading text-white">
              11. Limitation of liability
            </h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, AIM, ITS AFFILIATES, AND
              ITS PERSONNEL WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR
              ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF
              OR RELATED TO YOUR USE OF THE SITE OR OUR SERVICES — EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
              AGGREGATE LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE TOTAL FEES
              YOU PAID TO US IN THE TWELVE MONTHS BEFORE THE EVENT GIVING RISE
              TO THE CLAIM, OR ONE HUNDRED US DOLLARS (US$100), WHICHEVER IS
              GREATER. SOME JURISDICTIONS DO NOT ALLOW THESE LIMITATIONS, SO
              THEY MAY NOT APPLY TO YOU IN FULL.
            </p>

            <h2 className="font-heading text-white">12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless AiM, its
              affiliates, and its personnel from and against any claims,
              liabilities, damages, losses, and expenses (including reasonable
              attorneys&rsquo; fees) arising out of or related to (a) your use
              of the site or our services, (b) your violation of these terms,
              or (c) your violation of any third-party right.
            </p>

            <h2 className="font-heading text-white">
              13. Termination
            </h2>
            <p>
              You may stop using the site at any time. We may suspend or
              terminate your access to the site or our services at any time,
              with or without notice, if you breach these terms or if we
              reasonably believe your use creates risk for us or others.
            </p>

            <h2 className="font-heading text-white">
              14. Governing law and disputes
            </h2>
            <p>
              These terms are governed by the laws of the State of Arizona,
              without regard to its conflict-of-laws rules. The state and
              federal courts located in Maricopa County, Arizona will have
              exclusive jurisdiction over any dispute that is not subject to
              arbitration, and you consent to personal jurisdiction there.
            </p>
            <p>
              <strong>Informal resolution first.</strong> Before filing any
              claim, please contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-cta">
                {SITE_CONFIG.email}
              </a>{" "}
              so we can try to resolve the issue. Most concerns can be
              resolved within thirty days.
            </p>

            <h2 className="font-heading text-white">15. Changes</h2>
            <p>
              We may update these terms from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date above. If the changes
              are material, we will provide a more prominent notice. Your
              continued use of the site after a change takes effect means you
              accept the updated terms.
            </p>

            <h2 className="font-heading text-white">16. Contact</h2>
            <p>Questions about these terms?</p>
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
            <Link href="/privacy" className="link-underline text-white">
              Read our Privacy Policy →
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
