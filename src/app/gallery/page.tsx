import { InfiniteGallery } from "@/src/components/gallery/list";
import GalleryLoader from "@/src/components/gallery/loader";
import { getLogos } from "@/src/lib/actions/logos";
import { Suspense } from "react";

export default function Gallery() {
  return (
    <Suspense fallback={<GalleryLoader />}>
      <GallerySection />
    </Suspense>
  );
}

async function GallerySection() {
  const { hasMore, logos } = await getLogos();
  return (
    <section className="w-full py-10 py-16 h-full">
      <InfiniteGallery logos={logos} hasMore={hasMore} />
    </section>
  );
}
