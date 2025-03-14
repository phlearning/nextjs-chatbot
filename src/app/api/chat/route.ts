import { getGeminiResponse } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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