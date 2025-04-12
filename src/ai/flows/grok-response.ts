'use server';

/**
 * @fileOverview Generates a response using the Grok LLM based on user input.
 *
 * - generateGrokResponse - A function that generates a Grok response.
 * - GenerateGrokResponseInput - The input type for the generateGrokResponse function.
 * - GenerateGrokResponseOutput - The return type for the generateGrokResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateGrokResponseInputSchema = z.object({
  userInput: z.string().describe('The user\'s input text.'),
});
export type GenerateGrokResponseInput = z.infer<typeof GenerateGrokResponseInputSchema>;

const GenerateGrokResponseOutputSchema = z.object({
  grokResponse: z.string().describe('The Grok LLM\'s response to the user input.'),
});
export type GenerateGrokResponseOutput = z.infer<typeof GenerateGrokResponseOutputSchema>;

export async function generateGrokResponse(input: GenerateGrokResponseInput): Promise<GenerateGrokResponseOutput> {
  return generateGrokResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGrokResponsePrompt',
  input: {
    schema: z.object({
      userInput: z.string().describe('The user\'s input text.'),
    }),
  },
  output: {
    schema: z.object({
      grokResponse: z.string().describe('The Grok LLM\'s response to the user input.'),
    }),
  },
  prompt: `You are Grok, a large language model. Respond to the following user input.
  User Input: {{{userInput}}}`,
});

const generateGrokResponseFlow = ai.defineFlow<
  typeof GenerateGrokResponseInputSchema,
  typeof GenerateGrokResponseOutputSchema
>(
  {
    name: 'generateGrokResponseFlow',
    inputSchema: GenerateGrokResponseInputSchema,
    outputSchema: GenerateGrokResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
