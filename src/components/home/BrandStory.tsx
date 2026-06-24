import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { STRAPI_URL } from "@/lib/constants";

export function BrandStory() {
  return (
    <Section id="historia" tone="dark">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="h-72 overflow-hidden rounded-3xl ring-1 ring-background/15 sm:h-80 lg:h-104">
          <Image
            src={`${STRAPI_URL}/uploads/photo_1722962883780_8806c3ab546b_3df88e0d02.jpeg`}
            alt="Valle de montaña verde al amanecer, paisaje de la sierra de SierraMar"
            width={1170}
            height={780}
            className="h-full w-full object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <span className="text-sm font-medium tracking-wide text-background/60 uppercase">
            Nuestra historia
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Una taza con raíces.
          </h2>

          <div className="mt-6 space-y-6 text-lg leading-relaxed text-background/80">
            <p>
              SierraMar nace de un mismo gesto: subir a la montaña a buscar el
              grano y bajar hasta el mar para compartirlo. Entre ese recorrido
              entendimos que el buen café no se improvisa, se cultiva con
              paciencia, altura y atención al detalle.
            </p>
            <p>
              Trabajamos de cerca con quienes cultivan cada lote, tostamos en
              cantidades pequeñas y cuidamos cada paso del proceso para que el
              origen del grano se sienta en cada taza, sin atajos ni excesos.
            </p>
            <ArrowLink href="/historia" className="text-background">
              Leer nuestra historia completa
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
