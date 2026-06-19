import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
];

export function Navigation() {
  return (
    <nav className="flex gap-6 text-sm">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
