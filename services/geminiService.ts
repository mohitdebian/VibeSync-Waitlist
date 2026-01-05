import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is not set. Gemini features will use fallback responses.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getVibeDescription = async (songTitle: string, artist: string): Promise<string> => {
  if (!ai) {
    return "This track is pure fire! 🔥";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Describe the "vibe" of the song "${songTitle}" by ${artist} in one short, cool, energetic sentence suitable for a social music app. Do not use quotes. Use emojis.`,
    });
    return response.text || "Vibing to the beat! 🎵";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "This track is pure fire! 🔥";
  }
};

export const getRoomNameSuggestion = async (): Promise<string> => {
  if (!ai) {
    return "Vibe Room";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a cool, short 2-3 word name for a music listening room (e.g., 'Neon Nights', 'Chill Zone'). Just the name.",
    });
    return response.text?.trim() || "Vibe Room";
  } catch (e) {
    return "Music Lounge";
  }
}