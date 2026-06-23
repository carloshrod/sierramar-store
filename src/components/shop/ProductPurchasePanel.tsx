"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptionPill } from "@/components/shop/OptionPill";
import { useVariantSelector } from "@/lib/hooks/useVariantSelector";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/types/product";

const ADDED_FEEDBACK_MS = 2000;

export function ProductPurchasePanel({ product }: { product: Product }) {
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
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const outOfStock = !selectedVariant || selectedVariant.stock <= 0;

  const handleAdd = () => {
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
      quantity,
    );
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <div className="space-y-6">
      {grindTypes.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium">Molienda</legend>
          <div className="mt-2 flex flex-wrap gap-2">
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
                  label={option}
                  isSelected={option === grindType}
                  isDisabled={!isAvailableAtAll}
                  isSoldOut={Boolean(matchingVariant) && matchingVariant!.stock <= 0}
                  onClick={() => selectGrindType(option)}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      {weights.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium">Peso</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {weights.map((option) => {
              const matchingVariant = activeVariants.find(
                (variant) => variant.weight === option && variant.grindType === grindType,
              );
              const isAvailableAtAll = activeVariants.some((variant) => variant.weight === option);
              return (
                <OptionPill
                  key={option}
                  label={`${option} g`}
                  isSelected={option === weight}
                  isDisabled={!isAvailableAtAll}
                  isSoldOut={Boolean(matchingVariant) && matchingVariant!.stock <= 0}
                  onClick={() => selectWeight(option)}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl tracking-tight">
          {selectedVariant ? formatPrice(selectedVariant.price) : "Consultar"}
        </span>
        {selectedVariant?.compareAtPrice &&
          selectedVariant.compareAtPrice > selectedVariant.price && (
            <span className="text-muted-foreground line-through">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          )}
      </div>

      {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
        <p className="text-sm text-muted-foreground">
          Quedan {selectedVariant.stock} unidades
        </p>
      )}

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Disminuir cantidad"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            <Minus />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Aumentar cantidad"
            disabled={!selectedVariant || quantity >= selectedVariant.stock}
            onClick={() =>
              setQuantity((value) =>
                selectedVariant ? Math.min(selectedVariant.stock, value + 1) : value,
              )
            }
          >
            <Plus />
          </Button>
        </div>

        <Button
          type="button"
          size="lg"
          className="flex-1"
          disabled={outOfStock}
          onClick={handleAdd}
        >
          {justAdded ? <Check /> : <ShoppingBag />}
          {outOfStock ? "Agotado" : justAdded ? "Agregado" : "Agregar al carrito"}
        </Button>
      </div>
    </div>
  );
}
