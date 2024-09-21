import Image from "next/image";

import Arrow from "@/assets/svg/arrow.svg";
import Logo from "@/assets/logo.png";

export const Navigation = () => {
  return (
    <div className="rounded-full bg-zinc-950 border border-white/10 px-6 py-2.5 lg:py-4 flex items-center justify-center lg:justify-between max-w-max lg:max-w-xl lg:w-full mx-auto shadow-md relative">
      <div className="flex items-center justify-center gap-3 relative">
        <div className="relative">
          <Image src={Logo} alt="logo" className="size-6" />
          <div className="absolute left-0 -translate-x-[calc(100%+12px)] top-5 text-white flex justify-end gap-1 -rotate-6">
            <p className="font-mono text-sm text-white">AI Generated</p>
            <Image
              src={Arrow}
              alt="arrow"
              className="w-[30px] absolute -right-3 -top-1"
            />
          </div>
        </div>
        <p className="font-semibold text-lg text-white">LogoAI</p>
      </div>
      <ul className="hidden lg:flex items-center justify-right gap-3 text-white"></ul>
    </div>
  );
};
