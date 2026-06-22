export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/store", label: "Tienda" },
  { href: "/blog", label: "Diario" },
  { href: "/historia", label: "Historia" },
];
