import { FaSpinner } from "react-icons/fa";

export default function GalleryLoader() {
  return (
    <section id="gallery" className="w-full py-10 lg:py-16">
      <div className="mx-auto bg-amber-500/10 border border-amber-500/15 text-amber-500 px-3 py-1.5 rounded-full flex items-center gap-1 justify-center max-w-max text-xs mb-4">
        <span className="text-xs">⚡</span>
        Increase your creativity
      </div>
      <h3 className="max-w-4xl text-2xl lg:text-3xl text-[#aaaaaa] font-semibold mb-12 text-center mx-auto">
        Loading <span className="text-white">designs</span>...
      </h3>
      <div className="flex justify-center items-center min-h-[200px]">
        <FaSpinner className="animate-spin text-2xl text-white" />
      </div>
    </section>
  );
}
