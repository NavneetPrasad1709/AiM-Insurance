import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** "light": white tagline for dark backgrounds. "dark": black tagline for light backgrounds. */
  variant?: "dark" | "light";
  showCaption?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

// Rendered height per size. Width is derived from the file's real aspect ratio
// so the declared dimensions never disagree with the intrinsic ones (a mismatch
// distorts the mark and trips Lighthouse's image-aspect-ratio audit).
const SIZE_H = { sm: 56, md: 74, lg: 96 } as const;

// Intrinsic ratios: aim-logo.webp is 600x347, aim-logo-black.webp is 600x316.
const RATIO = { light: 600 / 347, dark: 600 / 316 } as const;

export function Logo({
  variant = "light",
  className,
  size = "md",
  onClick,
}: LogoProps) {
  const src =
    variant === "light" ? "/brand/aim-logo.webp" : "/brand/aim-logo-black.webp";
  const h = SIZE_H[size];
  const w = Math.round(h * RATIO[variant]);

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AiM Insurance home"
      className={cn(
        "inline-flex items-center transition-opacity duration-150 hover:opacity-90",
        className
      )}
    >
      <Image
        src={src}
        alt="AiM, a Car Concierge Pro product"
        width={w}
        height={h}
        priority
        className="w-auto"
        style={{ height: `${Math.round(h * 0.55)}px`, width: "auto" }}
      />
    </Link>
  );
}

export default Logo;
