import Image from "next/image";
import Link from "next/link";

export const Gallery = ({ logos }: { logos: Array<number> }) => {
  return (
    <section id="gallery" className="w-full py-10 lg:py-16">
      <div className="mx-auto bg-amber-500/10 border border-amber-500/15 text-amber-500 px-3 py-1.5 rounded-full flex items-center gap-1 justify-center max-w-max text-xs mb-4">
        <span className="text-xs">⚡</span>
        Increase your creativity
      </div>
      <h3 className="max-w-4xl text-2xl lg:text-3xl text-[#aaaaaa] font-semibold mb-12 text-center mx-auto">
        See our <span className="text-white">last designs</span>.
      </h3>
      <div className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:items-start lg:justify-center gap-6 flex-wrap">
        {logos.map((index) => (
          <Image
            key={index}
            src={`/api/images/${index}`}
            alt="Generated logo"
            width={500}
            height={500}
            className="rounded-2xl w-full lg:size-72 object-cover transition-transform hover:scale-105 duration-300"
          />
        ))}
      </div>
      <div className="mt-12 flex items-center justify-center">
        <Link
          href="/gallery"
          className="rounded-full text-zinc-300 bg-zinc-900 font-medium text-base px-6 py-3 hover:bg-opacity-80 transition-all duration-150 text-center max-lg:w-full"
        >
          View all examples
        </Link>
      </div>
    </section>
  );
};
