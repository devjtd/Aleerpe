import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

// NOTE: In a real production app, this key should be proxied through a backend
// to avoid exposing it to the client. For this demo, we use the env var directly.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Translates manga pages using Gemini Vision capabilities.
 * It identifies speech bubbles and translates them to the target language.
 */
export const translateMangaPage = async (
  imageBase64: string,
  targetLanguage: string = 'Spanish'
): Promise<TranslationResult[]> => {
  
  if (!API_KEY) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please configure the environment.");
  }

  try {
    const prompt = `
      Analyze this manga page image. 
      Identify all speech bubbles, narration boxes, or sound effects containing text.
      Transcribe the original text and translate it into natural-sounding ${targetLanguage}.
      Identify the likely speaker if possible (or use 'Narration', 'SFX', 'Unknown').
      
      Return a JSON array where each object has:
      - originalText: The text in the image.
      - translatedText: The translated text.
      - speaker: The character speaking or source of text.
    `;

    // Remove header if present in base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              originalText: { type: Type.STRING },
              translatedText: { type: Type.STRING },
              speaker: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const results = JSON.parse(text) as TranslationResult[];
    return results;

  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};
