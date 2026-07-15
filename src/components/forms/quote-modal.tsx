"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { useForm, Controller, useWatch } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Anchor,
  ArrowRight,
  Car,
  HelpCircle,
  Home,
  Loader2,
  Plane,
  Ship,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const INSURANCE_OPTIONS = [
  { value: "car", label: "Car", icon: Car },
  { value: "home", label: "Home", icon: Home },
  { value: "boat", label: "Boat", icon: Ship },
  { value: "yacht", label: "Yacht", icon: Anchor },
  { value: "jet", label: "Jet", icon: Plane },
  { value: "unsure", label: "Not sure", icon: HelpCircle },
] as const;

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d().\-\s]+$/, "Phone number contains invalid characters"),
  insuranceType: z.string().min(1, "Pick one"),
  currentPremium: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\d+(\.\d{1,2})?$/.test(v),
      "Enter a valid amount"
    ),
  notes: z.string().max(500, "Keep it under 500 characters").optional(),
  consent: z.literal(true, {
    message: "You must agree before we can contact you",
  }),
});

type QuoteFormValues = z.infer<typeof schema>;

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function QuoteModal() {
  const { isOpen, closeModal, prefill } = useQuoteModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { submit, isLoading, isSuccess, isError, errorMessage, reset } =
    useFormSubmit("quote-modal", { autoResetMs: 0 });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      insuranceType: "",
      currentPremium: "",
      notes: "",
      consent: false as unknown as true,
    },
  });

  const notesValue = useWatch({ control, name: "notes" }) ?? "";

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    resetForm({
      fullName: prefill.fullName ?? "",
      email: prefill.email ?? "",
      phone: prefill.phone ?? "",
      insuranceType: prefill.insuranceType ?? "",
      currentPremium: "",
      notes: prefill.notes ?? "",
      consent: false as unknown as true,
    });
    reset();
  }, [isOpen, prefill, resetForm, reset]);

  // Esc + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      const node = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      node?.focus();
    }, 220);

    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, closeModal]);

  const onSubmit = handleSubmit(async (values) => {
    await submit(values);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-modal"
          aria-modal="true"
          role="dialog"
          aria-labelledby="quote-modal-title"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close quote form"
            tabIndex={-1}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Card: horizontal split */}
          <motion.div
            ref={dialogRef}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            transition={{ duration: 0.45, ease: EASE }}
            className={cn(
              "relative z-[101] w-full max-w-4xl",
              "bg-[#fbfaf5]",
              "shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]",
              // Mobile: bottom sheet
              "max-lg:rounded-t-[28px] max-lg:rounded-b-none max-lg:max-h-[94dvh]",
              // Desktop: rounded card
              "lg:rounded-[24px] lg:max-h-[88vh]",
              "overflow-hidden",
              "grid grid-cols-1 lg:grid-cols-12"
            )}
          >
            {/* LEFT: dark pitch panel (desktop only) */}
            <PitchPanel reduce={!!reduce} hidden={isSuccess || isError} />

            {/* RIGHT: light form panel */}
            <div
              className={cn(
                "lg:col-span-7 relative bg-[#fbfaf5] flex flex-col",
                "lg:max-h-[88vh] overflow-y-auto overflow-x-hidden"
              )}
            >
              {/* Mobile drag handle */}
              <div
                aria-hidden
                className="lg:hidden flex justify-center pt-2.5 pb-1"
              >
                <span className="block h-1.5 w-10 rounded-full bg-black/10" />
              </div>

              {/* Mobile pitch ribbon */}
              <MobilePitchRibbon />

              {/* Close (top-right of form panel) */}
              <button
                type="button"
                aria-label="Close"
                onClick={closeModal}
                className="absolute right-4 top-4 lg:right-5 lg:top-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#1a1a22] backdrop-blur-md transition-all hover:border-[#0a0a0a] hover:bg-white hover:scale-105 active:scale-95"
              >
                <X className="size-4" aria-hidden />
              </button>

              <div className="relative px-6 sm:px-9 lg:px-10 pt-6 sm:pt-9 lg:pt-10 pb-8 sm:pb-10">
                <AnimatePresence mode="wait">
                  {!isSuccess && !isError && (
                    <motion.div
                      key="form-pane"
                      initial={{ opacity: 0, x: reduce ? 0 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reduce ? 0 : -12 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                    >
                      {/* Header */}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1a22]/15 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">
                        <Sparkles className="size-3 text-[#ffc83d]" aria-hidden />
                        Free audit · 60 seconds
                      </span>

                      <h2
                        id="quote-modal-title"
                        className="mt-4 text-[#0a0a0a] text-balance"
                        style={{
                          fontSize: "clamp(1.7rem, 3.4vw, 2.2rem)",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                        }}
                      >
                        Get your{" "}
                        <span className="relative inline-block">
                          <span className="relative z-10">free</span>
                          <span
                            aria-hidden
                            className="absolute inset-x-0 bottom-1 h-2.5 bg-[#ffc83d]/55"
                          />
                        </span>{" "}
                        insurance audit
                      </h2>
                      <p className="mt-2.5 text-[14px] text-[#2e2e36] leading-[1.55]">
                        Same coverage. Lower premium. We reply within 24 hours.
                      </p>

                      {/* Form */}
                      <motion.form
                        onSubmit={onSubmit}
                        noValidate
                        initial="hidden"
                        animate="show"
                        variants={{
                          show: {
                            transition: {
                              staggerChildren: reduce ? 0 : 0.05,
                              delayChildren: reduce ? 0 : 0.18,
                            },
                          },
                        }}
                        className="mt-6 flex flex-col gap-3.5"
                      >
                        <FieldRow>
                          <FloatingInput
                            label="Full name"
                            autoComplete="name"
                            required
                            error={errors.fullName?.message}
                            register={register("fullName")}
                          />
                        </FieldRow>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FieldRow>
                            <FloatingInput
                              label="Email"
                              type="email"
                              autoComplete="email"
                              required
                              error={errors.email?.message}
                              register={register("email")}
                            />
                          </FieldRow>
                          <FieldRow>
                            <FloatingInput
                              label="Phone"
                              type="tel"
                              autoComplete="tel"
                              required
                              error={errors.phone?.message}
                              register={register("phone")}
                            />
                          </FieldRow>
                        </div>

                        <FieldRow>
                          <Controller
                            name="insuranceType"
                            control={control}
                            render={({ field }) => (
                              <PillGrid
                                label="What are we negotiating?"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.insuranceType?.message}
                              />
                            )}
                          />
                        </FieldRow>

                        <FieldRow>
                          <FloatingInput
                            label="Current annual premium"
                            type="text"
                            inputMode="decimal"
                            prefix="$"
                            helper="Optional · helps us benchmark"
                            error={errors.currentPremium?.message}
                            register={register("currentPremium")}
                          />
                        </FieldRow>

                        <FieldRow>
                          <FloatingTextarea
                            label="Anything we should know?"
                            rows={3}
                            maxLength={500}
                            currentLength={notesValue.length}
                            error={errors.notes?.message}
                            register={register("notes")}
                          />
                        </FieldRow>

                        <FieldRow>
                          <Controller
                            name="consent"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={!!field.value}
                                onChange={(v) => field.onChange(v)}
                                error={errors.consent?.message as string | undefined}
                              >
                                I agree to be contacted by AiM Insurance about
                                this quote.
                              </Checkbox>
                            )}
                          />
                        </FieldRow>

                        <FieldRow>
                          <SubmitButton isLoading={isLoading} />
                          <p className="mt-3 text-[11px] text-[#2e2e36] text-center tabular-nums">
                            $0 if no savings · No commitment · Replies within 24h
                          </p>
                        </FieldRow>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {isSuccess && <SuccessState onClose={closeModal} />}
                  {isError && (
                    <ErrorState
                      message={errorMessage}
                      onRetry={() => reset()}
                      onClose={closeModal}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────── PITCH PANEL (left) ─── */

function PitchPanel({ reduce, hidden }: { reduce: boolean; hidden: boolean }) {
  return (
    <div
      className={cn(
        "hidden lg:flex relative col-span-5 flex-col justify-between p-10 text-white overflow-hidden",
        hidden && "opacity-0 pointer-events-none"
      )}
      style={{
        background:
          "linear-gradient(160deg, #0e0e12 0%, #14141a 50%, #1a1a22 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
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
        {/* Hairline grid mask */}
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

      {/* Top: logo */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
        className="relative"
      >
        <Image
          src="/brand/aim-logo.webp"
          alt="AiM"
          width={120}
          height={69}
          priority
          className="h-7 w-auto"
        />
      </motion.div>

      {/* Middle: savings hero */}
      <div className="relative my-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.26 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffc83d]"
        >
          <Sparkles className="size-3" aria-hidden />
          Avg client saves
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
          className="mt-4 flex items-baseline gap-1"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span
            className="text-[64px] font-extrabold tabular-nums leading-none text-[#ffc83d]"
            style={{ letterSpacing: "-0.04em" }}
          >
            $1,247
          </span>
          <span className="text-base font-semibold text-white">/yr</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.42 }}
          className="mt-3 text-[15px] text-white leading-[1.55] max-w-[18rem]"
        >
          Same coverage. Lower premium. Zero hassle. We negotiate with 50+
          carriers on your behalf.
        </motion.p>
      </div>

      {/* Bottom: testimonial + trust */}
      <div className="relative flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
          className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md p-5"
        >
          <div role="img" className="flex items-center gap-1" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-3.5 fill-[#ffc83d] text-[#ffc83d]"
                aria-hidden
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-white leading-[1.5]">
            &ldquo;Same coverage I had with Allstate, $1,400 less per year. AiM
            handled everything.&rdquo;
          </p>
          <p className="mt-3 text-xs text-white">
            <span className="font-semibold text-white">Sarah M.</span>{" "}
            · Toronto · saved{" "}
            <span className="text-[#ffc83d] font-bold tabular-nums">
              $1,400/yr
            </span>
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.58 }}
          className="grid grid-cols-2 gap-2.5 text-[11px]"
        >
          {[
            { icon: Shield, label: "BBB Accredited" },
            { icon: Sparkles, label: "1100+ clients" },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.label}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <Icon className="size-3.5 text-[#ffc83d]" aria-hidden />
                <span className="font-semibold text-white">{p.label}</span>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}

function MobilePitchRibbon() {
  return (
    <div
      className="lg:hidden flex items-center justify-between gap-3 px-6 sm:px-9 py-3 border-b border-black/8"
      style={{
        background:
          "linear-gradient(90deg, #0e0e12 0%, #14141a 100%)",
      }}
    >
      <Image
        src="/brand/aim-logo.webp"
        alt="AiM"
        width={88}
        height={51}
        priority
        className="h-6 w-auto"
      />
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffc83d]">
        <Sparkles className="size-3" aria-hidden />
        Avg saved $1,247/yr
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── pieces ─── */

function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingInputProps {
  label: string;
  type?: string;
  inputMode?: "decimal" | "numeric" | "text" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
  error?: string;
  helper?: string;
  prefix?: string;
  register?: UseFormRegisterReturn;
}

function FloatingInput({
  label,
  type = "text",
  inputMode,
  autoComplete,
  required,
  error,
  helper,
  prefix,
  register: reg,
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
            : "border-black/12 hover:border-black/22 focus-within:border-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#ffc83d]/45 focus-within:ring-offset-0"
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
          autoComplete={autoComplete}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${id}-err` : helper ? `${id}-hlp` : undefined
          }
          placeholder=" "
          className={cn(
            "peer w-full bg-transparent rounded-xl border-0 outline-none ring-0 text-base sm:text-[15px] text-[#0a0a0a] placeholder-transparent",
            "pt-6 pb-2",
            prefix ? "pl-9 pr-4" : "px-4"
          )}
          {...reg}
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
              : "text-[#7a7a82] peer-[:not(:placeholder-shown)]:text-[#2e2e36] peer-focus:text-[#0a0a0a]"
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
      <FieldHelp error={error} helper={helper} id={id} />
    </div>
  );
}

interface FloatingTextareaProps {
  label: string;
  rows?: number;
  maxLength?: number;
  currentLength?: number;
  error?: string;
  register?: UseFormRegisterReturn;
}

function FloatingTextarea({
  label,
  rows = 3,
  maxLength,
  currentLength = 0,
  error,
  register: reg,
}: FloatingTextareaProps) {
  const id = useId();
  const hasError = !!error;
  const overSoft =
    maxLength && currentLength >= Math.floor(maxLength * 0.9);

  return (
    <div>
      <div
        className={cn(
          "group relative rounded-xl border bg-white transition-colors",
          hasError
            ? "border-[#DC2626]"
            : "border-black/12 hover:border-black/22 focus-within:border-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#ffc83d]/45"
        )}
      >
        <textarea
          id={id}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          placeholder=" "
          className={cn(
            "peer w-full bg-transparent rounded-xl border-0 outline-none resize-y text-base sm:text-[15px] text-[#0a0a0a] placeholder-transparent leading-[1.55]",
            "pt-7 pb-3 px-4"
          )}
          {...reg}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-200 ease-out",
            "top-3 text-[14px] tracking-normal normal-case",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:font-semibold",
            "peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:font-semibold",
            hasError
              ? "text-[#DC2626] peer-focus:text-[#DC2626]"
              : "text-[#7a7a82] peer-[:not(:placeholder-shown)]:text-[#2e2e36] peer-focus:text-[#0a0a0a]"
          )}
        >
          {label}
        </label>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-3 text-[11px]">
        <FieldHelp error={error} id={id} />
        {maxLength && (
          <span
            className={cn(
              "tabular-nums transition-colors ml-auto",
              overSoft ? "text-[#0a0a0a] font-semibold" : "text-[#2e2e36]"
            )}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

function FieldHelp({
  error,
  helper,
  id,
}: {
  error?: string;
  helper?: string;
  id?: string;
}) {
  if (!error && !helper) return null;
  return error ? (
    <motion.p
      key={`err-${id}`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      id={id ? `${id}-err` : undefined}
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
  ) : (
    <p
      id={id ? `${id}-hlp` : undefined}
      className="mt-1.5 text-[12px] text-[#2e2e36]"
    >
      {helper}
    </p>
  );
}

interface PillGridProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

function PillGrid({ label, value, onChange, error }: PillGridProps) {
  return (
    <div>
      <span className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#0a0a0a] mb-2">
        {label} <span className="text-[#DC2626]" aria-hidden>*</span>
      </span>
      <div
        role="radiogroup"
        aria-label={label}
        aria-invalid={!!error || undefined}
        className="grid grid-cols-3 sm:grid-cols-6 gap-1.5"
      >
        {INSURANCE_OPTIONS.map((opt) => {
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
                "relative flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors",
                checked
                  ? "border-transparent text-[#0a0a0a]"
                  : "border-black/10 bg-white text-[#2e2e36] hover:text-[#0a0a0a] hover:border-black/22"
              )}
            >
              {checked && (
                <motion.span
                  layoutId="quote-pill-active"
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
                <Icon className="size-4" aria-hidden />
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

interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  error?: string;
  children: React.ReactNode;
}

function Checkbox({ checked, onChange, error, children }: CheckboxProps) {
  return (
    <div>
      <label className="group flex items-start gap-3 cursor-pointer select-none">
        <span className="relative mt-0.5 inline-flex size-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            aria-invalid={!!error || undefined}
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-md border-2 transition-all",
              checked
                ? "border-[#0a0a0a] bg-[#0a0a0a]"
                : error
                  ? "border-[#DC2626] bg-white"
                  : "border-black/22 bg-white group-hover:border-[#0a0a0a]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffc83d]/55"
            )}
          />
          <AnimatePresence>
            {checked && (
              <motion.svg
                key="tick"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffc83d"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                aria-hidden
              >
                <motion.path
                  d="M4 12l5 5L20 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
        <span className="text-sm text-[#1a1a22] leading-snug pt-0.5">
          {children}
        </span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-2 ml-8 inline-flex items-center gap-1 text-[12px] text-[#DC2626]"
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

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      whileHover={isLoading ? undefined : { y: -1 }}
      whileTap={isLoading ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold overflow-hidden",
        "bg-[#0a0a0a] text-white",
        "shadow-[0_8px_24px_-6px_rgba(10,10,10,0.4)]",
        "hover:shadow-[0_12px_32px_-6px_rgba(255,200,61,0.55)]",
        "transition-shadow",
        "disabled:opacity-80 disabled:cursor-not-allowed"
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Sweep highlight on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="relative inline-flex items-center gap-2"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Submitting…
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="relative inline-flex items-center gap-2"
          >
            Submit quote request
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex size-6 items-center justify-center rounded-full bg-[#ffc83d] text-[#0a0a0a]"
            >
              <ArrowRight className="size-3.5" aria-hidden />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ───────────────────────────────────────────────────────── states ─── */

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative flex flex-col items-center text-center pt-2 pb-2"
    >
      <div className="relative inline-flex">
        <motion.span
          aria-hidden
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(5,150,105,0.45), transparent 70%)",
          }}
        />
        <motion.span
          aria-hidden
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 14,
            delay: 0.05,
          }}
          className="relative inline-flex size-20 items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(5,150,105,0.18), rgba(5,150,105,0.06) 60%, transparent 100%)",
            boxShadow: "0 12px 32px -8px rgba(5,150,105,0.35)",
          }}
        >
          <motion.svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <motion.path
              d="M4 12l5 5L20 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
            />
          </motion.svg>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-1.5 rounded-full bg-[#ffc83d]"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos((i / 6) * Math.PI * 2) * 56,
                y: Math.sin((i / 6) * Math.PI * 2) * 56,
                opacity: [0, 1, 0],
                scale: [0, 1, 0.4],
              }}
              transition={{ duration: 0.9, delay: 0.45 + i * 0.04 }}
            />
          ))}
        </motion.span>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mt-7 text-[#0a0a0a]"
        style={{
          fontSize: "1.7rem",
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
        }}
      >
        You&rsquo;re in.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="mt-3 max-w-sm text-sm text-[#2e2e36] leading-[1.6]"
      >
        We&rsquo;ll review your details and send a side-by-side savings audit
        within 24 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.78 }}
        className="mt-7 flex w-full flex-col gap-2.5"
      >
        <Link
          href="/calculator"
          onClick={onClose}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0a0a0a] text-white px-7 py-4 text-base font-semibold hover:shadow-[0_12px_32px_-6px_rgba(255,200,61,0.55)] transition-shadow"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Try the savings calculator
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#ffc83d] text-[#0a0a0a]">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[#1a1a22] transition-colors hover:border-[#0a0a0a]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function ErrorState({
  message,
  onRetry,
  onClose,
}: {
  message: string | null;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center text-center pt-2"
    >
      <div
        role="alert"
        className="relative w-full overflow-hidden rounded-2xl border border-[#DC2626]/30 bg-[#fff1f1] p-6"
      >
        <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-[#DC2626]/15 text-[#DC2626]">
          <X className="size-6" aria-hidden />
        </div>
        <h3
          className="mt-4 text-[#0a0a0a]"
          style={{
            fontSize: "1.2rem",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          Something went wrong
        </h3>
        <p className="mt-2 text-sm text-[#2e2e36] leading-[1.55]">
          {message ?? "Please try again. Your details are still saved."}
        </p>
      </div>
      <div className="mt-5 flex w-full flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onRetry}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0a0a0a] text-white px-6 py-3.5 text-base font-semibold hover:shadow-[0_12px_32px_-6px_rgba(255,200,61,0.55)] transition-shadow"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Try again
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-base font-semibold text-[#1a1a22] hover:border-[#0a0a0a]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

function reduceMotionGuard(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
}

export default QuoteModal;
