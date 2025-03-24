import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface LogoData {
  name: string;
}

export async function createLogoRecord(data: LogoData) {
  try {
    if (!data.name) {
      throw new Error("Missing required logo data");
    }

    const logo = await prisma.logo.create({
      data: {
        name: data.name,
      },
    });

    return logo;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create logo record");
  }
}
