"use client";

import { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/Section";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="text-center">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        No pudimos cargar el diario
      </h1>
      <p className="mt-4 text-muted-foreground">
        Hubo un problema al conectar con el servidor. Inténtalo de nuevo en
        unos momentos.
      </p>
      <Button
        className="mt-8"
        disabled={isPending}
        onClick={() => startTransition(() => reset())}
      >
        {isPending ? "Reintentando…" : "Reintentar"}
      </Button>
    </Section>
  );
}
