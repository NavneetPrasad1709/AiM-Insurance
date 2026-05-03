import type { Metadata, Viewport } from "next";
import { montserrat } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { QuoteModalProvider } from "@/lib/quote-modal-context";
import { QuoteModal } from "@/components/forms/quote-modal";
import { MotionProvider } from "@/components/providers/motion-provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AiM Insurance | Expert Insurance Negotiation",
    template: "%s | AiM Insurance",
  },
  description:
    "Get insurance without the stress. AiM connects you with expert negotiators who fight for the best deal on car, home, boat, yacht & jet insurance.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url
  ),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full bg-background`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-white antialiased"
        suppressHydrationWarning
      >
        <MotionProvider>
          <QuoteModalProvider>
            {children}
            <QuoteModal />
          </QuoteModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
