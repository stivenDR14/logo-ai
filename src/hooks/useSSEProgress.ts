import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface ProgressData {
  progress: number;
  message: string;
  step: string;
  error?: string;
  completed?: boolean;
}

export function useSSEProgress(sessionId: string, isLoading: boolean) {
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Only establish SSE connection if loading and sessionId exists
    if (isLoading && sessionId) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      // Create new SSE connection
      const eventSource = new EventSource(`/api/sse?session=${sessionId}`);
      eventSourceRef.current = eventSource;

      // Handle incoming messages
      eventSource.onmessage = (event) => {
        try {
          const data: ProgressData = JSON.parse(event.data);

          setProgress(data.progress || 0);
          setMessage(data.message || "Processing...");

          // Handle completion
          if (data.completed) {
            setIsComplete(true);
            eventSource.close();
            eventSourceRef.current = null;

            if (data.step === "error") {
              toast.error(data.error || "An error occurred during generation");
            }
          }
        } catch (err) {
          console.error("Error parsing SSE event data:", err);
        }
      };

      // Handle connection errors
      eventSource.onerror = () => {
        eventSource.close();
        eventSourceRef.current = null;
        toast.error("Error connecting to the server");
        setIsComplete(true);
      };
    }

    // Clean up connection when loading state changes to false
    if (!isLoading && eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [isLoading, sessionId]);

  // Reset progress when starting a new generation
  useEffect(() => {
    if (isLoading && !isComplete) {
      setProgress(0);
      setMessage("Initializing...");
      setIsComplete(false);
    }
  }, [isLoading, isComplete]);

  return {
    progress,
    message,
    isComplete,
  };
}
