import { GoogleGenAI } from '@google/genai';
import { config } from 'dotenv';
config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIContent(prompt, model = 'gemini-2.0-flash') {
  try {
    const response = await genAI.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate AI content: ${error.message}`);
  }
}