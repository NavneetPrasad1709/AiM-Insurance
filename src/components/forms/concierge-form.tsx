"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Textarea } from "@/components/ui/input";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HEAR_OPTIONS = [
  { value: "google", label: "Google" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "news", label: "News Article" },
  { value: "other", label: "Other" },
];

const INSURANCE_OPTIONS = [
  { value: "car", label: "Car Insurance" },
  { value: "home", label: "Home Insurance" },
  { value: "boat", label: "Boat Insurance" },
  { value: "yacht", label: "Yacht Insurance" },
  { value: "jet", label: "Jet Insurance" },
] as const;

const CONTACT_METHODS = [
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text Message" },
];

const TIME_BLOCKS = [
  { value: "morning", label: "Morning · 9 AM – 12 PM" },
  { value: "afternoon", label: "Afternoon · 12 – 5 PM" },
  { value: "evening", label: "Evening · 5 – 8 PM" },
];

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d().\-\s]+$/, "Invalid characters"),
  zip: z
    .string()
    .regex(/^\d{5}$/, "5-digit ZIP code"),
  hearAbout: z.string().min(1, "Please select an option"),
  insuranceTypes: z
    .array(z.enum(["car", "home", "boat", "yacht", "jet"]))
    .min(1, "Pick at least one"),
  currentProvider: z.string().optional(),
  currentPremium: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), "Invalid amount"),
  renewalDate: z.string().optional(),
  vehicleCount: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), "Whole number"),
  contactMethod: z.enum(["phone", "email", "text"], {
    message: "Pick one",
  }),
  timeBlock: z.enum(["morning", "afternoon", "evening"], {
    message: "Pick one",
  }),
  notes: z.string().max(800, "Keep it under 800 chars").optional(),
  consent: z.literal(true, {
    message: "You must accept the terms",
  }),
});

type ConciergeFormValues = z.infer<typeof schema>;

const sectionTitle = (n: number, t: string) => (
  <div className="flex items-center gap-3 mb-6">
    <span
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#ffc83d]/30 bg-[#1a0e0a] text-xs font-bold tabular-nums text-[#ffc83d]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {String(n).padStart(2, "0")}
    </span>
    <h3
      className="text-white"
      style={{
        fontSize: "1.15rem",
        fontFamily: "var(--font-inter)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
      }}
    >
      {t}
    </h3>
  </div>
);

export function ConciergeForm() {
  const { submit, isLoading, isSuccess, errorMessage, isError, reset } =
    useFormSubmit("concierge-request", { autoResetMs: 0 });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<ConciergeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zip: "",
      hearAbout: "",
      insuranceTypes: [],
      currentProvider: "",
      currentPremium: "",
      renewalDate: "",
      vehicleCount: "",
      notes: "",
      consent: false as unknown as true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contactMethod: undefined as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      timeBlock: undefined as any,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit(values);
  });

  if (isSuccess) {
    return <ConciergeSuccess onAnother={() => { resetForm(); reset(); }} />;
  }

  return (
    <div className="rounded-[16px] border border-[#232328] bg-[#111113] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-3 mb-8">
        <h2
          className="text-white"
          style={{
            fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Request your personal{" "}
          <span className="text-[#ffc83d]">insurance concierge.</span>
        </h2>
        <p className="text-sm text-white/70 leading-[1.6]">
          Tell us about yourself and your insurance needs. A dedicated concierge
          will be assigned to handle everything for you.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
        {/* Section 1 */}
        <section>
          {sectionTitle(1, "Personal information")}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First name"
              required
              autoComplete="given-name"
              error={errors.firstName?.message}
              register={register("firstName")}
            />
            <Input
              label="Last name"
              required
              autoComplete="family-name"
              error={errors.lastName?.message}
              register={register("lastName")}
            />
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              error={errors.email?.message}
              register={register("email")}
            />
            <Input
              label="Phone"
              type="tel"
              required
              autoComplete="tel"
              error={errors.phone?.message}
              register={register("phone")}
            />
            <Input
              label="ZIP code"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="10001"
              error={errors.zip?.message}
              register={register("zip")}
            />
            <Controller
              name="hearAbout"
              control={control}
              render={({ field }) => (
                <Select
                  label="How did you hear about us?"
                  required
                  placeholder="Choose one"
                  options={HEAR_OPTIONS}
                  error={errors.hearAbout?.message}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              )}
            />
          </div>
        </section>

        <hr className="border-[#232328]" />

        {/* Section 2 */}
        <section>
          {sectionTitle(2, "Insurance details")}
          <div className="flex flex-col gap-5">
            <fieldset>
              <legend className="text-sm font-heading font-semibold text-white mb-3">
                Insurance type{" "}
                <span className="text-[#DC2626]" aria-hidden>*</span>
              </legend>
              <Controller
                name="insuranceTypes"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INSURANCE_OPTIONS.map((opt) => {
                      const checked = field.value?.includes(opt.value);
                      return (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer transition-colors",
                            checked
                              ? "border-[#ffc83d] bg-[#1a0e0a] text-white"
                              : "border-[#232328] bg-[#0a0a0a] text-white/80 hover:border-[#ffc83d]/40"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={!!checked}
                            onChange={(e) => {
                              const next = new Set(field.value ?? []);
                              if (e.target.checked) next.add(opt.value);
                              else next.delete(opt.value);
                              field.onChange(Array.from(next));
                            }}
                            className="size-4 rounded border-[#232328] bg-[#0a0a0a] text-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/40"
                          />
                          <span className="text-sm font-medium">
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />
              {errors.insuranceTypes?.message && (
                <p role="alert" className="mt-2 text-sm text-[#DC2626]">
                  {errors.insuranceTypes.message as string}
                </p>
              )}
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Current insurance provider"
                placeholder="GEICO, Progressive, Allstate..."
                error={errors.currentProvider?.message}
                register={register("currentProvider")}
              />
              <Input
                label="Current annual premium"
                inputMode="decimal"
                placeholder="2400"
                leftIcon={<span className="text-[#ffc83d]">$</span>}
                error={errors.currentPremium?.message}
                register={register("currentPremium")}
              />
              <Input
                label="Policy renewal date"
                type="date"
                error={errors.renewalDate?.message}
                register={register("renewalDate")}
              />
              <Input
                label="Number of vehicles / properties"
                inputMode="numeric"
                placeholder="2"
                error={errors.vehicleCount?.message}
                register={register("vehicleCount")}
              />
            </div>
          </div>
        </section>

        <hr className="border-[#232328]" />

        {/* Section 3 */}
        <section>
          {sectionTitle(3, "Your preferences")}
          <div className="flex flex-col gap-6">
            <fieldset>
              <legend className="text-sm font-heading font-semibold text-white mb-3">
                Preferred contact method{" "}
                <span className="text-[#DC2626]" aria-hidden>*</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#0a0a0a] px-4 py-2 cursor-pointer hover:border-[#ffc83d]/40 has-[:checked]:border-[#ffc83d] has-[:checked]:bg-[#1a0e0a]"
                  >
                    <input
                      type="radio"
                      value={m.value}
                      {...register("contactMethod")}
                      className="size-4 border-[#232328] bg-[#0a0a0a] text-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/40"
                    />
                    <span className="text-sm text-white">{m.label}</span>
                  </label>
                ))}
              </div>
              {errors.contactMethod?.message && (
                <p role="alert" className="mt-2 text-sm text-[#DC2626]">
                  {errors.contactMethod.message as string}
                </p>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-sm font-heading font-semibold text-white mb-3">
                Best time to contact{" "}
                <span className="text-[#DC2626]" aria-hidden>*</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {TIME_BLOCKS.map((b) => (
                  <label
                    key={b.value}
                    className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#0a0a0a] px-4 py-2 cursor-pointer hover:border-[#ffc83d]/40 has-[:checked]:border-[#ffc83d] has-[:checked]:bg-[#1a0e0a]"
                  >
                    <input
                      type="radio"
                      value={b.value}
                      {...register("timeBlock")}
                      className="size-4 border-[#232328] bg-[#0a0a0a] text-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/40"
                    />
                    <span className="text-sm text-white">{b.label}</span>
                  </label>
                ))}
              </div>
              {errors.timeBlock?.message && (
                <p role="alert" className="mt-2 text-sm text-[#DC2626]">
                  {errors.timeBlock.message as string}
                </p>
              )}
            </fieldset>

            <Textarea
              label="Additional notes"
              rows={4}
              placeholder="Anything we should know? Multi-property setup, recent claim, special vehicles..."
              error={errors.notes?.message}
              register={register("notes")}
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 size-4 shrink-0 rounded border-[#232328] bg-[#0a0a0a] text-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/40"
              />
              <span className="text-sm text-white/80 leading-snug">
                I agree to AiM Insurance&rsquo;s{" "}
                <Link
                  href="/terms"
                  className="text-[#ffc83d] underline-offset-2 hover:underline"
                >
                  terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#ffc83d] underline-offset-2 hover:underline"
                >
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {errors.consent?.message && (
              <p role="alert" className="text-sm text-[#DC2626] -mt-3">
                {errors.consent.message as string}
              </p>
            )}
          </div>
        </section>

        {isError && (
          <div
            role="alert"
            className="rounded-xl border border-[#DC2626]/40 bg-[#DC2626]/10 px-4 py-3 text-sm text-[#fecaca]"
          >
            {errorMessage ?? "Something went wrong. Please try again."}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-shine cta-primary inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Submitting...
              </>
            ) : (
              <>
                Request my concierge
                <ICONS.ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </button>
          <p className="text-xs text-white/55 text-center">
            We&rsquo;ll assign a dedicated concierge within 24 hours. No obligation.
          </p>
        </div>
      </form>
    </div>
  );
}

function ConciergeSuccess({ onAnother }: { onAnother: () => void }) {
  const STEPS = [
    { n: 1, t: "Review", d: "We review your details and existing policy in depth." },
    { n: 2, t: "Assignment", d: "A dedicated concierge is matched to your case." },
    { n: 3, t: "Contact", d: "Your concierge reaches out via your preferred channel." },
    { n: 4, t: "Negotiation", d: "We benchmark 50+ carriers and lock in better pricing." },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[16px] border border-[#232328] bg-[#111113] p-8 sm:p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
        className="mx-auto inline-flex size-20 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(5, 150, 105, 0.15)" }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 12l5 5L20 6" />
        </svg>
      </motion.div>
      <h2
        className="mt-6 text-white"
        style={{
          fontSize: "clamp(2rem, 4.6vw, 3rem)",
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
        }}
      >
        You&rsquo;re all set!
      </h2>
      <p className="mt-4 max-w-xl mx-auto text-base text-white/75 leading-[1.6]">
        A dedicated AiM concierge will be assigned to your case within 24 hours.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-[10px] border border-[#232328] bg-[#0a0a0a] p-5"
          >
            <div className="text-3xl font-extrabold tabular-nums text-[#ffc83d]/40">
              {String(s.n).padStart(2, "0")}
            </div>
            <h3
              className="mt-2 text-white"
              style={{
                fontSize: "1rem",
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {s.t}
            </h3>
            <p className="mt-1 text-sm text-white/65 leading-[1.55]">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="btn-shine cta-primary inline-flex items-center gap-2 px-7 py-4 text-base font-semibold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Back to homepage
          <ICONS.ArrowRight className="size-4" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={onAnother}
          className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#0a0a0a] px-7 py-4 text-base font-semibold text-white transition-colors hover:border-[#ffc83d]/40"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Submit another request
        </button>
      </div>
    </motion.div>
  );
}

export default ConciergeForm;
