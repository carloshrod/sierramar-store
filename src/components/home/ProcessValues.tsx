import { Flame, Leaf, Mountain } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";

const VALUES = [
  {
    number: "01",
    icon: Mountain,
    title: "Origen de altura",
    description:
      "Seleccionamos lotes cultivados en terrenos elevados, donde el clima y la altitud desarrollan mayor complejidad y dulzura en el grano.",
  },
  {
    number: "02",
    icon: Flame,
    title: "Tueste artesanal",
    description:
      "Tostamos en lotes pequeños y supervisamos cada curva de tueste para resaltar las notas propias de cada origen.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Sostenibilidad",
    description:
      "Construimos relaciones directas y duraderas con los productores, priorizando prácticas responsables en todo el proceso.",
  },
];

export function ProcessValues() {
  return (
    <Section>
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {VALUES.map(({ number, icon: Icon, title, description }, index) => (
          <Reveal
            key={number}
            delay={index * 100}
            className="space-y-4 py-10 first:pt-0 last:pb-0 sm:px-10 sm:py-0 sm:first:pl-0 sm:last:pr-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/40">
                <Icon strokeWidth={1.5} className="size-5 text-foreground/70" />
              </span>
              <span className="font-serif text-base text-muted-foreground">{number}</span>
            </div>
            <h3 className="font-serif text-xl tracking-tight">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
