import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
import { tools } from '../../../../ai/tools';
import { groq } from "@ai-sdk/groq";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: groq("openai/gpt-oss-120b"),
    system: 'You are a friendly assistant!',
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}



