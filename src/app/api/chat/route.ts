import { getGeminiResponse } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured" },
      { status: 400 }
    );
  }

  try {
    const { message } = await req.json();
    const response = await getGeminiResponse(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "Failed to get response from Gemini" },
      { status: 500}
    );
  }
}