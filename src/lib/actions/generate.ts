"use server";

import { validateEnvironment } from "../utils/env-validator";
import { generateLogoPrompt } from "../api/huggingface/text-generation";
import { generateLogoImage } from "../api/huggingface/image-generation";
import { createLogoRecord } from "../db/logo";
import { saveLogoFile } from "../utils/file-storage";
import { Form } from "@/src/types";

async function updateProgress(
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController,
  sessionId: string,
  progressData: any
) {
  try {
    controller.enqueue(
      encoder.encode(`data: ${JSON.stringify(progressData)}\n\n`)
    );
    if (progressData.completed) {
      controller.close();
    }
  } catch (error) {
    console.error("Error updating progress:", error);
  }
}

export async function generate(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  formData: Omit<Form, "style" | "display_name">,
  sessionId: string
) {
  const { isValid, error } = validateEnvironment([
    "PUBLIC_FILE_UPLOAD_DIR",
    "HF_ACCESS_TOKEN",
  ]);

  if (!isValid) {
    await updateProgress(encoder, controller, sessionId, {
      progress: 0,
      step: "error",
      message: "Configuration error",
      error,
      completed: true,
    });
    return { error };
  }

  try {
    await updateProgress(encoder, controller, sessionId, {
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
      await updateProgress(encoder, controller, sessionId, {
        progress: 20,
        step: "error",
        message: "Error generating prompt",
        error: promptResult.error,
        completed: true,
      });
      return { error: promptResult.error };
    }

    if (!promptResult.prompt) {
      await updateProgress(encoder, controller, sessionId, {
        progress: 20,
        step: "error",
        message: "No prompt generated",
        error: "No prompt generated",
        completed: true,
      });
      return { error: "No prompt generated" };
    }

    await updateProgress(encoder, controller, sessionId, {
      progress: 50,
      step: "image",
      message: "Generating logo image...",
    });

    const imageResult = await generateLogoImage(promptResult.prompt);

    if (imageResult.error) {
      await updateProgress(encoder, controller, sessionId, {
        progress: 50,
        step: "error",
        message: "Error generating image",
        error: imageResult.error,
        completed: true,
      });
      return { error: imageResult.error };
    }

    if (!imageResult.buffer) {
      await updateProgress(encoder, controller, sessionId, {
        progress: 50,
        step: "error",
        message: "No image generated",
        error: "No image generated",
        completed: true,
      });
      return { error: "No image generated" };
    }

    await updateProgress(encoder, controller, sessionId, {
      progress: 80,
      step: "save",
      message: "Saving design...",
    });

    const logoRecord = await createLogoRecord({
      name: promptResult.prompt,
    });

    const fileResult = await saveLogoFile(logoRecord.id, imageResult.buffer);

    if (fileResult.error) {
      await updateProgress(encoder, controller, sessionId, {
        progress: 80,
        step: "error",
        message: "Error saving logo",
        error: fileResult.error,
        completed: true,
      });
      return { error: fileResult.error };
    }

    // Finalizado
    await updateProgress(encoder, controller, sessionId, {
      progress: 100,
      step: "completed",
      message: `${logoRecord.id}`,
      completed: true,
    });

    return { data: logoRecord.id };
  } catch (error) {
    await updateProgress(encoder, controller, sessionId, {
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
