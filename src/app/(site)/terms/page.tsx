import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of AiM Insurance.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-heading font-bold text-primary">
        Terms of Use
      </h1>
      <p className="mt-4 text-text-secondary text-lg">
        Full terms are being finalised. By using this site you agree to the
        terms that will be published here shortly.
      </p>
    </div>
  );
}
