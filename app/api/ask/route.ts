import { NextRequest, NextResponse } from "next/server";
import { detectIntentWithGemini } from "@/lib/ai/gemini";
import { resolveCampusContext } from "@/lib/services/campus-service";
import { AskRequest, AskResponse } from "@/types/orbit";

export async function POST(req: NextRequest) {
  try {
    let body: AskRequest;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body. Expected { message: string }" },
        { status: 400 }
      );
    }

    const { message } = body;

    // Validate input
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid, non-empty student question or message." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    // 1. Detect intent and extract entities using Gemini (with deterministic fallback)
    const detection = await detectIntentWithGemini(trimmedMessage);

    // 2. Retrieve authoritative campus information from our factual data layer
    const campusData = resolveCampusContext(detection.intent, detection.entities);

    // 3. Construct structured, typed response
    const responsePayload: AskResponse = {
      ...campusData,
      entities: detection.entities,
      confidence: detection.confidence,
      rawAiIntent: `${detection.intent} (via ${detection.source})`,
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    console.error("Unhandled error in /api/ask:", error);

    // Graceful fallback for unexpected exceptions
    const fallbackResponse = resolveCampusContext("unknown");
    return NextResponse.json(
      {
        ...fallbackResponse,
        summary: "I encountered a temporary processing issue, but I am still here to assist you with SRM campus queries.",
        error: (error as Error).message,
      },
      { status: 200 }
    );
  }
}
