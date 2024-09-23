import { InfiniteGallery } from "@/app/_components/gallery/list";
import { getLogos } from "@/app/_actions/logos";

async function lastLogos() {
  const logos = await getLogos();
  return logos;
}
export const revalidate = 0;

export default async function Gallery() {
  const { hasMore, logos } = await lastLogos();
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:items-start lg:justify-center gap-6 flex-wrap">
        <InfiniteGallery logos={logos} hasMore={hasMore} />
      </div>
    </section>
  );
}
