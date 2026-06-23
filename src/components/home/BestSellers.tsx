import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/common/ArrowLink";
import { ContourPattern } from "@/components/common/ContourPattern";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { Badge } from "@/components/ui/badge";
import { getBestSellers } from "@/lib/api/products";
import { getStrapiMediaUrl } from "@/lib/utils/media";

export async function BestSellers() {
  // Decorative section: if Strapi is unreachable, hide it instead of taking
  // down the whole home page (see `(shop)/error.tsx`, which would otherwise
  // replace Hero/BrandStory/etc. too).
  const products = await getBestSellers(3).catch((error) => {
    console.error("No se pudieron cargar los más vendidos:", error);
    return [];
  });

  if (products.length === 0) return null;

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
        <ArrowLink
          href="/store"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          Ver todo el catálogo
        </ArrowLink>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.documentId} delay={index * 100}>
            <Link
              href={`/store/${product.slug}`}
              className="group block overflow-hidden rounded-3xl bg-background shadow-sm ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-primary/30"
            >
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-foreground">
                {product.images?.[0] ? (
                  <Image
                    src={getStrapiMediaUrl(product.images[0].url)}
                    alt={product.images[0].alternativeText || product.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ContourPattern />
                )}
                <span className="absolute top-6 left-6 font-serif text-base text-background/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge
                  variant="secondary"
                  className="absolute top-6 right-6 bg-background/15 text-background"
                >
                  {product.totalSold ? `${product.totalSold} vendidos` : product.roastLevel}
                </Badge>
              </div>
              <div className="space-y-3 p-7">
                <h3 className="font-serif text-2xl tracking-tight">{product.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.shortDescription}
                </p>
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
