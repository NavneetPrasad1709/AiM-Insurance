"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SavingsChartProps {
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function SavingsChart({ className }: SavingsChartProps) {

  // Premium per month — high pre-switch, drops at index 8 (Sept), stays low.
  const points = [
    268, 268, 268, 268, 268, 268, 268, 268, // Jan-Aug @ $268/mo (= $3,214/yr)
    197, 197, 197, 197, // Sep-Dec @ $197/mo (= $2,367/yr)
  ];

  // Map to viewBox 0-720 x, 16-200 y (inverted)
  const xStep = 720 / (points.length - 1);
  const yMin = 170; // bottom premium
  const yMax = 220; // top premium
  const ySpan = yMax - yMin; // 50
  const yScale = (n: number) => 200 - ((n - yMin) / ySpan) * 160 - 16;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * xStep} ${yScale(p)}`)
    .join(" ");

  const areaPath = `${path} L 720 200 L 0 200 Z`;

  // Switch marker at index 8
  const switchX = 8 * xStep;
  const switchY = yScale(points[7]);

  return (
    <div
      className={cn(
        "relative w-full max-w-[720px] rounded-[12px] border border-[#232328] bg-[#111113] p-5 sm:p-6 font-[var(--font-inter)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            12-month savings
          </span>
          <span className="mt-1 text-base sm:text-lg font-bold text-white">
            Allstate · switched Sept 12
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            Total saved
          </span>
          <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#ffc83d] tabular-nums tracking-[-0.02em]">
            $1,247
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5">
        <svg
          viewBox="0 0 720 220"
          className="w-full h-44 sm:h-56"
          preserveAspectRatio="none"
          aria-label="Monthly premium chart, dropping after the September switch"
        >
          <defs>
            <linearGradient id="savingsAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc83d" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ffc83d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hairline grid */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2="720"
              y1={20 + i * 50}
              y2={20 + i * 50}
              stroke="#1a1a1f"
              strokeWidth="1"
            />
          ))}

          {/* Pre-switch dim line from $268 baseline (greyed, just months 0-7) */}
          <motion.path
            d={`M 0 ${yScale(268)} L ${7 * xStep} ${yScale(268)}`}
            fill="none"
            stroke="#5c5c66"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
          />

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#savingsAreaFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          />

          {/* Main line */}
          <motion.path
            d={path}
            fill="none"
            stroke="#ffc83d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          />

          {/* Vertical switch marker */}
          <motion.line
            x1={switchX}
            x2={switchX}
            y1={switchY - 4}
            y2={200}
            stroke="#ffc83d"
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          />

          {/* Switch dot */}
          <motion.circle
            cx={switchX}
            cy={switchY}
            r="5"
            fill="#0a0a0a"
            stroke="#ffc83d"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 1.8, ease: EASE }}
          />

          {/* Switch annotation */}
          <motion.g
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 2, ease: EASE }}
          >
            <rect
              x={switchX - 64}
              y={switchY - 38}
              width="128"
              height="22"
              rx="4"
              fill="#0a0a0a"
              stroke="#232328"
            />
            <text
              x={switchX}
              y={switchY - 22}
              textAnchor="middle"
              fontFamily="var(--font-inter)"
              fontSize="11"
              fontWeight="600"
              fill="#ffc83d"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              Switched · Sep 12
            </text>
          </motion.g>

          {/* End-point marker + label */}
          <motion.circle
            cx={720}
            cy={yScale(points[points.length - 1])}
            r="4"
            fill="#ffc83d"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 2.1, ease: EASE }}
          />
        </svg>

        {/* X axis */}
        <div className="mt-2 grid grid-cols-12 text-[10px] font-semibold text-white tabular-nums">
          {MONTHS.map((m) => (
            <span key={m} className="text-center">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-[#232328]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            Pre-switch
          </div>
          <div className="mt-1 text-base font-bold text-white tabular-nums line-through">
            $268/mo
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            Post-switch
          </div>
          <div className="mt-1 text-base font-bold text-white tabular-nums">
            $197/mo
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            Reduction
          </div>
          <div className="mt-1 text-base font-bold text-[#4fe0b0] tabular-nums">
            −26%
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsChart;
