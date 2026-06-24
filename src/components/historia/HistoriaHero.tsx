"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils/scroll";
import { STRAPI_URL } from "@/lib/constants";

const SCROLL_TARGET_ID = "el-origen";

export function HistoriaHero() {
  const scrollToStory = () => scrollToElement(SCROLL_TARGET_ID);

  return (
    <div className="relative isolate overflow-hidden bg-foreground">
      <Image
        src={`${STRAPI_URL}/uploads/photo_1587369403245_a10d1784662f_e14244fd71.jpeg`}
        alt="Amanecer sobre una cordillera cubierta de niebla"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/70 to-foreground/20" />
      <Container className="relative flex h-[calc(100vh-80px)] flex-col justify-end py-12 sm:py-16">
        <span className="text-sm font-medium tracking-wide text-background/60 uppercase">
          Nuestra historia
        </span>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-background sm:text-6xl lg:text-8xl">
          De la sierra al mar, una taza a la vez.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-background/80">
          Un recorrido que empieza en la montaña, donde se cultiva el grano, y
          termina en la costa, donde lo tostamos y lo compartimos contigo.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8 w-fit border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
          onClick={scrollToStory}
        >
          Conocer la historia
          <ChevronDown />
        </Button>
      </Container>
    </div>
  );
}
