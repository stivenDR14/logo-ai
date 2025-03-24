import { Suspense } from "react";
import { Gallery } from "../components/gallery";
import { Generation } from "../components/generation";
import { HeroHeader } from "../components/ui/hero-header";
import { getLastLogos } from "../lib/actions/logos";
import GalleryLoader from "../components/gallery/loader";

export default function Home() {
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <HeroHeader />
        <Generation />
      </div>
      <Suspense fallback={<GalleryLoader />}>
        <GallerySection />
      </Suspense>
    </section>
  );
}

// Componente asíncrono extraído
async function GallerySection() {
  const logos = await getLastLogos();
  return <Gallery logos={logos} />;
}
