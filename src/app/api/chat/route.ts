import { streamText, UIMessage } from "ai";
import { createOllama } from "ollama-ai-provider";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: ollama(process.env.MODEL || "phi:latest"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
