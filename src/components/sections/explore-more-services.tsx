"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

interface ExploreMoreServicesProps {
  currentSlug: string;
}

const SERVICE_IMAGE: Record<string, string> = {
  "car-insurance": "/brand/illustrations/service-car.webp",
  "home-insurance": "/brand/illustrations/service-home.webp",
  "boat-insurance": "/brand/illustrations/service-boat.webp",
  "yacht-insurance": "/brand/illustrations/service-yacht.webp",
  "jet-insurance": "/brand/illustrations/service-jet.webp",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ExploreMoreServices({ currentSlug }: ExploreMoreServicesProps) {
  const others = SERVICES.filter((s) => s.slug !== currentSlug);

  return (
    <section className="relative -mt-12 rounded-t-[48px] bg-background pb-28 pt-28 sm:rounded-t-[72px] sm:pb-36 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mb-14 grid items-end gap-6 sm:grid-cols-12"
        >
          <div className="sm:col-span-7">
            <p className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span
                className="mr-3 inline-block h-px w-12 align-middle bg-cta"
                aria-hidden
              />
              More from AiM
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.65rem, 3.6vw, 2.6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              Explore <span className="text-cta">other services.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-text-secondary sm:col-span-5">
            One team. Same monitoring playbook. Better premiums on every
            policy in your life — auto, home, marine, aviation.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {others.map((s, i) => {
            const isComingSoon = Boolean(s.comingSoon);
            const href = isComingSoon
              ? `/contact?intent=waitlist&service=${s.slug}`
              : `/${s.slug}`;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              >
                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-cta/55"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                    <Image
                      src={SERVICE_IMAGE[s.slug] ?? "/brand/illustrations/service-car.webp"}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {isComingSoon && (
                      <span
                        className="absolute right-4 top-4 rounded-full bg-cta px-3 py-1 font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-background"
                      >
                        Coming soon
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className="font-heading font-bold uppercase text-white transition-colors group-hover:text-cta"
                      style={{
                        fontSize: "1.05rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-text-secondary">
                      {s.shortDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.28em] text-cta">
                      {isComingSoon ? "Join waitlist" : "Learn more"}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
