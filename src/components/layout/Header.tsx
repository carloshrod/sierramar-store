import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <Link href="/" className="font-serif text-xl">
        SierraMar
      </Link>
      <Navigation />
    </header>
  );
}
