"use client";

import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m as motion } from "framer-motion";
import { Input, Select, Textarea } from "@/components/ui/input";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { ICONS } from "@/lib/icons";

const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "quote", label: "Insurance Quote" },
  { value: "existing", label: "Existing Policy" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please pick a subject"),
  message: z.string().min(10, "A few words please"),
});

type ContactFormValues = z.infer<typeof schema>;

interface ContactFormProps {
  defaultIntent?: string;
}

export function ContactForm({ defaultIntent }: ContactFormProps) {
  const { submit, isLoading, isSuccess, isError, errorMessage, reset } =
    useFormSubmit("contact-form", { autoResetMs: 0 });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject:
        defaultIntent === "call" ? "general" : defaultIntent ?? "",
      message:
        defaultIntent === "call"
          ? "I'd like to book a 15-minute call to discuss insurance savings."
          : "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit(values);
  });

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[14px] border border-[#0a0a0a]/10 bg-white p-8 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]"
      >
        <div
          className="mx-auto inline-flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(79, 224, 176, 0.18)" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a8a5f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 12l5 5L20 6" />
          </svg>
        </div>
        <h3
          className="mt-5 text-[#0a0a0a]"
          style={{
            fontSize: "1.4rem",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Message sent
        </h3>
        <p className="mt-2 text-base text-[#3a3a44] leading-[1.6]">
          Thanks — we&rsquo;ll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            resetForm();
            reset();
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/15 bg-[#fbfaf5] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-colors hover:border-[#ffc83d] hover:bg-[#fff5d4]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[14px] border border-[#0a0a0a]/10 bg-white p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.20)]">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            light
            label="Name"
            required
            autoComplete="name"
            error={errors.name?.message}
            register={register("name")}
          />
          <Input
            light
            label="Email"
            type="email"
            required
            autoComplete="email"
            error={errors.email?.message}
            register={register("email")}
          />
        </div>
        <Input
          light
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          register={register("phone")}
        />
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              light
              label="Subject"
              required
              placeholder="Choose a topic"
              options={SUBJECT_OPTIONS}
              error={errors.subject?.message}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
        <Textarea
          light
          label="Message"
          required
          rows={5}
          error={errors.message?.message}
          register={register("message")}
        />

        {isError && (
          <div
            role="alert"
            className="rounded-xl border border-[#DC2626]/30 bg-[#DC2626]/8 px-4 py-3 text-sm text-[#9b1c1c]"
          >
            {errorMessage ?? "Something went wrong. Please try again."}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-shine cta-primary inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-base font-semibold disabled:opacity-70"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            <>
              Send message
              <ICONS.ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
