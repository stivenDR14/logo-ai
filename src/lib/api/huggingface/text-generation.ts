import { HfInference } from "@huggingface/inference";
import { LOGO_PROMPT_EXAMPLES } from "@/src/lib/server-constants";

interface PromptParams {
  brand_name: string;
  industry: string;
  description: string;
}

export async function generateLogoPrompt({
  brand_name,
  industry,
  description,
}: PromptParams) {
  try {
    if (!process.env.HF_ACCESS_TOKEN) {
      return { error: "HF_ACCESS_TOKEN is not configured" };
    }

    const inference = new HfInference(process.env.HF_ACCESS_TOKEN, {
      use_cache: false,
    });

    const response = await inference.chatCompletion({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: [
        ...LOGO_PROMPT_EXAMPLES,
        { role: "user", content: `${brand_name}, ${description}, ${industry}` },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.7,
    });

    if (!response?.choices?.[0]?.message?.content) {
      return { error: "Failed to generate logo prompt" };
    }

    return { prompt: response.choices[0].message.content };
  } catch (error) {
    console.error("Text generation error:", error);
    return { error: "Failed to communicate with text generation API" };
  }
}
