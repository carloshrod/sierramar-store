import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { ProcessValues } from "@/components/home/ProcessValues";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { Newsletter } from "@/components/layout/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <BrandStory />
      <ProcessValues />
      <JournalTeaser />
      <Newsletter />
    </>
  );
}
