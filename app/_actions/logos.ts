"use server";

import prisma from "@/_utils/prisma";

export const getLastLogos = async () => {
  const images = await prisma.logo.findMany({
    select: {
      id: true,
    },
    take: 24,
    orderBy: {
      id: "desc",
    },
  });
  return images.map((image) => image.id);
};

const ITEMS_PER_PAGE = 24;

export const getLogos = async (page: number = 0) => {
  const images = await prisma.logo.findMany({
    select: {
      id: true,
    },
    skip: page * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: {
      id: "desc",
    },
  });

  const total = await prisma.logo.count();
  const hasMore = total > (page + 1) * ITEMS_PER_PAGE;

  return {
    logos: images.map((image) => image.id),
    hasMore,
  };
};
