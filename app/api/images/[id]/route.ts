import { NextRequest } from "next/server";
import fs from "fs/promises";

import prisma from "@/_utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const image = await prisma.logo.findUnique({
    where: { id: Number(id) },
  });

  if (!image) {
    return new Response(null, { status: 404 });
  }

  const buffer = await fs.readFile(
    `${process.env.PUBLIC_FILE_UPLOAD_DIR}/${image.id}.png`
  );

  if (!buffer) {
    return new Response(null, { status: 404 });
  }

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
