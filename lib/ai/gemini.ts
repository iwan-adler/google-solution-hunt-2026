import { GoogleGenAI } from "@google/genai";
import { CampusIntent } from "@/types/orbit";

export interface IntentDetectionResult {
  intent: CampusIntent;
  entities: Record<string, string>;
  confidence: number;
  source: "gemini" | "deterministic_fallback";
}

const VALID_INTENTS: CampusIntent[] = [
  "id_replacement",
  "navigation",
  "faculty_lookup",
  "pharmacy_lookup",
  "doctor_availability",
  "emergency_contact",
  "event_lookup",
  "library",
  "lost_found",
  "hostel",
  "maintenance",
  "bus",
  "academics",
  "placement",
  "general_campus_help",
  "unknown",
];

/**
 * Deterministic fallback classifier for reliable Demo Mode and offline resiliency
 */
export function detectIntentFallback(message: string): IntentDetectionResult {
  const m = message.toLowerCase().trim();
  const entities: Record<string, string> = {};

  // 1. Emergency
  if (
    m.includes("ambulance") ||
    m.includes("sos") ||
    m.includes("emergency") ||
    m.includes("security help") ||
    m.includes("accident") ||
    m.includes("urgent medical")
  ) {
    if (m.includes("ambulance")) entities.service = "ambulance";
    return { intent: "emergency_contact", entities, confidence: 0.98, source: "deterministic_fallback" };
  }

  // 2. ID Card Replacement
  if (
    (m.includes("id") && (m.includes("lost") || m.includes("card") || m.includes("replace") || m.includes("missing"))) ||
    m.includes("id card") ||
    m.includes("smartcard")
  ) {
    entities.item = "id_card";
    return { intent: "id_replacement", entities, confidence: 0.97, source: "deterministic_fallback" };
  }

  // 3. Faculty Lookup (Check before general navigation so queries like 'Where is Professor X's cabin' resolve to faculty)
  if (
    m.includes("prof") ||
    m.includes("professor") ||
    m.includes("faculty") ||
    m.includes("cabin") ||
    m.includes("office hour") ||
    m.includes("teacher") ||
    m.includes("dr.")
  ) {
    const profMatch = m.match(/(?:prof|professor|dr\.?)\s+([a-zA-Z\s]+?)(?:'s|\s+cabin|\s+office|\?|$)/i);
    if (profMatch) {
      entities.facultyName = profMatch[1].trim();
    } else {
      entities.facultyName = "Ashok Kumar";
    }
    return { intent: "faculty_lookup", entities, confidence: 0.94, source: "deterministic_fallback" };
  }

  // 4. Navigation / Wayfinding
  const roomMatch = m.match(/\b([a-zA-Z]{1,3}[-\s]?\d{3,4}[a-zA-Z]?)\b/i);
  if (
    roomMatch ||
    m.includes("where is") ||
    m.includes("how to reach") ||
    m.includes("find room") ||
    m.includes("navigate") ||
    m.includes("al block") ||
    m.includes("admin block")
  ) {
    if (roomMatch) entities.targetRoom = roomMatch[0].toUpperCase().replace(" ", "-");
    if (m.includes("al-204") || m.includes("al 204")) entities.targetRoom = "AL-204";
    return { intent: "navigation", entities, confidence: 0.95, source: "deterministic_fallback" };
  }

  // 5. Pharmacy & Medicine Stock
  if (
    m.includes("ors") ||
    m.includes("paracetamol") ||
    m.includes("medicine") ||
    m.includes("pharmacy") ||
    m.includes("dispensary") ||
    m.includes("tablets") ||
    m.includes("in stock")
  ) {
    if (m.includes("ors")) entities.medicine = "ORS";
    if (m.includes("paracetamol")) entities.medicine = "Paracetamol 650mg";
    return { intent: "pharmacy_lookup", entities, confidence: 0.94, source: "deterministic_fallback" };
  }

  // 6. Doctor Availability
  if (
    m.includes("doctor") ||
    m.includes("clinic") ||
    m.includes("rounds") ||
    m.includes("opd") ||
    m.includes("appointment") ||
    m.includes("physician")
  ) {
    return { intent: "doctor_availability", entities, confidence: 0.92, source: "deterministic_fallback" };
  }

  // 7. Library
  if (m.includes("library") || m.includes("book") || m.includes("reading room") || m.includes("borrow")) {
    return { intent: "library", entities, confidence: 0.92, source: "deterministic_fallback" };
  }

  // 8. Event Lookup
  if (m.includes("event") || m.includes("hackathon") || m.includes("fest") || m.includes("seminar") || m.includes("workshop")) {
    return { intent: "event_lookup", entities, confidence: 0.90, source: "deterministic_fallback" };
  }

  // 9. Lost & Found
  if (
    (m.includes("lost") && !m.includes("id")) ||
    m.includes("found") ||
    m.includes("lost and found") ||
    m.includes("missing item") ||
    m.includes("lost item") ||
    m.includes("lost phone") ||
    m.includes("lost bag") ||
    m.includes("lost laptop")
  ) {
    if (m.includes("phone")) entities.item = "phone";
    else if (m.includes("bag") || m.includes("backpack")) entities.item = "bag";
    else if (m.includes("laptop")) entities.item = "laptop";
    else if (m.includes("wallet")) entities.item = "wallet";
    return { intent: "lost_found", entities, confidence: 0.92, source: "deterministic_fallback" };
  }

  // 10. Campus Maintenance (check before hostel to catch "AC in hostel broken" correctly)
  if (
    m.includes("repair") ||
    m.includes("maintenance") ||
    m.includes("broken") ||
    m.includes("lights not working") ||
    m.includes("ac not working") ||
    m.includes("not working") ||
    m.includes("water leak") ||
    m.includes("report issue") ||
    m.includes("facility issue")
  ) {
    return { intent: "maintenance", entities, confidence: 0.91, source: "deterministic_fallback" };
  }

  // 11. Hostel
  if (
    m.includes("hostel") ||
    m.includes("dorm") ||
    m.includes("warden") ||
    m.includes("room allot") ||
    m.includes("mess") ||
    m.includes("laundry") ||
    m.includes("ganga") ||
    m.includes("saraswathi") ||
    m.includes("krishna") ||
    m.includes("cauveri")
  ) {
    return { intent: "hostel", entities, confidence: 0.93, source: "deterministic_fallback" };
  }

  // 12. Bus / Transport
  if (
    m.includes("bus") ||
    m.includes("transport") ||
    m.includes("shuttle") ||
    m.includes("route") ||
    m.includes("pickup") ||
    m.includes("drop") ||
    m.includes("timing of bus") ||
    m.includes("bus schedule")
  ) {
    return { intent: "bus", entities, confidence: 0.93, source: "deterministic_fallback" };
  }

  // 13. Academics
  if (
    m.includes("timetable") ||
    m.includes("time table") ||
    m.includes("schedule") ||
    m.includes("exam") ||
    m.includes("cla") ||
    m.includes("assignment") ||
    m.includes("attendance") ||
    m.includes("gpa") ||
    m.includes("grade") ||
    m.includes("semester") ||
    m.includes("course")
  ) {
    return { intent: "academics", entities, confidence: 0.92, source: "deterministic_fallback" };
  }

  // 14. Placement / Career Development
  if (
    m.includes("placement") ||
    m.includes("cdc") ||
    m.includes("career") ||
    m.includes("internship") ||
    m.includes("recruit") ||
    m.includes("job") ||
    m.includes("interview") ||
    m.includes("resume") ||
    m.includes("aptitude")
  ) {
    return { intent: "placement", entities, confidence: 0.92, source: "deterministic_fallback" };
  }

  // 15. General Help
  if (m.includes("help") || m.includes("portal") || m.includes("services") || m.includes("orbit")) {
    return { intent: "general_campus_help", entities, confidence: 0.80, source: "deterministic_fallback" };
  }

  return { intent: "unknown", entities: {}, confidence: 0.20, source: "deterministic_fallback" };
}

/**
 * Server-side intent detection using Google Gen AI SDK with fallback
 */
export async function detectIntentWithGemini(userMessage: string): Promise<IntentDetectionResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    // Graceful fallback to deterministic mock engine
    return detectIntentFallback(userMessage);
  }

  try {
    const client = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the intent detector for SRM Orbit, the Contextual Campus Operating System at SRM University-AP.
Your task is to analyze the student's request, detect their intent, and extract relevant entities.
DO NOT make up campus facts or answer the question. You only classify intent.

Allowed intents:
- "id_replacement": Lost ID card, ID renewal, replacement token, smartcard fee.
- "navigation": Seeking directions to a room, building, block, or lab (e.g., AL-204, Admin block).
- "faculty_lookup": Inquiring about a professor, faculty member, cabin location, or office hours.
- "pharmacy_lookup": Inquiring about medicines in the health center pharmacy (e.g. Paracetamol, ORS).
- "doctor_availability": Checking doctor hours, rounds, OPD availability, or clinic timings.
- "emergency_contact": Ambulance, security, hospital hotline, urgent distress or SOS.
- "event_lookup": Campus hackathons, tech fests, cultural events, seminars.
- "library": Central library hours, book issue/return, study spaces.
- "lost_found": Lost a personal item (phone, bag, laptop, wallet) or looking for lost & found office.
- "hostel": Hostel allocation, warden queries, mess timings, laundry, room issues, hostel-specific.
- "maintenance": Report a broken facility, lights not working, AC fault, water leak, campus repair.
- "bus": Bus/shuttle timings, transport route, bus schedule, pickup or drop points.
- "academics": Timetable, exam schedule, CLA, attendance, grades, GPA, semester queries.
- "placement": CDC, career development, internship, job recruitment, interview prep, aptitude.
- "general_campus_help": General student inquiry about university services.
- "unknown": Anything unrelated to campus life or completely ambiguous.

Respond strictly with valid JSON:
{
  "intent": "<one of the allowed intents>",
  "confidence": <number between 0 and 1>,
  "entities": {
    "targetRoom": "<optional room code>",
    "facultyName": "<optional faculty name>",
    "medicine": "<optional medicine name>",
    "service": "<optional service name>",
    "item": "<optional item name for lost_found>"
  }
}`;

    // Call Gemini 3.8 Flash (current Google Gen AI recommended model)
    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nStudent Request: "${userMessage}"` }],
        },
      ],
    });

    const candidateText = response.text || "";
    // Clean code fences if present
    const cleanedJson = candidateText.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedJson);

    if (parsed && typeof parsed.intent === "string") {
      const normalizedIntent = parsed.intent.toLowerCase().trim() as CampusIntent;
      if (VALID_INTENTS.includes(normalizedIntent)) {
        return {
          intent: normalizedIntent,
          entities: parsed.entities || {},
          confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.95,
          source: "gemini",
        };
      }
    }

    return detectIntentFallback(userMessage);
  } catch (error) {
    // Never crash on AI error, fall back seamlessly
    console.warn("Gemini intent detection fallback triggered:", (error as Error).message);
    return detectIntentFallback(userMessage);
  }
}
