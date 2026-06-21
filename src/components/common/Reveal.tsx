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
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
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
