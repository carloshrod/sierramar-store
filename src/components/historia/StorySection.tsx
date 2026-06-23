import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils/index";

interface StorySectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  imagePosition?: "left" | "right";
  tone?: "default" | "muted" | "dark";
  cta?: { href: string; label: string };
}

export function StorySection({
  id,
  eyebrow,
  title,
  paragraphs,
  image,
  imagePosition = "left",
  tone = "default",
  cta,
}: StorySectionProps) {
  const isDark = tone === "dark";

  const imageBlock = (
    <Reveal className="relative h-72 overflow-hidden rounded-3xl sm:h-80 lg:h-104">
      <Image src={image.src} alt={image.alt} fill className="object-cover" />
    </Reveal>
  );

  const textBlock = (
    <Reveal delay={100}>
      <span
        className={cn(
          "text-sm font-medium tracking-wide uppercase",
          isDark ? "text-background/60" : "text-muted-foreground",
        )}
      >
        {eyebrow}
      </span>
      <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-6 space-y-6 text-lg leading-relaxed",
          isDark ? "text-background/80" : "text-muted-foreground",
        )}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {cta && (
          <ArrowLink href={cta.href} className={isDark ? "text-background" : "text-foreground"}>
            {cta.label}
          </ArrowLink>
        )}
      </div>
    </Reveal>
  );

  return (
    <Section id={id} tone={tone}>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {imagePosition === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </Section>
  );
}
