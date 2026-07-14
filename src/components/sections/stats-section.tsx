"use client";

import { m as motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section
      aria-label="AiM Insurance impact"
      className="bg-surface py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Proven Results"
          title="Our Journey in Numbers"
          description="Every figure represents real clients we've helped pay less for the same coverage."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-gradient-lavender rounded-3xl p-8 lg:p-10 min-h-[260px] flex flex-col justify-between border border-white/40 shadow-sm hover:shadow-card-hover transition-shadow"
            >
              <div className="text-5xl lg:text-6xl font-heading font-extrabold text-primary leading-none">
                <CountUp value={s.value} />
              </div>
              <div className="mt-6 text-sm font-heading font-semibold text-primary/90 leading-relaxed">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
