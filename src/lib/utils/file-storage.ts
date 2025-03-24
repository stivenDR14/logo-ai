import fs from "fs/promises";
import path from "path";
import { validateEnvironment } from "./env-validator";

export async function saveLogoFile(id: number, fileData: Uint8Array) {
  try {
    const { isValid, error } = validateEnvironment(["PUBLIC_FILE_UPLOAD_DIR"]);

    if (!isValid) {
      return { error };
    }

    const uploadDir = process.env.PUBLIC_FILE_UPLOAD_DIR!;

    // Validación de seguridad para el directorio
    const normalizedDir = path.normalize(uploadDir);
    if (!normalizedDir || normalizedDir.includes("..")) {
      return { error: "Invalid upload directory path" };
    }

    // Asegurar que el directorio exista
    await fs.mkdir(normalizedDir, { recursive: true });

    // Validar que el ID sea seguro para nombre de archivo
    if (!/^\d+$/.test(id.toString())) {
      return { error: "Invalid file identifier" };
    }

    const filePath = path.join(normalizedDir, `${id}.png`);

    await fs.writeFile(filePath, fileData);

    return { success: true, path: filePath };
  } catch (error) {
    console.error("File storage error:", error);
    return { error: "Failed to save logo file" };
  }
}
