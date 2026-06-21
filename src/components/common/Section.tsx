import { cn } from "@/lib/utils/index";
import { Container } from "@/components/common/Container";

type SectionTone = "default" | "muted" | "dark";

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: SectionTone;
  container?: boolean;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-secondary/30 text-foreground",
  dark: "bg-foreground text-background",
};

export function Section({
  tone = "default",
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-20 sm:py-28", toneClasses[tone], className)}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
