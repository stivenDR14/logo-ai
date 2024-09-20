"use server";

import prisma from "@/_utils/prisma";

export const getLogos = async () => {
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
