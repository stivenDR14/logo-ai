"use server";

import { Form } from "@/src/types";
import { validateEnvironment } from "../utils/env-validator";
import { generateLogoPrompt } from "../api/huggingface/text-generation";
import { generateLogoImage } from "../api/huggingface/image-generation";
import { createLogoRecord } from "../db/logo";
import { saveLogoFile } from "../utils/file-storage";

// Función auxiliar para actualizar el progreso
async function updateProgress(sessionId: string, progressData: any) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, progress: progressData }),
    });
  } catch (error) {
    console.error("Error updating progress:", error);
  }
}

export async function generate(formData: Form, sessionId: string) {
  // Validar variables de entorno
  const { isValid, error } = validateEnvironment([
    "PUBLIC_FILE_UPLOAD_DIR",
    "HF_ACCESS_TOKEN",
  ]);

  if (!isValid) {
    await updateProgress(sessionId, {
      progress: 0,
      step: "error",
      message: "Configuration error",
      error,
      completed: true,
    });
    return { error };
  }

  try {
    // Paso 1: Generar prompt
    await updateProgress(sessionId, {
      progress: 20,
      step: "prompt",
      message: "Analyzing brand information...",
    });

    const promptResult = await generateLogoPrompt({
      brand_name: formData.brand_name,
      industry: formData.industry,
      description: formData.description,
    });

    if (promptResult.error) {
      await updateProgress(sessionId, {
        progress: 20,
        step: "error",
        message: "Error generating prompt",
        error: promptResult.error,
        completed: true,
      });
      return { error: promptResult.error };
    }

    if (!promptResult.prompt) {
      await updateProgress(sessionId, {
        progress: 20,
        step: "error",
        message: "No prompt generated",
        error: "No prompt generated",
        completed: true,
      });
      return { error: "No prompt generated" };
    }

    // Paso 2: Generar imagen
    await updateProgress(sessionId, {
      progress: 50,
      step: "image",
      message: "Generating logo image...",
    });

    const imageResult = await generateLogoImage(promptResult.prompt);

    if (imageResult.error) {
      await updateProgress(sessionId, {
        progress: 50,
        step: "error",
        message: "Error generating image",
        error: imageResult.error,
        completed: true,
      });
      return { error: imageResult.error };
    }

    if (!imageResult.buffer) {
      await updateProgress(sessionId, {
        progress: 50,
        step: "error",
        message: "No image generated",
        error: "No image generated",
        completed: true,
      });
      return { error: "No image generated" };
    }

    // Paso 3: Guardar en base de datos
    await updateProgress(sessionId, {
      progress: 80,
      step: "save",
      message: "Saving design...",
    });

    const logoRecord = await createLogoRecord({
      name: promptResult.prompt,
    });

    const fileResult = await saveLogoFile(logoRecord.id, imageResult.buffer);

    if (fileResult.error) {
      await updateProgress(sessionId, {
        progress: 80,
        step: "error",
        message: "Error saving logo",
        error: fileResult.error,
        completed: true,
      });
      return { error: fileResult.error };
    }

    // Finalizado
    await updateProgress(sessionId, {
      progress: 100,
      step: "completed",
      message: "Logo generated successfully",
      completed: true,
    });

    return { data: logoRecord.id };
  } catch (error) {
    await updateProgress(sessionId, {
      progress: 0,
      step: "error",
      message: "Unexpected error during logo generation",
      error: "An unexpected error occurred during logo generation",
      completed: true,
    });
    console.error("Logo generation failed:", error);
    return { error: "An unexpected error occurred during logo generation" };
  }
}
