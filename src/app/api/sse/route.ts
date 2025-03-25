import { generate } from "@/src/lib/actions/generate";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session");
  const brandName = request.nextUrl.searchParams.get("brandName");
  const industry = request.nextUrl.searchParams.get("industry");
  const description = request.nextUrl.searchParams.get("description");

  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }

  if (!brandName || !industry || !description) {
    return new Response("Brand name, industry, and description are required", {
      status: 400,
    });
  }

  // Configure headers for SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      generate(controller, encoder, {
        brand_name: brandName,
        industry: industry,
        description: description,
      }, sessionId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
