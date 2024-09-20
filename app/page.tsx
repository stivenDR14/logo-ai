import { Gallery } from "./_components/gallery";
import { Generation } from "./_components/generation";
import { HeroHeader } from "./_components/hero-header";

async function getLogos() {
  try {
    const logos = await fetch(process.env.API_URL + "/api/logo")
      .then((res) => res.json())
      .then((data) => data);
    return logos;
  } catch (error: any) {
    console.error("Error fetching logos: ", error.message);
    return [];
  }
}
export const revalidate = 0;

export default async function Home() {
  const logos = await getLogos();
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
