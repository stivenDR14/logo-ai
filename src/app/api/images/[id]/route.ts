import { NextRequest } from "next/server";
import fs from "fs/promises";
import { prisma } from "@/src/lib/db/logo";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);

    if (isNaN(id)) {
      return new Response(null, {
        status: 400,
        statusText: "Invalid ID format",
      });
    }

    const image = await prisma.logo.findUnique({
      where: { id },
    });

    if (!image) {
      return new Response(null, {
        status: 404,
        statusText: "Image not found",
      });
    }

    if (!process.env.PUBLIC_FILE_UPLOAD_DIR) {
      return new Response(null, {
        status: 500,
        statusText: "Server configuration error",
      });
    }

    try {
      const buffer = await fs.readFile(
        `${process.env.PUBLIC_FILE_UPLOAD_DIR}/${image.id}.png`
      );

      return new Response(buffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch (fileError) {
      console.error("File read error:", fileError);
      return new Response(null, {
        status: 404,
        statusText: "Image file not found",
      });
    }
  } catch (error) {
    console.error("Image API error:", error);
    return new Response(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }
}
