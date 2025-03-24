"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { useState } from "react";
import { getLogos } from "@/src/lib/actions/logos";

export const InfiniteGallery = ({
  logos: initialLogos,
  hasMore: initialHasMore,
}: {
  logos: Array<number>;
  hasMore: boolean;
}) => {
  const [page, setPage] = useState(0);
  const [logos, setLogos] = useState([...initialLogos]);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const fetchMoreData = async () => {
    const newLogos = await getLogos(page + 1);
    setLogos([...logos, ...newLogos.logos]);
    setHasMore(newLogos.hasMore);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      scrollableTarget="content-wrapper"
      dataLength={logos.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="w-full max-lg:col-span-2 text-center">Loading...</div>
      }
      className="max-lg:grid max-lg:grid-cols-2 lg:flex lg:items-start lg:justify-center gap-6 flex-wrap"
      endMessage={
        <div className="w-full max-lg:col-span-2 text-zinc-400 text-center">
          Yay! You have seen it all
        </div>
      }
    >
      {logos.map((index) => (
        <Image
          key={index}
          src={`/api/images/${index}`}
          alt="Generated logo"
          width={500}
          height={500}
          className="rounded-2xl w-full lg:size-72 object-cover"
        />
      ))}
    </InfiniteScroll>
  );
};
