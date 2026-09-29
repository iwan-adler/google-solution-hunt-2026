import { ContextualStudentState, OrbitActionCardData } from "@/types/orbit";

export const mockStudentContext: ContextualStudentState = {
  studentName: "Iwalani R.",
  registrationNumber: "AP23110010482",
  upcomingClass: {
    courseCode: "CSE302",
    courseName: "Operating Systems",
    room: "AL-204",
    building: "Academic Learning (AL) Block",
    time: "1:00 PM - 2:30 PM",
    startsInMinutes: 18,
  },
  assignedBus: {
    busNumber: "12",
    routeName: "Guntur Express Route",
    currentStop: "Guntur Lodge Center",
    etaMinutes: 8,
    destination: "SRM AP Campus Hub",
  },
  activeAlert: {
    title: "Mid-Term Hall Ticket Verification Required",
    deadline: "Today, 5:00 PM",
    urgency: "high",
  },
};

export const samplePreloadedResponses: Record<string, OrbitActionCardData> = {
  id_loss: {
    id: "card-id-lost",
    intent: "ID_CARD_REPLACEMENT",
    category: "services",
    title: "Student ID Card Replacement Protocol",
    summary: "Follow this 3-step administrative process to obtain a provisional token and re-issue a physical smartcard.",
    badge: "Official Protocol • Verified",
    location: {
      building: "Administrative Block",
      floor: "1st Floor",
      room: "Student Affairs Helpdesk (Room 108)",
      walkingTime: "4 mins walking distance",
      routeSteps: [
        "Head East from Central Quad towards Admin Block",
        "Take central staircase to 1st Floor",
        "Turn left down the Student Services corridor",
        "Room 108 on the right hand side",
      ],
    },
    timings: "Monday - Friday: 9:00 AM - 5:00 PM",
    steps: [
      {
        stepNumber: 1,
        instruction: "Submit Loss Declaration",
        detail: "Log into the Student ERP or file a lost property memo with Campus Security.",
      },
      {
        stepNumber: 2,
        instruction: "Fee Clearance",
        detail: "Pay the ₹500 smartcard re-issuance fee at Cash Counter (Ground Floor) or via SRM Pay portal.",
      },
      {
        stepNumber: 3,
        instruction: "Biometric Verification & Pickup",
        detail: "Present receipt at Student Affairs Room 108 for instant RFID re-enrollment.",
      },
    ],
    actions: [
      {
        type: "START_PROCESS",
        label: "Open ERP Loss Form",
        primary: true,
        payload: "https://srmap.edu.in/student-portal/id-replacement",
      },
      {
        type: "GET_DIRECTIONS",
        label: "Directions to Admin 108",
        primary: false,
        payload: "admin_108",
      },
      {
        type: "READ_ALOUD",
        label: "Read Aloud",
        primary: false,
      },
    ],
    sourceType: "verified_campus_record",
  },

  al204: {
    id: "card-nav-al204",
    intent: "CAMPUS_NAVIGATION",
    category: "navigate",
    title: "Wayfinding: Lecture Hall AL-204",
    summary: "AL-204 is located on the Second Floor of the Academic Learning (AL) Block, adjacent to Computer Lab 4.",
    badge: "Live Spatial Route",
    location: {
      building: "Academic Learning (AL) Block",
      floor: "2nd Floor",
      room: "AL-204",
      walkingTime: "3 mins walking time (180m)",
      routeSteps: [
        "Enter AL Block through Main North Entrance",
        "Take Elevator Bank B or Staircase 2 to Floor 2",
        "Exit right and follow the classroom corridor",
        "AL-204 is 30m ahead on the left (opposite Seminar Hall)",
      ],
    },
    timings: "Open Access: 7:30 AM - 9:00 PM",
    steps: [
      {
        stepNumber: 1,
        instruction: "Enter AL Block North Concourse",
      },
      {
        stepNumber: 2,
        instruction: "Proceed to Elevator B or Central Stairs",
      },
      {
        stepNumber: 3,
        instruction: "Ascend to Floor 2 and turn Right",
      },
      {
        stepNumber: 4,
        instruction: "Walk 30m past Lab 4 — Arrive at AL-204",
      },
    ],
    actions: [
      {
        type: "GET_DIRECTIONS",
        label: "Open Interactive Route Map",
        primary: true,
        payload: "AL-204",
      },
      {
        type: "READ_ALOUD",
        label: "Audio Navigation",
        primary: false,
      },
    ],
    sourceType: "verified_campus_record",
  },

  health_stock: {
    id: "card-health-stock",
    intent: "HEALTH_PHARMACY_CHECK",
    category: "health",
    title: "University Health Center & Pharmacy Status",
    summary: "General dispensary is open. Essential stocks (Paracetamol, ORS, Antacids) are available today.",
    badge: "Pharmacy & Clinic Telemetry",
    location: {
      building: "Health & Wellness Pavilion (Beside Ganga Hostel)",
      floor: "Ground Floor",
      room: "Dispensary Counter 1",
      walkingTime: "5 mins from Central Library",
    },
    timings: "OPD: 8:00 AM - 8:00 PM • Emergency Care: 24x7",
    steps: [
      {
        stepNumber: 1,
        instruction: "Paracetamol 650mg: IN STOCK (450+ strips available)",
      },
      {
        stepNumber: 2,
        instruction: "Oral Rehydration Salts (ORS): IN STOCK (120 sachets)",
      },
      {
        stepNumber: 3,
        instruction: "Attending Doctor: Dr. K. R. Rao (Chief Medical Officer)",
        detail: "Currently on in-patient rounds. Scheduled return to Consultation Room 2 at 2:30 PM.",
      },
    ],
    actions: [
      {
        type: "CALL",
        label: "Call Health Desk (+91 863 234 3000)",
        primary: true,
        payload: "tel:+918632343000",
      },
      {
        type: "GET_DIRECTIONS",
        label: "Navigate to Clinic",
        primary: false,
        payload: "health_center",
      },
    ],
    sourceType: "simulated_adapter",
  },

  bus_guntur: {
    id: "card-bus-guntur",
    intent: "TRANSIT_ROUTE_ETA",
    category: "transport",
    title: "Bus #12 — Guntur Express Telemetry",
    summary: "Bus #12 is currently in transit approaching Guntur Lodge Center with high on-time reliability.",
    badge: "Live Fleet Telemetry (Simulated)",
    location: {
      building: "Campus Bus Bay Area 3",
      floor: "Ground Level",
      room: "Platform G-12",
      walkingTime: "7 mins from AL Block",
    },
    timings: "Scheduled Departure from Guntur: 1:30 PM • ETA Campus: 2:15 PM",
    steps: [
      {
        stepNumber: 1,
        instruction: "Current GPS Position: Guntur Lodge Center (NH-16 Junction)",
        detail: "Speed: 42 km/h • Current ETA to next pickup: 8 minutes",
      },
      {
        stepNumber: 2,
        instruction: "Route Stops: Guntur RTC Stand → Lodge Center → Mangalagiri By-pass → SRM AP Campus",
      },
      {
        stepNumber: 3,
        instruction: "Seat Occupancy: ~68% capacity (approx 16 seats available)",
      },
    ],
    actions: [
      {
        type: "GET_DIRECTIONS",
        label: "View Live Bus Radar",
        primary: true,
        payload: "bus_12",
      },
      {
        type: "CALL",
        label: "Contact Transit Transport Desk",
        primary: false,
        payload: "tel:+918632343020",
      },
    ],
    sourceType: "simulated_adapter",
  },

  emergency_card: {
    id: "card-emergency-quick",
    intent: "EMERGENCY_DISPATCH",
    category: "emergency",
    title: "Campus Emergency Priority Response",
    summary: "Immediate 24/7 emergency dispatch contacts for medical, security, and hostel incidents at SRM University-AP.",
    badge: "URGENT • Emergency Mode Available",
    location: {
      building: "Campus Central Control Room",
      floor: "Ground Floor",
      room: "Emergency Command Post",
      walkingTime: "Rapid Dispatch: Ambulance response time < 3 mins",
    },
    timings: "Active 24 Hours / 7 Days a week",
    steps: [
      {
        stepNumber: 1,
        instruction: "Campus Ambulance: +91 863 234 3000 (Direct Hospital Line)",
      },
      {
        stepNumber: 2,
        instruction: "Campus Security Command: +91 863 234 3100 (Internal Ext: 100)",
      },
      {
        stepNumber: 3,
        instruction: "Hostel Chief Warden Desk: +91 863 234 3200 (Emergency SOS)",
      },
    ],
    actions: [
      {
        type: "CALL",
        label: "Call Campus Ambulance Now",
        primary: true,
        payload: "tel:+918632343000",
      },
      {
        type: "CALL",
        label: "Call Security Desk",
        primary: false,
        payload: "tel:+918632343100",
      },
    ],
    sourceType: "verified_campus_record",
  },
};

export const quickCategoriesList = [
  {
    id: "navigate",
    name: "Navigate",
    description: "Indoor rooms, AL Block, Admin, Labs",
    iconName: "Compass",
    sampleQuery: "Where is AL-204?",
    color: "from-blue-500 to-indigo-600",
    badge: "Wayfinding",
  },
  {
    id: "transport",
    name: "Transport",
    description: "Bus routes, live telemetry, Guntur / VJA",
    iconName: "Bus",
    sampleQuery: "What is the status of Bus #12 to Guntur?",
    color: "from-amber-500 to-orange-600",
    badge: "Live Fleet",
  },
  {
    id: "health",
    name: "Health",
    description: "Dispensary stock, doctor rounds & clinic",
    iconName: "HeartPulse",
    sampleQuery: "Are Paracetamol and ORS available right now?",
    color: "from-emerald-500 to-teal-600",
    badge: "Pharmacy",
  },
  {
    id: "academics",
    name: "Academics",
    description: "CLA schedules, exams, hall tickets",
    iconName: "GraduationCap",
    sampleQuery: "When is the Mid-Term Hall Ticket verification deadline?",
    color: "from-purple-500 to-violet-600",
    badge: "Curriculum",
  },
  {
    id: "services",
    name: "Services",
    description: "ID replacement, hostel leave, certificates",
    iconName: "Settings",
    sampleQuery: "I lost my ID card. What do I do?",
    color: "from-cyan-500 to-blue-600",
    badge: "Admin & ERP",
  },
  {
    id: "emergency",
    name: "Emergency",
    description: "Ambulance, campus security, 24/7 SOS",
    iconName: "ShieldAlert",
    sampleQuery: "Campus Ambulance emergency contact",
    color: "from-rose-500 to-red-600",
    badge: "24/7 Priority",
  },
];
