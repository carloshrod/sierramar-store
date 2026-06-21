import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/index";

const LOGO_VARIANTS = {
  /** Icon + wordmark — main UI areas (navbar, hero). */
  primary: { src: "/main-logo.png", width: 1632, height: 386 },
  /** Text only — compact / dense layouts (footer). */
  wordmark: { src: "/text-logo.png", width: 1500, height: 335 },
  /** Symbol only — favicon-adjacent, mobile, loading states. */
  icon: { src: "/icon-logo.png", width: 220, height: 260 },
} as const;

type LogoVariant = keyof typeof LOGO_VARIANTS;

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Set to null to render the mark without a wrapping link. */
  href?: string | null;
  priority?: boolean;
}

export function Logo({ variant = "primary", className, href = "/", priority }: LogoProps) {
  const { src, width, height } = LOGO_VARIANTS[variant];

  const mark = (
    <Image
      src={src}
      alt="SierraMar"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-9 w-auto object-contain", className)}
    />
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="SierraMar — Ir al inicio" className="inline-flex shrink-0 items-center">
      {mark}
    </Link>
  );
}
