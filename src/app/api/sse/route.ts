import { NextRequest } from "next/server";

// In-memory storage for progress (use Redis in production)
const progressStore: Record<string, any> = {};

export function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session");

  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }

  // Configure headers for SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Function to send updates to the client
      const sendProgress = () => {
        const progress = progressStore[sessionId] || {
          progress: 0,
          step: "initializing",
          message: "Initializing...",
        };

        // Send data in SSE format
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(progress)}\n\n`)
        );

        // If the process has finished, close the connection
        if (progress.completed) {
          controller.close();
          delete progressStore[sessionId];
        } else {
          // Continue sending updates
          setTimeout(sendProgress, 500);
        }
      };

      // Start sending updates
      sendProgress();
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

// Endpoint to update the progress (for internal use)
export async function POST(request: NextRequest) {
  const { sessionId, progress } = await request.json();

  if (!sessionId) {
    return Response.json({ error: "Session ID is required" }, { status: 400 });
  }

  progressStore[sessionId] = progress;
  return Response.json({ success: true });
}
