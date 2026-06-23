"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/index";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import type { StrapiMedia } from "@/lib/types/product";

interface ProductGalleryProps {
  images: StrapiMedia[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/30 ring-1 ring-border/60">
        {activeImage ? (
          <Image
            src={getStrapiMediaUrl(activeImage.url)}
            alt={activeImage.alternativeText || name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-foreground/5" />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1} de ${name}`}
              aria-pressed={index === activeIndex}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-xl ring-1 transition-all cursor-pointer sm:size-20",
                index === activeIndex
                  ? "ring-2 ring-primary"
                  : "ring-border/60 hover:ring-foreground/30",
              )}
            >
              <Image
                src={getStrapiMediaUrl(image.url)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
