"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import { ICONS } from "@/lib/icons";

const SERVICE_IMAGE: Record<string, string> = {
  "car-insurance": "/brand/illustrations/service-car.webp",
  "home-insurance": "/brand/illustrations/service-home.webp",
  "boat-insurance": "/brand/illustrations/service-boat.webp",
  "yacht-insurance": "/brand/illustrations/service-yacht.webp",
  "jet-insurance": "/brand/illustrations/service-jet.webp",
};

export function ServicesGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative bg-background-cream py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(4 107 210 / 0.18), rgb(255 200 61 / 0.10) 55%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          subtitle="Insurance Services"
          title="Five categories. One team. Same coverage."
          description="Whatever you insure — car, home, boat, yacht, jet — we negotiate it down. Same carriers you already trust."
        />

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((s, i) => {
            const href = s.comingSoon ? "#" : `/${s.slug}`;
            const imgSrc = SERVICE_IMAGE[s.slug];
            return (
              <motion.li
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={href}
                  aria-disabled={s.comingSoon || undefined}
                  tabIndex={s.comingSoon ? -1 : 0}
                  className="group block h-full"
                >
                  <div
                    className="card-hover card-shimmer relative h-full bg-[#0a0a0a] rounded-[12px] border border-[#232328] flex flex-col overflow-hidden"
                  >
                    {/* Hero image — black bg of photo blends seamlessly into card bg */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={`${s.name} — premium ${s.name.toLowerCase()} concierge service`}
                          width={1024}
                          height={1024}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:-rotate-[0.6deg]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ICONS.Shield className="size-10 text-[#ffc83d]/40" aria-hidden />
                        </div>
                      )}
                      {/* Subtle vignette so card edges feel intentional */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(120% 80% at 50% 30%, transparent 60%, rgba(10, 10, 10, 0.6) 100%)",
                        }}
                      />
                      {/* Warm gradient halo — fades in on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                        style={{
                          background:
                            "radial-gradient(closest-side, rgb(255 200 61 / 0.45), rgb(255 140 66 / 0.20) 50%, transparent 80%)",
                        }}
                      />
                      {/* Floating accent orb — pulses on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute top-3 right-3 size-2 rounded-full bg-[#ffc83d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: "0 0 14px rgb(255 200 61 / 0.8)" }}
                      />
                    </div>

                    {s.comingSoon && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="coral" size="sm">
                          Coming Soon
                        </Badge>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-6 lg:p-7">
                      <h3
                        className="text-white"
                        style={{
                          fontSize: "1.4rem",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                        }}
                      >
                        {s.name}
                      </h3>
                      <p className="mt-2 text-white text-[15px] leading-[1.55] flex-1">
                        {s.shortDescription}
                      </p>

                      <span
                        className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffc83d] transition-colors duration-150 self-start"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.comingSoon ? "Notify me" : "Learn more"}
                        <ICONS.ArrowRight
                          className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ServicesGrid;
