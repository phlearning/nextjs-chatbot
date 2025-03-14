import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiResponse(prompt: string) {
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini response", error);
    throw error;
  }
}