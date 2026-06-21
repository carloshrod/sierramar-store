import { cn } from "@/lib/utils/index";

/**
 * Concentric-ring texture echoing mountain contour lines / sea ripples —
 * a nod to "Sierra" + "Mar". Used as a subtle backdrop layer on dark
 * brand surfaces instead of a flat gradient.
 */
export function ContourPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 bg-[repeating-radial-gradient(circle_at_28%_25%,transparent_0,transparent_16px,var(--background)_17px,transparent_18px)] opacity-10",
        className,
      )}
    />
  );
}
