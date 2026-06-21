import Link from "next/link";
import { Menu, ShoppingBag, User } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS } from "@/components/layout/nav-links";
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

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-secondary/35 backdrop-blur-sm">
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
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={<Link href="/cart" aria-label="Carrito" />}
          >
            <ShoppingBag />
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
                  render={<Link href="/products" />}
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
