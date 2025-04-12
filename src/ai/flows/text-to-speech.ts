'use server';
/**
 * @fileOverview Converts AI responses to voice output using ElevenLabs.
 *
 * - textToSpeechFlow - A function that handles the text-to-speech conversion process.
 * - TextToSpeechInput - The input type for the textToSpeechFlow function.
 * - TextToSpeechOutput - The return type for the textToSpeechFlow function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {textToSpeech as textToSpeechService, TTSOptions} from '@/services/eleven-labs';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  voiceId: z.string().describe('The ID of the voice to use for speech synthesis.'),
  modelId: z.string().describe('The model ID to use for speech synthesis.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audioUrl: z.string().describe('The URL of the generated audio.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}

const textToSpeechFlow = ai.defineFlow<
  typeof TextToSpeechInputSchema,
  typeof TextToSpeechOutputSchema
>(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async input => {
    const ttsOptions: TTSOptions = {
      voiceId: input.voiceId,
      modelId: input.modelId,
    };
    const audioBlob = await textToSpeechService(input.text, ttsOptions);

    // Convert the Blob to a data URL.
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    return {audioUrl};
  }
);
