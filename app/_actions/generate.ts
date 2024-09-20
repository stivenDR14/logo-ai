"use server";

import { HfInference } from "@huggingface/inference";
import fs from "fs/promises";

import { Form } from "@/_types";
import prisma from "@/_utils/prisma";

export async function generate({ brand_name, industry, description }: Form) {
  if (!process.env.PUBLIC_FILE_UPLOAD_DIR) {
    throw new Error("PUBLIC_FILE_UPLOAD_DIR is not set");
  }
  const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

  const prompt = await inference.chatCompletion({
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
    messages: [
      { role: "user", content: "lee, a noodle restaurant" },
      {
        role: "assistant",
        content:
          'logo,Minimalist,A pair of chopsticks and a bowl of rice with the word "Lee",',
      },
      { role: "user", content: "cat shop" },
      { role: "assistant", content: "wablogo,Minimalist,Leaf and cat,logo," },
      { role: "user", content: "Ato, real estate company" },
      {
        role: "assistant",
        content:
          'logo,Minimalist,A man stands in front of a door,his shadow forming the word "A",',
      },
      { role: "user", content: `${brand_name}, ${description}, ${industry}` },
    ],
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 0.7,
  });

  if (prompt?.choices[0]?.message?.content) {
    const hfRequest = await inference.textToImage({
      inputs: prompt.choices[0].message.content,
      model: "Shakker-Labs/FLUX.1-dev-LoRA-Logo-Design",
      parameters: {
        num_inference_steps: 24,
        guidance_scale: 3.5,
      },
    });

    const buffer = await hfRequest.arrayBuffer();
    const array = new Uint8Array(buffer);

    const newImage = await prisma.logo.create({
      data: {
        name: prompt.choices[0].message.content,
      },
    });

    const indexFile = newImage.id;

    const dir = await fs
      .opendir(process.env.PUBLIC_FILE_UPLOAD_DIR)
      .catch(() => null);
    if (!dir) await fs.mkdir(process.env.PUBLIC_FILE_UPLOAD_DIR);
    await fs.writeFile(
      `${process.env.PUBLIC_FILE_UPLOAD_DIR}/${indexFile}.png`,
      array
    );

    return { data: indexFile };
  }

  return {
    error: "Failed to generate logo",
  };
}
