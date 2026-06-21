import Link from "next/link";
import { ArrowRight, Flame, Leaf, Waves } from "lucide-react";
import { ArrowLink } from "@/components/common/ArrowLink";
import { ContourPattern } from "@/components/common/ContourPattern";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { Badge } from "@/components/ui/badge";

const BEST_SELLERS = [
  {
    number: "01",
    name: "Altura Volcánica",
    notes: "Chocolate negro, cereza y un final especiado.",
    roast: "Tueste medio-oscuro",
    icon: Flame,
  },
  {
    number: "02",
    name: "Bruma Costera",
    notes: "Caramelo, cítricos suaves y cuerpo sedoso.",
    roast: "Tueste medio",
    icon: Waves,
  },
  {
    number: "03",
    name: "Reserva de Montaña",
    notes: "Frutos rojos, panela y un toque floral.",
    roast: "Tueste claro",
    icon: Leaf,
  },
];

export function BestSellers() {
  return (
    <Section tone="muted">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Los favoritos
          </span>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            Más vendidos
          </h2>
        </div>
        <ArrowLink href="/products" className="shrink-0 text-muted-foreground hover:text-foreground">
          Ver todo el catálogo
        </ArrowLink>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {BEST_SELLERS.map((item, index) => (
          <Reveal key={item.number} delay={index * 100}>
            <Link
              href="/products"
              className="group block overflow-hidden rounded-3xl bg-background shadow-sm ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-primary/30"
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-foreground">
                <ContourPattern />
                <span className="absolute top-6 left-6 font-serif text-base text-background/50">
                  {item.number}
                </span>
                <Badge
                  variant="secondary"
                  className="absolute top-6 right-6 bg-background/15 text-background"
                >
                  {item.roast}
                </Badge>
                <item.icon
                  strokeWidth={1.25}
                  className="size-10 text-background/20 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3 p-7">
                <h3 className="font-serif text-2xl tracking-tight">{item.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.notes}</p>
                <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium">
                  Ver detalle
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
