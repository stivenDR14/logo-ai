"use client";

import { ReactElement, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { usePagination } from "@/src/hooks/usePagination";
import { ImageWithLoader } from "../ui/image-with-loader";
import { FaSpinner } from "react-icons/fa6";

export const InfiniteGallery = ({
  logos: initialLogos,
  hasMore: initialHasMore,
}: {
  logos: Array<number>;
  hasMore: boolean;
}) => {
  const { logos } = usePagination(initialHasMore, initialLogos);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <FaSpinner className="animate-spin text-2xl text-white" />
        </div>
      )}
      <VirtuosoGrid
        id="scrollable-container"
        data={logos}
        listClassName="max-lg:grid max-lg:grid-cols-2 grid grid-cols-3 gap-8 flex-wrap px-4 py-8"
        itemContent={(index, element): ReactElement => (
          <ImageWithLoader
            key={index}
            src={`/api/images/${element}`}
            alt="Generated logo"
            width={500}
            height={500}
            className="rounded-2xl w-full lg:size-76 object-cover transition-transform hover:scale-105 duration-300"
          />
        )}
        totalCount={logos.length}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};
