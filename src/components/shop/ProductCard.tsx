"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/index";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import { formatPrice } from "@/lib/utils/price";
import { getMinVariantPrice, hasPriceRange } from "@/lib/utils/product";
import type { Product } from "@/lib/types/product";

const IMAGE_SIZES = "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw";

export function ProductCard({ product }: { product: Product }) {
  const [primaryImage, secondaryImage] = product.images ?? [];
  const price = getMinVariantPrice(product);
  const showsFromPrice = price !== null && hasPriceRange(product);
  const href = `/store/${product.slug}`;

  return (
    <div className="group">
      <Link
        href={href}
        className="block overflow-hidden rounded-3xl bg-secondary/30 ring-1 ring-border/60"
      >
        <div className="relative aspect-square">
          {primaryImage ? (
            <Image
              src={getStrapiMediaUrl(primaryImage.url)}
              alt={primaryImage.alternativeText || product.name}
              fill
              sizes={IMAGE_SIZES}
              className={cn(
                "object-cover transition-opacity duration-500",
                secondaryImage && "group-hover:opacity-0",
              )}
            />
          ) : (
            <div className="size-full bg-foreground/5" />
          )}
          {secondaryImage && (
            <Image
              src={getStrapiMediaUrl(secondaryImage.url)}
              alt={secondaryImage.alternativeText || product.name}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 bg-background/85 text-foreground"
          >
            {product.roastLevel}
          </Badge>
        </div>
      </Link>

      <div className="mt-4 space-y-1.5">
        <Link href={href}>
          <h3 className="font-serif text-lg tracking-tight">{product.name}</h3>
        </Link>
        {product.shortDescription && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="font-medium">
            {price === null
              ? "Consultar"
              : showsFromPrice
                ? `Desde ${formatPrice(price)}`
                : formatPrice(price)}
          </span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={(event) => {
              event.preventDefault();
              // TODO: conectar con useCartStore cuando el flujo de carrito esté listo.
            }}
          >
            <ShoppingBag />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
