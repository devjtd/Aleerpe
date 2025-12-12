import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

// NOTE: In a real production app, this key should be proxied through a backend
// to avoid exposing it to the client. For this demo, we use the env var directly.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Language code to full name mapping for the translation prompt
const LANGUAGE_NAMES: Record<string, string> = {
  'es': 'Spanish',
  'en': 'English',
  'pt': 'Portuguese',
  'fr': 'French',
  'it': 'Italian',
  'ja': 'Japanese'
};

/**
 * Translates manga pages using Gemini Vision capabilities.
 * It identifies speech bubbles and translates them to the target language.
 * @param imageBase64 - Base64 encoded image data
 * @param targetLanguageCode - Language code (es, en, pt, fr, it, ja)
 */
export const translateMangaPage = async (
  imageBase64: string,
  targetLanguageCode: string = 'es'
): Promise<TranslationResult[]> => {

  if (!API_KEY) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please configure the environment.");
  }

  // Get full language name from code, default to Spanish
  const targetLanguage = LANGUAGE_NAMES[targetLanguageCode] || 'Spanish';

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
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");

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

/**
 * Helper to convert image URL to base64
 */
const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Translates all pages of a chapter for audio playback.
 * Uses Gemini Vision to analyze each page and translate text to target language.
 * @param pageUrls - Array of image URLs for the chapter pages
 * @param targetLanguageCode - Language code (es, en, pt, fr, it, ja)
 * @param onProgress - Optional callback for progress updates (0-100)
 * @returns Array of AudioSegment with pageIndex and translated text
 */
export const translateChapterForAudio = async (
  pageUrls: string[],
  targetLanguageCode: string = 'es',
  onProgress?: (progress: number) => void
): Promise<{ pageIndex: number; text: string }[]> => {

  if (!API_KEY) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  const targetLanguage = LANGUAGE_NAMES[targetLanguageCode] || 'Spanish';
  const audioSegments: { pageIndex: number; text: string }[] = [];

  for (let i = 0; i < pageUrls.length; i++) {
    try {
      // Update progress
      if (onProgress) {
        onProgress(Math.round(((i + 0.5) / pageUrls.length) * 100));
      }

      // Convert image to base64
      const base64 = await urlToBase64(pageUrls[i]);
      const cleanBase64 = base64.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");

      // Create prompt for audio-friendly output
      const prompt = `
        Analyze this manga page image.
        Extract ALL text from speech bubbles, narration boxes, and sound effects.
        Translate everything into natural, fluent ${targetLanguage}.
        
        Return a JSON object with a single "script" field containing the translated text
        as a flowing narrative suitable for audio narration.
        Combine all dialogues into a coherent script.
        Include speaker attributions where clear (e.g., "Character Name says:").
        
        Example output: { "script": "Narrator: The forest was dark. Hero: Who goes there! Villain: I've been waiting for you." }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              script: { type: Type.STRING }
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        const result = JSON.parse(text);
        if (result.script && result.script.trim()) {
          audioSegments.push({
            pageIndex: i,
            text: result.script
          });
        }
      }

      // Update progress after page complete
      if (onProgress) {
        onProgress(Math.round(((i + 1) / pageUrls.length) * 100));
      }

    } catch (error) {
      console.error(`Error translating page ${i + 1}:`, error);
      // Continue with next page, don't fail entire chapter
      audioSegments.push({
        pageIndex: i,
        text: `[Page ${i + 1} - Translation unavailable]`
      });
    }
  }

  return audioSegments;
};
