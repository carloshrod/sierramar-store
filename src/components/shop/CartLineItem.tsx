import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/price";
import type { CartItem } from "@/lib/types/cart";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onNavigate?: () => void;
}

export function CartLineItem({ item, onUpdateQuantity, onRemove, onNavigate }: CartLineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-secondary/30 ring-1 ring-border/60">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
        ) : (
          <div className="size-full bg-foreground/5" />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/store/${item.slug}`}
              onClick={onNavigate}
              className="font-serif text-base tracking-tight hover:underline"
            >
              {item.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {item.grindType} · {item.weight} g
            </p>
          </div>
          <button
            type="button"
            aria-label="Quitar del carrito"
            onClick={onRemove}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="inline-flex items-center rounded-full border border-border">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Disminuir cantidad"
              disabled={item.quantity <= 1}
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus />
            </Button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Aumentar cantidad"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus />
            </Button>
          </div>
          <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
