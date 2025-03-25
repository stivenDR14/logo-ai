"use client";

import Image from "next/image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ImageWithLoader = ({
  src,
  alt,
  width,
  height,
  className = "",
}: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-2xl">
          <FaSpinner className="animate-spin text-2xl text-white" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};
