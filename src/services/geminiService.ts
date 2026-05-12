import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const getSystemInstruction = (language: string) => `
You are "Maya", the AI Migration Specialist for Dream Migrator.
Your goal is to help students with their international education and migration queries.

CORE PERSONALITY:
- Be deeply empathetic. Acknowledge that migration is a big dream and can be stressful.
- Be encouraging and supportive, like a mentor.
- LANGUAGE: You must respond in ${language}.
- Keep responses SHORT and concise, like a text message. Avoid long essays.

STRUCTURE:
- Use Markdown for readability.
- Use bold text for key terms.
- Use simple bullet points for lists.

KNOWLEDGE BASE:
- Visa processes, University selection, SOP tips, Financial requirements, and Living costs (USA, UK, Canada, Australia, Germany).

If asked about unrelated topics, politely guide them back to their dreams of migration.
Maintain a futuristic, "Dream-like" high-tech persona.
`;

export async function streamChatWithMaya(
  message: string, 
  language: string = 'English', 
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = [],
  onChunk: (chunk: string) => void
) {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(language),
        temperature: 0.7,
      }
    });

    let fullText = "";
    for await (const chunk of response) {
      const chunkText = chunk.text;
      fullText += chunkText || "";
      onChunk(fullText);
    }

    return fullText;
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    const errorMessage = "The interstellar connection is weak. Please check your network and try again.";
    onChunk(errorMessage);
    return errorMessage;
  }
}

export async function chatWithMaya(message: string, language: string = 'English', history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(language),
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble processing that right now. Please try again, traveler.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The interstellar connection is weak. Please check your network and try again.";
  }
}
