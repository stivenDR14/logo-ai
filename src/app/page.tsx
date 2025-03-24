import { Gallery } from "../components/gallery";
import { Generation } from "../components/generation";
import { HeroHeader } from "../components/ui/hero-header";
import { getLastLogos } from "../lib/actions/logos";

export default async function Home() {
  const logos = await getLastLogos();
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
