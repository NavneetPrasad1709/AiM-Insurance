"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  HeartHandshake,
  Home,
  Loader2,
  Phone,
  Plane,
  Ship,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const TYPE_OPTIONS = [
  { value: "car", label: "Car", icon: Car },
  { value: "home", label: "Home", icon: Home },
  { value: "boat", label: "Boat", icon: Ship },
  { value: "yacht", label: "Yacht", icon: Anchor },
  { value: "jet", label: "Jet", icon: Plane },
] as const;

const STEPS = [
  { n: 1, title: "Choose your insurance", desc: "Pick what we’re negotiating" },
  { n: 2, title: "Current premium", desc: "What you pay today" },
  { n: 3, title: "Policy details", desc: "Optional — sharpens the estimate" },
  { n: 4, title: "Your savings", desc: "Live benchmark vs market" },
];

const SAVINGS_RATES: Record<string, number> = {
  car: 0.3,
  home: 0.25,
  boat: 0.28,
  yacht: 0.32,
  jet: 0.22,
};

interface FormState {
  insuranceType: string;
  currentPremium: string;
  coverageAmount: string;
  yearsWithProvider: string;
  zipCode: string;
}

export function SavingsCalculator() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    insuranceType: "",
    currentPremium: "",
    coverageAmount: "",
    yearsWithProvider: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const { openModal } = useQuoteModal();
  const { submit, isLoading, isError, errorMessage, isSuccess } =
    useFormSubmit("savings-calculator", { autoResetMs: 0 });

  const setField = <K extends keyof FormState>(k: K, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const e: Partial<FormState> = {};
    if (s === 0 && !form.insuranceType) e.insuranceType = "Pick one to continue";
    if (s === 1) {
      if (!form.currentPremium) e.currentPremium = "Required";
      else if (!/^\d+(\.\d{1,2})?$/.test(form.currentPremium))
        e.currentPremium = "Enter a number";
    }
    if (s === 2) {
      if (form.coverageAmount && !/^\d+$/.test(form.coverageAmount))
        e.coverageAmount = "Whole number";
      if (form.yearsWithProvider && !/^\d+$/.test(form.yearsWithProvider))
        e.yearsWithProvider = "Whole number";
      if (form.zipCode && !/^\d{5}$/.test(form.zipCode))
        e.zipCode = "5 digits";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validateStep(step)) return;
    if (step === 2) await submit(form);
    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const estimate = useMemo(() => {
    const premium = Number(form.currentPremium || 0);
    if (!premium) return { saved: 0, newPremium: 0, percent: 0 };
    const rate = SAVINGS_RATES[form.insuranceType] ?? 0.25;
    const saved = Math.round(premium * rate);
    return {
      saved,
      newPremium: premium - saved,
      percent: Math.round(rate * 100),
    };
  }, [form]);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 overflow-hidden",
        "bg-[#fbfaf5]",
        "rounded-[24px] border border-black/8",
        "shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* LEFT — dark pitch panel */}
      <PitchPanel reduce={!!reduce} currentStep={step} />

      {/* RIGHT — cream form panel */}
      <div className="lg:col-span-7 relative bg-[#fbfaf5] p-6 sm:p-9 lg:p-10 flex flex-col min-h-[560px]">
        {/* Mobile dark ribbon header */}
        <MobilePitchRibbon currentStep={step} />

        <Stepper step={step} />

        <div className="flex-1 mt-6 sm:mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: reduce ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -24 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-col gap-5"
            >
              {step === 0 && (
                <StepIntro
                  eyebrow={`Step 1 of 4`}
                  title="What are we negotiating?"
                  description="Pick the insurance you want benchmarked. We support five categories — pick whichever fits."
                >
                  <PillGrid
                    value={form.insuranceType}
                    onChange={(v) => setField("insuranceType", v)}
                    error={errors.insuranceType}
                  />
                </StepIntro>
              )}
              {step === 1 && (
                <StepIntro
                  eyebrow="Step 2 of 4"
                  title="What do you pay today?"
                  description="Your current annual premium — exactly the number on your renewal letter."
                >
                  <FloatingInput
                    label="Current annual premium"
                    inputMode="decimal"
                    required
                    prefix="$"
                    value={form.currentPremium}
                    onChange={(e) => setField("currentPremium", e.target.value)}
                    error={errors.currentPremium}
                    helper="What you pay your current carrier each year"
                  />
                </StepIntro>
              )}
              {step === 2 && (
                <StepIntro
                  eyebrow="Step 3 of 4"
                  title="Tell us about your policy"
                  description="All optional — but the more we know, the tighter the estimate."
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FloatingInput
                      label="Coverage amount"
                      inputMode="numeric"
                      prefix="$"
                      value={form.coverageAmount}
                      onChange={(e) =>
                        setField("coverageAmount", e.target.value)
                      }
                      error={errors.coverageAmount}
                      helper="Dwelling, hull, or vehicle value"
                    />
                    <FloatingInput
                      label="Years with provider"
                      inputMode="numeric"
                      value={form.yearsWithProvider}
                      onChange={(e) =>
                        setField("yearsWithProvider", e.target.value)
                      }
                      error={errors.yearsWithProvider}
                    />
                  </div>
                  <FloatingInput
                    label="ZIP / postal code"
                    inputMode="numeric"
                    maxLength={5}
                    value={form.zipCode}
                    onChange={(e) => setField("zipCode", e.target.value)}
                    error={errors.zipCode}
                  />
                </StepIntro>
              )}
              {step === 3 && (
                <ResultStep
                  estimate={estimate}
                  insuranceType={form.insuranceType}
                  openModal={openModal}
                />
              )}

              {isError && step < 3 && (
                <div
                  role="alert"
                  className="rounded-xl border border-[#DC2626]/30 bg-[#fff1f1] px-4 py-3 text-sm text-[#7a1d1d]"
                >
                  {errorMessage ?? "Something went wrong. Please try again."}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav (steps 0-2) */}
        {step < 3 && (
          <div className="mt-8 pt-6 border-t border-black/8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a22] transition-colors hover:border-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
            <PrimaryButton onClick={next} loading={isLoading}>
              {isLoading
                ? "Calculating…"
                : step === 2
                  ? "See my savings"
                  : "Continue"}
            </PrimaryButton>
          </div>
        )}

        {step === 3 && isSuccess && (
          <p className="mt-2 text-xs text-[#059669] text-center">
            ✓ Estimate saved — your details are with our team.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────── PITCH PANEL ─── */

function PitchPanel({
  reduce,
  currentStep,
}: {
  reduce: boolean;
  currentStep: number;
}) {
  return (
    <div
      className="hidden lg:flex relative col-span-5 flex-col justify-between p-10 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0e0e12 0%, #14141a 50%, #1a1a22 100%)",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.32), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
      </div>

      {/* Top — logo + savings stat */}
      <div className="relative">
        <Image
          src="/brand/aim-logo.webp"
          alt="AiM"
          width={120}
          height={42}
          priority
          className="h-7 w-auto"
        />

        <div className="mt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffc83d]">
            <Sparkles className="size-3" aria-hidden />
            Avg client saves
          </span>
          <div
            className="mt-3 flex items-baseline gap-1"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span
              className="text-[56px] font-extrabold tabular-nums leading-none text-[#ffc83d]"
              style={{ letterSpacing: "-0.04em" }}
            >
              $1,247
            </span>
            <span className="text-base font-semibold text-white/70">/yr</span>
          </div>
          <p className="mt-3 text-sm text-white/70 leading-[1.55] max-w-[18rem]">
            Same coverage. Lower premium. Live benchmark against 50+ carriers.
          </p>
        </div>
      </div>

      {/* Middle — step progression */}
      <div className="relative my-10">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-4">
          The 4-step audit
        </span>
        <ol className="flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const active = i === currentStep;
            const done = i < currentStep;
            return (
              <li
                key={s.n}
                className={cn(
                  "relative flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                  active
                    ? "border-[#ffc83d]/40 bg-[#ffc83d]/8"
                    : done
                      ? "border-white/8 bg-white/[0.02]"
                      : "border-white/6 bg-transparent"
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-all",
                    active
                      ? "bg-[#ffc83d] text-[#0a0a0a] shadow-[0_0_0_4px_rgba(255,200,61,0.18)]"
                      : done
                        ? "bg-[#10d889]/15 text-[#10d889] border border-[#10d889]/40"
                        : "bg-white/5 text-white/55 border border-white/10"
                  )}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {done ? <Check className="size-3.5" aria-hidden /> : s.n}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      active ? "text-white" : done ? "text-white/85" : "text-white/65"
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="text-[11px] text-white/55 leading-[1.4]">
                    {s.desc}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Bottom — testimonial */}
      <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md p-5">
        <div className="flex items-center gap-1" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 fill-[#ffc83d] text-[#ffc83d]"
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-white/85 leading-[1.5]">
          &ldquo;Estimate landed within 5% of the actual quote. We saved
          $1,400/yr.&rdquo;
        </p>
        <p className="mt-3 text-xs text-white/55">
          <span className="font-semibold text-white/85">Sarah M.</span>{" "}
          · Toronto · saved{" "}
          <span className="text-[#ffc83d] font-bold tabular-nums">
            $1,400/yr
          </span>
        </p>
      </div>
    </div>
  );
}

function MobilePitchRibbon({ currentStep }: { currentStep: number }) {
  return (
    <div
      className="lg:hidden -mx-6 sm:-mx-9 -mt-6 sm:-mt-9 mb-6 flex items-center justify-between gap-3 px-6 sm:px-9 py-3 border-b border-black/8"
      style={{
        background:
          "linear-gradient(90deg, #0e0e12 0%, #14141a 100%)",
      }}
    >
      <Image
        src="/brand/aim-logo.webp"
        alt="AiM"
        width={88}
        height={32}
        priority
        className="h-6 w-auto"
      />
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffc83d]">
        <Sparkles className="size-3" aria-hidden />
        Step {Math.min(currentStep + 1, 4)} of 4
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────── stepper + intro ─── */

function Stepper({ step }: { step: number }) {
  return (
    <div className="lg:hidden flex items-center gap-2">
      {STEPS.map((s, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums transition-all",
                active
                  ? "bg-[#0a0a0a] text-[#ffc83d]"
                  : done
                    ? "bg-[#10d889]/15 text-[#059669] border border-[#10d889]/40"
                    : "bg-white text-[#9a9aa3] border border-black/15"
              )}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {done ? <Check className="size-3.5" aria-hidden /> : s.n}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  done ? "bg-[#10d889]" : "bg-black/12"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5a5a64]">
          <span className="size-1.5 rounded-full bg-[#ffc83d]" />
          {eyebrow}
        </span>
        <h2
          className="text-[#0a0a0a] text-balance"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2rem)",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        <p className="text-[14px] text-[#5a5a64] leading-[1.55] max-w-md">
          {description}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* ───────────────────────────────────────────── form pieces ─── */

interface FloatingInputProps {
  label: string;
  type?: string;
  inputMode?: "decimal" | "numeric" | "text" | "email" | "tel";
  required?: boolean;
  error?: string;
  helper?: string;
  prefix?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

function FloatingInput({
  label,
  type = "text",
  inputMode,
  required,
  error,
  helper,
  prefix,
  value,
  onChange,
  maxLength,
}: FloatingInputProps) {
  const id = useId();
  const hasError = !!error;
  return (
    <div>
      <motion.div
        animate={
          hasError && !reduceMotionGuard()
            ? { x: [-4, 4, -3, 3, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.32 }}
        className={cn(
          "group relative rounded-xl border bg-white transition-colors",
          hasError
            ? "border-[#DC2626]"
            : "border-black/12 hover:border-black/22 focus-within:border-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#ffc83d]/45"
        )}
      >
        {prefix && (
          <span
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold transition-colors",
              hasError ? "text-[#DC2626]" : "text-[#0a0a0a]"
            )}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${id}-err` : helper ? `${id}-hlp` : undefined
          }
          placeholder=" "
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            "peer w-full bg-transparent rounded-xl border-0 outline-none ring-0 text-base sm:text-[15px] text-[#0a0a0a] placeholder-transparent",
            "pt-6 pb-2",
            prefix ? "pl-9 pr-4" : "px-4"
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute transition-all duration-200 ease-out",
            prefix ? "left-9" : "left-4",
            "top-1/2 -translate-y-1/2 text-[14px] tracking-normal normal-case",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:font-semibold",
            "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:font-semibold",
            hasError
              ? "text-[#DC2626] peer-focus:text-[#DC2626]"
              : "text-[#7a7a82] peer-focus:text-[#0a0a0a]"
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-[#DC2626]" aria-hidden>
              *
            </span>
          )}
        </label>
      </motion.div>
      <AnimatePresence>
        {error ? (
          <motion.p
            key={`err-${id}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            id={`${id}-err`}
            className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-[#DC2626]"
          >
            <span
              aria-hidden
              className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#DC2626] text-white text-[9px] font-black"
            >
              !
            </span>
            {error}
          </motion.p>
        ) : helper ? (
          <p id={`${id}-hlp`} className="mt-1.5 text-[12px] text-[#7a7a82]">
            {helper}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function PillGrid({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Insurance type"
        aria-invalid={!!error || undefined}
        className="grid grid-cols-2 sm:grid-cols-5 gap-2"
      >
        {TYPE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const checked = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => onChange(opt.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-4 text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors",
                checked
                  ? "border-transparent text-[#0a0a0a]"
                  : "border-black/10 bg-white text-[#5a5a64] hover:text-[#0a0a0a] hover:border-black/22"
              )}
            >
              {checked && (
                <motion.span
                  layoutId="calc-pill-active"
                  aria-hidden
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-[#fff5d4] ring-2 ring-[#ffc83d]"
                  style={{
                    boxShadow:
                      "0 8px 24px -8px rgba(255, 200, 61, 0.55)",
                  }}
                />
              )}
              <span className="relative">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="relative">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#DC2626]"
          >
            <span
              aria-hidden
              className="inline-flex size-3.5 items-center justify-center rounded-full bg-[#DC2626] text-white text-[9px] font-black"
            >
              !
            </span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PrimaryButton({
  onClick,
  children,
  loading,
}: {
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={loading ? undefined : { y: -1 }}
      whileTap={loading ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold",
        "bg-[#0a0a0a] text-white",
        "shadow-[0_8px_24px_-6px_rgba(10,10,10,0.4)]",
        "hover:shadow-[0_12px_32px_-6px_rgba(255,200,61,0.55)] transition-shadow",
        "disabled:opacity-80 disabled:cursor-not-allowed"
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative inline-flex items-center gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : null}
        {children}
        {!loading && (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#ffc83d] text-[#0a0a0a]">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        )}
      </span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────── result step ─── */

interface ResultStepProps {
  estimate: { saved: number; newPremium: number; percent: number };
  insuranceType: string;
  openModal: ReturnType<typeof useQuoteModal>["openModal"];
}

function ResultStep({ estimate, insuranceType, openModal }: ResultStepProps) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5a5a64]">
          <span className="size-1.5 rounded-full bg-[#10d889]" />
          Step 4 of 4 · Result
        </span>
        <h2
          className="text-[#0a0a0a] text-balance"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2rem)",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Your estimated{" "}
          <span className="relative inline-block">
            <span className="relative z-10">savings</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 h-2.5 bg-[#ffc83d]/55"
            />
          </span>
        </h2>
      </div>

      {/* Big savings number */}
      <div className="rounded-2xl border border-[#ffc83d]/40 bg-gradient-to-br from-[#fff5d4] to-[#fbfaf5] p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0a0a0a]/15 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">
          <TrendingUp className="size-3 text-[#0a0a0a]" aria-hidden />
          Annual savings estimate
        </div>
        <div
          className="mt-4 text-6xl sm:text-7xl font-extrabold tabular-nums leading-none text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.04em" }}
        >
          <CountUp value={fmt(estimate.saved)} />
        </div>
        <p className="mt-3 text-sm text-[#5a5a64]">
          A{" "}
          <span className="font-bold text-[#0a0a0a] tabular-nums">
            {estimate.percent}%
          </span>{" "}
          drop on your current premium
        </p>
      </div>

      {/* Before / after bar */}
      <BeforeAfterBar
        oldValue={estimate.saved + estimate.newPremium}
        newValue={estimate.newPremium}
      />

      <p className="text-[11px] text-[#7a7a82] leading-[1.55]">
        Based on AiM benchmark data. Actual savings depend on carrier rate
        filings, underwriting, and your driver / property profile. We&rsquo;ll
        confirm the exact number in your audit.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() =>
            openModal({
              insuranceType: insuranceType || undefined,
            })
          }
          className="group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0a0a0a] text-white px-7 py-4 text-base font-semibold hover:shadow-[0_12px_32px_-6px_rgba(255,200,61,0.55)] transition-shadow relative"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative inline-flex items-center gap-2">
            Get my exact quote
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#ffc83d] text-[#0a0a0a]">
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
          </span>
        </button>
        <Link
          href="/request-a-concierge"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#ffc83d] bg-[#fff5d4] px-7 py-3.5 text-base font-semibold text-[#0a0a0a] hover:bg-[#ffe88a] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <HeartHandshake className="size-4" aria-hidden />
          Request a concierge
        </Link>
        <Link
          href="/contact?intent=call"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/12 bg-white px-7 py-3.5 text-base font-semibold text-[#1a1a22] hover:border-[#0a0a0a] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Phone className="size-4 text-[#0a0a0a]" aria-hidden />
          Book a 15-min call
        </Link>
      </div>
    </div>
  );
}

function BeforeAfterBar({
  oldValue,
  newValue,
}: {
  oldValue: number;
  newValue: number;
}) {
  const total = Math.max(oldValue, 1);
  const newPct = Math.max(2, Math.min(100, (newValue / total) * 100));
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-5">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
        <span className="text-[#7a7a82]">Today</span>
        <span className="text-[#0a0a0a]">With AiM</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <div
            className="text-2xl font-extrabold tabular-nums text-[#7a7a82] line-through decoration-[#7a7a82]/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            $
            {new Intl.NumberFormat("en-US").format(oldValue)}
          </div>
          <div className="text-[11px] text-[#9a9aa3] mt-0.5">/year</div>
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-extrabold tabular-nums text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ${new Intl.NumberFormat("en-US").format(newValue)}
          </div>
          <div className="text-[11px] text-[#059669] mt-0.5 font-semibold">
            /year
          </div>
        </div>
      </div>
      <div className="mt-4 relative h-2 rounded-full bg-black/8 overflow-hidden">
        <motion.span
          aria-hidden
          initial={{ width: 0 }}
          animate={{ width: `${newPct}%` }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="absolute inset-y-0 left-0 rounded-full bg-[#ffc83d]"
        />
      </div>
    </div>
  );
}

function reduceMotionGuard(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
}

export default SavingsCalculator;
