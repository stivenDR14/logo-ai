import { InfiniteGallery } from "@/src/components/gallery/list";
import { getLogos } from "@/src/lib/actions/logos";

export default async function Gallery() {
  const { hasMore, logos } = await getLogos();
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:items-start lg:justify-center gap-6 flex-wrap">
        <InfiniteGallery logos={logos} hasMore={hasMore} />
      </div>
    </section>
  );
}
