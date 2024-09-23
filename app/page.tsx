import { getLastLogos } from "./_actions/logos";
import { Gallery } from "./_components/gallery";
import { Generation } from "./_components/generation";
import { HeroHeader } from "./_components/hero-header";

async function lastLogos() {
  const logos = await getLastLogos();
  return logos;
}
export const revalidate = 0;

export default async function Home() {
  const logos = await lastLogos();
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <HeroHeader />
        <Generation />
      </div>
      <Gallery logos={logos} />
    </section>
  );
}
