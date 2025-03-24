"use server";

import { Form } from "@/src/types";
import { validateEnvironment } from "../utils/env-validator";
import { generateLogoPrompt } from "../api/huggingface/text-generation";
import { generateLogoImage } from "../api/huggingface/image-generation";
import { createLogoRecord } from "../db/logo";
import { saveLogoFile } from "../utils/file-storage";

export async function generate(formData: Form) {
  // Validar variables de entorno
  const { isValid, error } = validateEnvironment([
    "PUBLIC_FILE_UPLOAD_DIR",
    "HF_ACCESS_TOKEN",
  ]);

  if (!isValid) {
    return { error };
  }

  try {
    const promptResult = await generateLogoPrompt({
      brand_name: formData.brand_name,
      industry: formData.industry,
      description: formData.description,
    });

    if (promptResult.error) {
      return { error: promptResult.error };
    }

    if (!promptResult.prompt) {
      return { error: "No prompt generated" };
    }

    const imageResult = await generateLogoImage(promptResult.prompt);

    if (imageResult.error) {
      return { error: imageResult.error };
    }
    if (!imageResult.buffer) {
      return { error: "No image generated" };
    }

    const logoRecord = await createLogoRecord({
      name: promptResult.prompt,
    });

    const fileResult = await saveLogoFile(logoRecord.id, imageResult.buffer);

    if (fileResult.error) {
      return { error: fileResult.error };
    }

    return { data: logoRecord.id };
  } catch (error) {
    console.error("Logo generation failed:", error);
    return { error: "An unexpected error occurred during logo generation" };
  }
}
