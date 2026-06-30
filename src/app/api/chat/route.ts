import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { retrieveContext } from '@/actions/retrieval';
import { auth } from "@clerk/nextjs/server";

// Configure the OpenAI provider to use Groq's Base URL and API Key
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// We are using the Llama 3 8B model on Groq. Fast and highly capable.
const MODEL = "llama3-8b-8192";

export async function POST(req: Request) {
  // 1. Authenticate user
  const { userId, orgId }: any = auth();
  if (!userId || !orgId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Extract the chat messages from the request body
  const { messages } = await req.json();

  // Get the latest user message
  const lastMessage = messages[messages.length - 1];
  const userQuestion = lastMessage.content;

  // 3. RAG: Retrieve context from Qdrant using our Server Action
  let context = "";
  try {
    context = await retrieveContext(userQuestion);
  } catch (error) {
    console.error("Context retrieval error:", error);
    context = "No internal context could be retrieved due to an error.";
  }

  // 4. Construct the System Prompt (Prompt Engineering)
  const systemPrompt = `
You are an expert AI Sales Copilot. Your job is to help sales representatives answer questions, draft proposals, and prepare for meetings.

CRITICAL INSTRUCTIONS:
1. You MUST answer the user's question based strictly on the CONTEXT provided below.
2. If the answer is not contained within the CONTEXT, you must explicitly say: "I do not have information regarding that in the uploaded documents." Do not guess or hallucinate.
3. Be professional, concise, and persuasive.

---
CONTEXT:
${context}
---
  `;

  // 5. Generate the streaming response using Vercel AI SDK
  const result = await streamText({
    model: groq(MODEL),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    temperature: 0.2, // Low temperature = more factual, less creative (good for RAG)
  });

  // 6. Return the streaming response to the client
  return result.toAIStreamResponse();
}
