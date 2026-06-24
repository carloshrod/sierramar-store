"use client";

import { useEffect, useMemo, useState } from "react";
import GithubSlugger from "github-slugger";
import { cn } from "@/lib/utils/index";

interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

const HEADING_LINE = /^(#{2,3})\s+(.+)$/;

function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of content.split("\n")) {
    const match = HEADING_LINE.exec(line.trim());
    if (!match) continue;
    const text = match[2].trim();
    headings.push({ id: slugger.slug(text), text, depth: match[1].length as 2 | 3 });
  }

  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        En este artículo
      </span>
      <ul className="mt-3 space-y-2 border-l border-border/60 pl-4 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.depth === 3 && "pl-3")}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                activeId === heading.id && "font-medium text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
