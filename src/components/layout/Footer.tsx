import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/common/SocialIcons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Placeholders — reemplazar con los datos reales de la marca.
const CONTACT_EMAIL = "hola@sierramar.com";
const CONTACT_PHONE = "+52 55 0000 0000";

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/sierramar",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://facebook.com/sierramar",
    label: "Facebook",
    icon: FacebookIcon,
  },
  { href: "https://tiktok.com/@sierramar", label: "TikTok", icon: TikTokIcon },
];

const SHOP_LINKS = [
  { href: "/store", label: "Catálogo" },
  { href: "/account", label: "Mi cuenta" },
  { href: "/cart", label: "Carrito" },
];

const EXPLORE_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/historia", label: "Historia" },
  { href: "/store", label: "Tienda" },
  { href: "/blog", label: "Diario" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/35">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-sm space-y-4">
            <Logo variant="wordmark" className="h-7 w-auto" />
            <p className="text-sm leading-relaxed text-foreground/65">
              Café de especialidad cultivado en altura y tostado en lotes
              pequeños. De la sierra al mar, una taza a la vez.
            </p>
          </div>

          <nav aria-label="Tienda" className="space-y-4">
            <h3 className="font-serif text-sm font-medium text-foreground">
              Tienda
            </h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/65 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explorar" className="space-y-4">
            <h3 className="font-serif text-sm font-medium text-foreground">
              Explorar
            </h3>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/65 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="font-serif text-sm font-medium text-foreground">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0" />
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>

            <ul className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full text-foreground/65 ring-1 ring-foreground/15 transition-colors hover:text-foreground hover:ring-foreground/30"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-foreground/15" />

        <div className="flex flex-col items-center gap-3 text-center text-xs text-foreground/60 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} SierraMar. Todos los derechos
            reservados.
          </p>

          <span className="inline-flex items-center text-gray-500 text-xs me-20">
            Desarrollado con ♥️ por
            <a
              href="https://chrod.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex ms-1 font-semibold hover:text-primary"
            >
              <Image
                src="/chrod-logo.png"
                alt="CHRod logo"
                width={36}
                height={28}
              />
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
