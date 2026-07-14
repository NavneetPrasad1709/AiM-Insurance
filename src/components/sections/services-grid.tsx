import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";

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
      className="relative overflow-hidden bg-background-cream py-14 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full blur-3xl sm:w-[800px]"
        style={{
          background:
            "radial-gradient(closest-side, rgb(4 107 210 / 0.18), rgb(255 200 61 / 0.10) 55%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          subtitle="Insurance Services"
          title="Five categories. One team. Same coverage."
          description="Whatever you insure (car, home, boat, yacht, jet), we negotiate it down. Same carriers you already trust."
        />

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((s) => {
            const href = s.comingSoon ? "#" : `/${s.slug}`;
            const imgSrc = SERVICE_IMAGE[s.slug];
            const ServiceIcon = getIcon(s.icon) ?? ICONS.Shield;
            return (
              <li key={s.slug}>
                <Link
                  href={href}
                  aria-disabled={s.comingSoon || undefined}
                  tabIndex={s.comingSoon ? -1 : 0}
                  className="group block h-full"
                >
                  <div className="card-hover relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[#232328] bg-[#0a0a0a] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 group-hover:border-[#ffc83d]/40 group-hover:shadow-[0_24px_60px_-20px_rgba(255,200,61,0.45)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={`${s.name}, premium ${s.name.toLowerCase()} concierge service`}
                          width={1024}
                          height={1024}
                          quality={70}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ICONS.Shield
                            className="size-10 text-[#ffc83d]/40"
                            aria-hidden
                          />
                        </div>
                      )}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(120% 80% at 50% 30%, transparent 60%, rgba(10, 10, 10, 0.6) 100%)",
                        }}
                      />
                      <div className="pointer-events-none absolute bottom-3 left-3 inline-flex size-10 items-center justify-center rounded-md border border-[#ffc83d]/30 bg-[#0a0a0a]/80 text-[#ffc83d] backdrop-blur-sm">
                        <ServiceIcon className="size-5" aria-hidden />
                      </div>
                    </div>

                    {s.comingSoon && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="coral" size="sm">
                          Coming Soon
                        </Badge>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6 lg:p-7">
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
                      <p className="mt-2 flex-1 text-[15px] leading-[1.55] text-white">
                        {s.shortDescription}
                      </p>

                      <span
                        className="link-underline mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#ffc83d] transition-colors duration-150"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.comingSoon ? "Notify me" : "Learn more"}
                        <ICONS.ArrowRight
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-1.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ServicesGrid;
