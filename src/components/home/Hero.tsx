import Link from "next/link";
import { ArrowRight, Leaf, Mountain, Truck } from "lucide-react";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

const TRUST_POINTS = [
  { icon: Mountain, label: "Cultivado en altura" },
  { icon: Leaf, label: "Tueste en lotes pequeños" },
  { icon: Truck, label: "Recién tostado a tu puerta" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:me-24 lg:me-36"
        >
          <div className="absolute size-80 rounded-full bg-secondary/50 blur-3xl" />
          <Logo
            variant="icon"
            href={null}
            className="h-72 w-auto opacity-5 sm:h-80 xl:h-112"
          />
        </div>

        <div className="relative max-w-2xl">
          <h1 className="text-balance font-serif text-5xl leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-4 delay-100 duration-700 fill-mode-both sm:text-6xl lg:text-7xl">
            Café cultivado en la sierra, tostado frente al mar.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700 fill-mode-both">
            Granos de especialidad seleccionados a mano y tostados en lotes
            pequeños para revelar su origen en cada taza.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-700 fill-mode-both">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/products" />}
            >
              Explorar la tienda
              <ArrowRight />
            </Button>
            <ArrowLink href="#historia" className="text-base">
              Conocer nuestra historia
            </ArrowLink>
          </div>

          <ul className="mt-14 flex flex-col gap-4 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center sm:gap-8 animate-in fade-in delay-500 duration-700 fill-mode-both">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <Icon
                  strokeWidth={1.5}
                  className="size-4 shrink-0 text-foreground/50"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
