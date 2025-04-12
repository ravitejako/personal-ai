'use server';
/**
 * @fileOverview Generates an initial prompt or conversation starter for new users.
 *
 * - generateInitialPrompt - A function that generates the initial prompt.
 * - GenerateInitialPromptInput - The input type for the generateInitialPrompt function.
 * - GenerateInitialPromptOutput - The return type for the generateInitialPrompt function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateInitialPromptInputSchema = z.object({
  topic: z.string().describe('The topic or interest to base the initial prompt on.'),
});
export type GenerateInitialPromptInput = z.infer<typeof GenerateInitialPromptInputSchema>;

const GenerateInitialPromptOutputSchema = z.object({
  initialPrompt: z.string().describe('The generated initial prompt or conversation starter.'),
});
export type GenerateInitialPromptOutput = z.infer<typeof GenerateInitialPromptOutputSchema>;

export async function generateInitialPrompt(input: GenerateInitialPromptInput): Promise<GenerateInitialPromptOutput> {
  return generateInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialPromptPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic or interest to base the initial prompt on.'),
    }),
  },
  output: {
    schema: z.object({
      initialPrompt: z.string().describe('The generated initial prompt or conversation starter.'),
    }),
  },
  prompt: `You are an AI companion designed to engage new users in conversation. Based on the user's stated topic of interest, generate an initial prompt or question to begin the conversation.\n\nTopic: {{{topic}}}`,
});

const generateInitialPromptFlow = ai.defineFlow<
  typeof GenerateInitialPromptInputSchema,
  typeof GenerateInitialPromptOutputSchema
>(
  {
    name: 'generateInitialPromptFlow',
    inputSchema: GenerateInitialPromptInputSchema,
    outputSchema: GenerateInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
