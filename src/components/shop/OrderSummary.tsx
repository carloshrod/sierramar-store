import { formatPrice } from "@/lib/utils/price";
import type { Order } from "@/lib/types/order";

export function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="rounded-3xl bg-secondary/30 p-6 text-left ring-1 ring-border/60">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Número de orden</span>
        <span className="font-medium">{order.orderNumber}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between gap-2">
            <span className="text-muted-foreground">
              {item.productName} × {item.quantity}
            </span>
            <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="font-medium">Total</span>
        <span className="font-semibold">{formatPrice(order.total)}</span>
      </div>
    </div>
  );
}
