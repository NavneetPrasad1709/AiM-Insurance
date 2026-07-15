import Image from "next/image";
import { CountUp } from "@/components/ui/count-up";
import { ICONS } from "@/lib/icons";

const STATS = [
  { value: "1100+", label: "Clients served", icon: "HeartHandshake" as const },
  { value: "$6.14M+", label: "Negotiated savings", icon: "TrendingUp" as const },
  { value: "$1,247+", label: "Avg. annual savings", icon: "Sparkles" as const },
  { value: "31%", label: "Avg. premium reduction", icon: "BarChart3" as const },
];

export function TrustBanner() {
  return (
    <section
      aria-label="Trusted by clients across North America"
      className="relative bg-background-cream border-y border-[#232328]"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="text-center" data-reveal>
          <p
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Trusted across USA · Canada · UAE
          </p>
          <h2
            className="mt-3 text-white"
            style={{
              fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Real savings. Real clients.{" "}
            <span className="text-[#ffc83d]">Real receipts.</span>
          </h2>
        </div>

        {/* Trust badges row */}
        <div className="mt-10" data-reveal>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <li className="inline-flex items-center gap-3 rounded-[8px] border border-[#232328] bg-[#111113] px-5 py-3">
              <Image
                src="/brand/bbb-logo.webp"
                alt="BBB Accredited Business"
                width={88}
                height={32}
                className="h-8 w-auto"
                style={{ width: "auto", height: "auto" }}
              />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-xs font-semibold text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  BBB Accredited
                </span>
                <span className="text-[11px] text-white">
                  A+ Rating
                </span>
              </div>
            </li>
            <li className="inline-flex items-center gap-3 rounded-[8px] border border-[#232328] bg-[#111113] px-5 py-3">
              <Image
                src="/brand/google-rating.webp"
                alt="Google Rating 5.0 stars"
                width={120}
                height={36}
                className="h-9 w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </li>
            <li className="inline-flex items-center gap-3 rounded-[8px] border border-[#232328] bg-[#111113] px-5 py-3">
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-[#14110a] text-[#ffc83d] border border-[#ffc83d]/30">
                <ICONS.Award className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Featured in
                </span>
                <span
                  className="mt-0.5 text-sm font-bold text-white"
                  style={{
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0.18em",
                  }}
                >
                  NEWSWIRE
                </span>
              </div>
            </li>
            <li className="inline-flex items-center gap-3 rounded-[8px] border border-[#4fe0b0]/30 bg-[#0a1612] px-5 py-3">
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-[#0f2624] text-[#4fe0b0] border border-[#4fe0b0]/30">
                <ICONS.Shield className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-xs font-semibold text-white tabular-nums"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  $0 if no savings
                </span>
                <span className="text-[11px] text-white">
                  Risk-free guarantee
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Stat cards */}
        <div
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          data-reveal
        >
          {STATS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <div key={s.label}>
                <div
                  className="card-hover group relative h-full rounded-[12px] border border-[#232328] bg-[#111113] p-5 sm:p-6"
                >
                  <Icon className="size-5 text-[#ffc83d]" aria-hidden />
                  <div
                    className="mt-3 text-3xl sm:text-4xl font-extrabold text-white leading-none tracking-[-0.04em] tabular-nums"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-2 text-[12px] sm:text-[13px] font-semibold text-white leading-snug">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustBanner;
