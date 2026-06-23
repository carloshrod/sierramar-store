"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, User } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/index";
import { useCartStore } from "@/store/useCartStore";

// Matches the header's own h-20 height: the scroll distance after which it
// switches from transparent (at the top) back to its solid background.
const NAVBAR_HEIGHT_PX = 80;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= NAVBAR_HEIGHT_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart is a focused, checkout-style page — strip the nav down to just the mark.
  if (pathname === "/cart") {
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <Container className="flex h-20 items-center justify-center">
          <Logo variant="icon" priority className="h-10 w-auto" />
        </Container>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        isScrolled ? "bg-secondary/35 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo variant="primary" priority className="h-10 w-auto sm:h-11" />

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wider text-foreground/75 uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/account" aria-label="Mi cuenta" />}
          >
            <User />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Carrito"
            className="relative"
            onClick={openCart}
          >
            <ShoppingBag />
            {itemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 size-4 justify-center p-0 text-[10px]">
                {itemCount}
              </Badge>
            )}
          </Button>
          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "ghost", size: "icon", className: "lg:hidden" })}
              aria-label="Abrir menú"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-xs">
              <SheetHeader className="flex-row items-center justify-between border-b border-border px-4 pt-4 pb-3">
                <Logo variant="wordmark" href={null} className="h-6 w-auto" />
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Enlaces de navegación de SierraMar
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Principal" className="flex flex-col gap-1 px-4 py-2">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                    className="rounded-md px-2 py-3 text-sm font-medium tracking-wider text-foreground/85 uppercase transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>

              <SheetFooter className="gap-3 border-t border-border px-4 py-4">
                <SheetClose
                  render={<Link href="/store" />}
                  className={buttonVariants({ className: "h-10 w-full" })}
                >
                  Comprar ahora
                </SheetClose>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <SheetClose
                    render={<Link href="/account" />}
                    className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <User className="size-4" />
                    Mi cuenta
                  </SheetClose>
                  <SheetClose
                    render={<Link href="/cart" />}
                    className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <ShoppingBag className="size-4" />
                    Carrito
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
