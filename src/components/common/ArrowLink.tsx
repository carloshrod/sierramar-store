import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/index";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
