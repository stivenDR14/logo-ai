import { NextRequest } from "next/server";
import prisma from "@/_utils/prisma";

export async function GET(req: NextRequest) {
  const images = await prisma.logo.findMany({
    select: {
      id: true,
    },
    take: 24,
    orderBy: {
      id: "desc",
    },
  });
  return Response.json(images.map((image) => image.id));
}
