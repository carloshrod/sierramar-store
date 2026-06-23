import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types/product";

interface RelatedProductsProps {
  title: string;
  products: Product[];
}

export function RelatedProducts({ title, products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <Section tone="muted">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{title}</h2>
        <ArrowLink
          href="/store"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          Ver todo el catálogo
        </ArrowLink>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product, index) => (
          <Reveal key={product.documentId} delay={index * 75}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
