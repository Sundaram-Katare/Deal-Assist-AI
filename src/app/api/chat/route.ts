import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, tool } from 'ai';
import { retrieveContext } from '@/actions/retrieval';
import { auth } from "@clerk/nextjs/server";
import { z } from 'zod';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama3-8b-8192";

export async function POST(req: Request) {
  const { userId, orgId }: any = auth();
  if (!userId || !orgId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const userQuestion = lastMessage.content;

  // RAG: Retrieve context
  let context = "";
  try {
    context = await retrieveContext(userQuestion);
  } catch (error) {
    console.error("Context retrieval error:", error);
  }

  const systemPrompt = `
You are an elite AI Sales Copilot. Your goal is to help sales reps close deals.
You have access to internal company documents.

CONTEXT:
${context}

INSTRUCTIONS:
1. Product Q&A: Answer directly based on CONTEXT.
2. Objection Handling: Use the "Feel, Felt, Found" framework based on CONTEXT.
3. If the user asks for a proposal, competitor comparison, or meeting prep, you MUST use the provided tools to output structured JSON data. Do not output raw text for these tasks.
  `;

  const result = await streamText({
    model: groq(MODEL),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    temperature: 0.2,
    tools: {
      generateProposal: tool({
        description: 'Generate a structured sales proposal for a client based on the context.',
        parameters: z.object({
          clientName: z.string().describe('The name of the prospective client'),
          executiveSummary: z.string().describe('A persuasive 2-sentence summary'),
          proposedSolution: z.string().describe('The specific product/service recommended'),
          pricingEstimate: z.string().describe('Estimated cost based on context'),
          nextSteps: z.array(z.string()).describe('List of actionable next steps'),
        }),
        execute: async (proposalData) => {
          // In a real app, you could save this proposal to the database here
          return {
            success: true,
            message: "Proposal generated successfully in structured format.",
            data: proposalData
          };
        },
      }),
      compareCompetitor: tool({
        description: 'Generate a structured comparison against a specific competitor.',
        parameters: z.object({
          competitorName: z.string(),
          ourStrengths: z.array(z.string()),
          theirWeaknesses: z.array(z.string()),
          killPhrase: z.string().describe('A 1-sentence powerful statement to win the deal'),
        }),
        execute: async (comparisonData) => {
          return { success: true, data: comparisonData };
        },
      }),
      prepareMeeting: tool({
        description: 'Generate a structured meeting preparation brief.',
        parameters: z.object({
          prospectName: z.string(),
          keyObjectives: z.array(z.string()),
          questionsToAsk: z.array(z.string()),
          potentialObjections: z.array(z.string()),
        }),
        execute: async (prepData) => {
          return { success: true, data: prepData };
        },
      })
    },
  });

  return result.toAIStreamResponse();
}
