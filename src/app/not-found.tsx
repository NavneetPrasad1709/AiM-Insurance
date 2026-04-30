import Link from "next/link";
import type { Metadata } from "next";
import { SkipNav } from "@/components/layout/skip-nav";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ICONS } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <>
      <SkipNav />
      <Header />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center bg-background-cream px-4 py-24"
      >
        <div className="flex flex-col items-center text-center max-w-xl">
          <span
            aria-hidden
            className="text-gradient-coral font-heading font-extrabold text-[8rem] sm:text-[10rem] leading-none tracking-tight"
          >
            404
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-heading font-bold text-primary">
            Page Not Found
          </h1>
          <p className="mt-3 text-text-secondary text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-coral px-8 py-4 text-lg font-heading font-semibold text-white shadow-md transition-shadow hover:shadow-coral focus-visible:shadow-coral"
          >
            <ICONS.ArrowLeft className="size-4" aria-hidden />
            Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
