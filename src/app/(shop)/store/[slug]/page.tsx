import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Coffee,
  Droplets,
  Flame,
  MapPin,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Section } from "@/components/common/Section";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products";
import { getStrapiMediaUrl } from "@/lib/utils/media";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return { title: "Producto no encontrado — SierraMar" };
  }

  const description =
    product.shortDescription ?? product.description?.slice(0, 160);
  const image = product.images[0]
    ? getStrapiMediaUrl(product.images[0].url)
    : undefined;

  return {
    title: `${product.name} — SierraMar`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 shrink-0" />
        <dt className="text-xs font-medium tracking-wide uppercase">{label}</dt>
      </div>
      <dd className="mt-2 font-medium">{value}</dd>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { products: relatedProducts, source } = await getRelatedProducts(
    product,
  ).catch(() => ({ products: [], source: "best-sellers" as const }));
  const relatedTitle =
    source === "category"
      ? "También te puede gustar"
      : "Los favoritos de SierraMar";

  return (
    <>
      <Section className="pt-10 pb-20 sm:pt-14 sm:pb-28">
        <Link
          href="/store"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
          Volver al catálogo
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <Badge variant="secondary">
              {product.category?.name ?? product.roastLevel}
            </Badge>
            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            {product.description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <Separator className="my-8" />

            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              <SpecItem
                icon={MapPin}
                label="Origen"
                value={product.origin ?? "—"}
              />
              <SpecItem
                icon={Mountain}
                label="Altitud"
                value={product.altitude ?? "—"}
              />
              <SpecItem
                icon={Flame}
                label="Tueste"
                value={product.roastLevel}
              />
              <SpecItem
                icon={Droplets}
                label="Proceso"
                value={product.process}
              />
              <SpecItem
                icon={Coffee}
                label="Método ideal"
                value={product.method}
              />
            </dl>

            <Separator className="my-8" />

            <ProductPurchasePanel product={product} />

            <Accordion
              multiple
              defaultValue={["tasting-notes"]}
              className="mt-8"
            >
              {product.tastingNotes && (
                <AccordionItem value="tasting-notes">
                  <AccordionTrigger className="font-serif text-base">
                    Notas de cata
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{product.tastingNotes}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-serif text-base">
                  Envío y frescura
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Tostamos en lotes pequeños y empacamos en bolsas con válvula
                    de desgasificación para conservar el aroma. Envíos a todo el
                    país en 2 a 4 días hábiles.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Section>

      <RelatedProducts title={relatedTitle} products={relatedProducts} />

      <Section tone="dark" className="py-16 sm:py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-medium tracking-wide text-background/60 uppercase">
            Nuestra historia
          </span>
          <p className="max-w-2xl font-serif text-2xl tracking-tight sm:text-3xl">
            Cada lote se tuesta en pequeñas cantidades, pensado para llegar
            fresco a tu taza.
          </p>
          <ArrowLink
            href="/historia"
            className="text-background/80 hover:text-background"
          >
            Conoce nuestra historia
          </ArrowLink>
        </div>
      </Section>
    </>
  );
}
