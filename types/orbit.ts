export type OrbitCategory =
  | "ask"
  | "navigate"
  | "transport"
  | "health"
  | "academics"
  | "services"
  | "emergency";

export type CampusIntent =
  | "id_replacement"
  | "navigation"
  | "faculty_lookup"
  | "pharmacy_lookup"
  | "doctor_availability"
  | "emergency_contact"
  | "event_lookup"
  | "library"
  | "lost_found"
  | "hostel"
  | "maintenance"
  | "bus"
  | "academics"
  | "placement"
  | "general_campus_help"
  | "unknown";

export type ActionType =
  | "GET_DIRECTIONS"
  | "DIRECTIONS"
  | "START_PROCESS"
  | "PROCESS"
  | "CALL"
  | "READ_ALOUD"
  | "ADD_TO_CALENDAR"
  | "VIEW_DETAILS";

export interface ActionStep {
  stepNumber: number;
  instruction: string;
  detail?: string;
}

export interface ActionButton {
  type: ActionType;
  label: string;
  primary?: boolean;
  payload?: string;
}

export interface LocationDetail {
  building: string;
  floor?: string;
  room?: string;
  walkingTime?: string;
  routeSteps?: string[];
}

export interface OrbitActionCardData {
  id: string;
  intent: CampusIntent | string;
  category: OrbitCategory;
  title: string;
  summary: string;
  badge?: string;
  location?: LocationDetail;
  timings?: string;
  steps?: ActionStep[];
  actions: ActionButton[];
  sourceType: "verified_campus_record" | "demo_mock_adapter" | "simulated_adapter" | "ai_interpreted";
  entities?: Record<string, string>;
  noticeMeta?: {
    changed: string;
    affected: string;
    deadline: string;
    originalSource: string;
  };
}

export interface AskRequest {
  message: string;
  studentId?: string;
  demoMode?: boolean;
}

export interface AskResponse {
  intent: CampusIntent;
  title: string;
  answer: string;
  summary: string;
  location?: string;
  locationDetails?: LocationDetail;
  timings?: string;
  steps?: string[];
  actions: ActionButton[];
  sourceType: "verified_campus_record" | "demo_mock_adapter" | "ai_interpreted";
  entities?: Record<string, string>;
  confidence?: number;
  rawAiIntent?: string;
}

export interface ContextualStudentState {
  studentName: string;
  registrationNumber: string;
  upcomingClass: {
    courseCode: string;
    courseName: string;
    room: string;
    building: string;
    time: string;
    startsInMinutes: number;
  };
  assignedBus: {
    busNumber: string;
    routeName: string;
    currentStop: string;
    etaMinutes: number;
    destination: string;
  };
  activeAlert: {
    title: string;
    deadline: string;
    urgency: "high" | "medium" | "low";
  };
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  simplifiedView: boolean;
  soundFeedback: boolean;
}
