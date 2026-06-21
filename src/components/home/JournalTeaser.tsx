import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";

export function JournalTeaser() {
  return (
    <Section tone="muted">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal delay={100}>
          <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Desde el diario
          </span>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            Historias detrás de cada taza
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Notas de cata, guías de preparación e historias de origen para
              quienes quieren conocer el café más allá de la taza.{" "}
            </p>
            <ArrowLink href="/blog" className="text-foreground">
              Leer el diario
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal className="relative h-72 overflow-hidden rounded-3xl sm:h-80 lg:h-96">
          <Image
            src="https://images.unsplash.com/photo-1587369403245-a10d1784662f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Notas y café del diario de SierraMar"
            fill
            className="object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}
