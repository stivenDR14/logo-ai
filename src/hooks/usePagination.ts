import { useEffect, useState } from "react";
import { getLogos } from "../lib/actions/logos";

export const usePagination = (
  hasMoreInitial: boolean,
  initialLogos: number[]
) => {
  const [page, setPage] = useState(0);
  const [logos, setLogos] = useState(initialLogos);
  const [hasMore, setHasMore] = useState(hasMoreInitial);

  const fetchMoreData = async () => {
    const newLogos = await getLogos(page + 1);
    setLogos([...logos, ...newLogos.logos]);
    setHasMore(newLogos.hasMore);
    setPage(page + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore &&
        containerScroll &&
        containerScroll.scrollTop + containerScroll.clientHeight >=
          containerScroll.scrollHeight
      ) {
        fetchMoreData();
      }
    };

    let containerScroll: HTMLElement | null = null;
    containerScroll = document.getElementById("scrollable-container");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    containerScroll && containerScroll.addEventListener("scroll", handleScroll);

    return (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      containerScroll &&
        containerScroll.removeEventListener("scroll", handleScroll);
    };
  }, [logos]);

  return { logos };
};
