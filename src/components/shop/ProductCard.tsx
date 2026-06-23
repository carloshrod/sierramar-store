"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptionPill } from "@/components/shop/OptionPill";
import { useVariantSelector } from "@/lib/hooks/useVariantSelector";
import { cn } from "@/lib/utils/index";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import { formatPrice } from "@/lib/utils/price";
import { getMinVariantPrice, hasPriceRange } from "@/lib/utils/product";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/types/product";

const IMAGE_SIZES = "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw";
const ADDED_FEEDBACK_MS = 1500;
const CLOSE_DELAY_MS = 150;

function AddToCartControl({ product }: { product: Product }) {
  const {
    activeVariants,
    grindTypes,
    weights,
    grindType,
    weight,
    selectedVariant,
    selectGrindType,
    selectWeight,
  } = useVariantSelector(product.variants);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  const needsPicker = grindTypes.length > 1 || weights.length > 1;
  const outOfStock = !selectedVariant || selectedVariant.stock <= 0;

  const addToCart = () => {
    if (!selectedVariant || outOfStock) return;
    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0] ? getStrapiMediaUrl(product.images[0].url) : undefined,
        grindType: selectedVariant.grindType,
        weight: selectedVariant.weight,
        price: selectedVariant.price,
      },
      1,
    );
    setIsOpen(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
  };

  const handleTriggerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!needsPicker) {
      addToCart();
      return;
    }
    setIsOpen((value) => !value);
  };

  const handleMouseEnter = () => {
    if (!needsPicker) return;
    clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!needsPicker) return;
    closeTimeout.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button type="button" size="sm" variant="secondary" onClick={handleTriggerClick}>
        {justAdded ? <Check /> : <ShoppingBag />}
        {justAdded ? "Agregado" : "Agregar"}
      </Button>

      {needsPicker && isOpen && (
        <div
          onClick={(event) => event.preventDefault()}
          className="absolute right-0 bottom-full z-20 mb-2 w-56 space-y-3 rounded-2xl border border-border bg-popover p-4 text-left shadow-lg"
        >
          {grindTypes.length > 1 && (
            <div>
              <span className="text-xs font-medium text-muted-foreground">Molienda</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {grindTypes.map((option) => {
                  const matchingVariant = activeVariants.find(
                    (variant) => variant.grindType === option && variant.weight === weight,
                  );
                  const isAvailableAtAll = activeVariants.some(
                    (variant) => variant.grindType === option,
                  );
                  return (
                    <OptionPill
                      key={option}
                      size="sm"
                      label={option}
                      isSelected={option === grindType}
                      isDisabled={!isAvailableAtAll}
                      isSoldOut={Boolean(matchingVariant) && matchingVariant!.stock <= 0}
                      onClick={() => selectGrindType(option)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {weights.length > 1 && (
            <div>
              <span className="text-xs font-medium text-muted-foreground">Peso</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {weights.map((option) => {
                  const matchingVariant = activeVariants.find(
                    (variant) => variant.weight === option && variant.grindType === grindType,
                  );
                  const isAvailableAtAll = activeVariants.some(
                    (variant) => variant.weight === option,
                  );
                  return (
                    <OptionPill
                      key={option}
                      size="sm"
                      label={`${option} g`}
                      isSelected={option === weight}
                      isDisabled={!isAvailableAtAll}
                      isSoldOut={Boolean(matchingVariant) && matchingVariant!.stock <= 0}
                      onClick={() => selectWeight(option)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <Button
            type="button"
            size="sm"
            className="w-full"
            disabled={outOfStock}
            onClick={addToCart}
          >
            {outOfStock
              ? "Agotado"
              : `Agregar · ${selectedVariant ? formatPrice(selectedVariant.price) : ""}`}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [primaryImage, secondaryImage] = product.images ?? [];
  const price = getMinVariantPrice(product);
  const showsFromPrice = price !== null && hasPriceRange(product);
  const href = `/store/${product.slug}`;

  return (
    <div className="group flex h-full flex-col">
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

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={href}>
          <h3 className="font-serif text-lg tracking-tight">{product.name}</h3>
        </Link>
        {product.shortDescription && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-medium">
            {price === null
              ? "Consultar"
              : showsFromPrice
                ? `Desde ${formatPrice(price)}`
                : formatPrice(price)}
          </span>
          <AddToCartControl product={product} />
        </div>
      </div>
    </div>
  );
}
