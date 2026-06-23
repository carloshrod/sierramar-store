"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/index";

interface RevealProps extends React.ComponentProps<"div"> {
  delay?: number;
}

export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // No bottom rootMargin shrinkage: combined with the pre-reveal
      // translate-y-6, it pushed the intersection ratio of elements sitting
      // just past the fold below the threshold, so they never fired on
      // mount and stayed invisible until an unrelated scroll/resize nudged
      // a recheck (see the `(shop)/cart` "Sigue comprando" section).
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      {...props}
    />
  );
}
