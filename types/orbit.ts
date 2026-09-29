export type OrbitCategory =
  | "ask"
  | "navigate"
  | "transport"
  | "health"
  | "academics"
  | "services"
  | "emergency";

export type ActionType =
  | "GET_DIRECTIONS"
  | "START_PROCESS"
  | "CALL"
  | "READ_ALOUD"
  | "ADD_TO_CALENDAR"
  | "VIEW_DETAILS";

export interface ActionStep {
  stepNumber: number;
  instruction: string;
  detail?: string;
}

export interface OrbitActionCardData {
  id: string;
  intent: string;
  category: OrbitCategory;
  title: string;
  summary: string;
  badge?: string;
  location?: {
    building: string;
    floor: string;
    room?: string;
    walkingTime?: string;
    routeSteps?: string[];
  };
  timings?: string;
  steps?: ActionStep[];
  actions: {
    type: ActionType;
    label: string;
    primary?: boolean;
    payload?: string;
  }[];
  sourceType: "verified_campus_record" | "simulated_adapter" | "ai_interpreted";
  noticeMeta?: {
    changed: string;
    affected: string;
    deadline: string;
    originalSource: string;
  };
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
