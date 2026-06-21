export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/products", label: "Tienda" },
  { href: "/blog", label: "Diario" },
  { href: "/historia", label: "Historia" },
];
