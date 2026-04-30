import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AiM Insurance collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-heading font-bold text-primary">
        Privacy Policy
      </h1>
      <p className="mt-4 text-text-secondary text-lg">
        Full policy text is being finalised. Until then, please contact us with
        any questions about how we handle your data.
      </p>
    </div>
  );
}
