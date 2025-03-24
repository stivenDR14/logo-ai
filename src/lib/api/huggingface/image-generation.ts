import { HfInference } from "@huggingface/inference";

export async function generateLogoImage(prompt: string) {
  try {
    if (!process.env.HF_ACCESS_TOKEN) {
      return { error: "HF_ACCESS_TOKEN is not configured" };
    }

    const inference = new HfInference(process.env.HF_ACCESS_TOKEN, {
      use_cache: false,
    });

    const response = await inference.textToImage({
      inputs: prompt,
      model: "Shakker-Labs/FLUX.1-dev-LoRA-Logo-Design",
      parameters: {
        num_inference_steps: 24,
        guidance_scale: 3.5,
      },
    });

    const buffer = await response.arrayBuffer();

    return { buffer: new Uint8Array(buffer) };
  } catch (error) {
    console.error("Image generation error:", error);
    return { error: "Failed to generate logo image" };
  }
}
