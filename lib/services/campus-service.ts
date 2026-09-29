import { AskResponse, CampusIntent } from "@/types/orbit";

export function resolveCampusContext(
  intent: CampusIntent,
  entities: Record<string, string> = {}
): AskResponse {
  switch (intent) {
    case "id_replacement":
      return {
        intent: "id_replacement",
        title: "Student ID Card Replacement Protocol",
        answer:
          "Visit the Student Affairs Helpdesk (Room 108, Admin Block) with your fee receipt — your RFID smartcard can be re-enrolled on the spot.",
        summary: "Follow this 3-step administrative process to request a provisional token and re-issue a smartcard.",
        location: "Student Affairs Helpdesk, Room 108, Administrative Block",
        locationDetails: {
          building: "Administrative Block",
          floor: "1st Floor",
          room: "Room 108 (Student Affairs)",
          walkingTime: "4 mins walking distance",
          routeSteps: [
            "Proceed from Central Quad towards Main Administrative Entrance",
            "Take the central staircase or elevator to the 1st Floor",
            "Turn left into the Student Affairs wing",
            "Room 108 is located on the right hand side",
          ],
        },
        timings: "Monday - Friday: 9:00 AM - 5:00 PM",
        steps: [
          "Submit Loss Declaration on the Student ERP portal or with Security.",
          "Clear the ₹500 smartcard re-issuance fee at Finance Counter (Ground Floor).",
          "Present fee receipt at Room 108 for instant biometric RFID re-enrollment.",
        ],
        actions: [
          {
            type: "PROCESS",
            label: "Open ERP Loss Form",
            primary: true,
            payload: "https://srmap.edu.in/student-portal/id-replacement",
          },
          {
            type: "DIRECTIONS",
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
      };

    case "navigation": {
      const target = entities.targetRoom || "AL-204";
      return {
        intent: "navigation",
        title: `Wayfinding: ${target}`,
        answer: `${target} is on Floor 2 of the Academic Learning (AL) Block — take Elevator Bank B and turn right, it is 3 minutes from the main concourse.`,
        summary: `${target} is located on Floor 2 of the Academic Learning (AL) Block, adjacent to Computer Lab 4.`,
        location: `AL Block, Floor 2, ${target}`,
        locationDetails: {
          building: "Academic Learning (AL) Block",
          floor: "2nd Floor",
          room: target,
          walkingTime: "3 mins walking time (180m)",
          routeSteps: [
            "Enter AL Block through Main Concourse (North Gate)",
            "Take Elevator Bank B or Staircase 2 to Floor 2",
            "Turn Right and follow the instructional corridor",
            "Walk 30m past Lab 4 — arrive at destination on the left",
          ],
        },
        timings: "Academic Access: 7:30 AM - 9:00 PM",
        steps: [
          "Enter AL Block North Entrance",
          "Ascend to Floor 2 via Elevator B",
          "Turn Right into corridor",
          `Arrive at ${target} (opposite Seminar Hall 2)`,
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "View Interactive Route",
            primary: true,
            payload: target,
          },
          {
            type: "READ_ALOUD",
            label: "Read Route Steps",
            primary: false,
          },
        ],
        sourceType: "verified_campus_record",
      };
    }

    case "pharmacy_lookup": {
      const requestedMed = entities.medicine || "ORS and Paracetamol";
      return {
        intent: "pharmacy_lookup",
        title: "University Pharmacy Inventory Status",
        answer: `${requestedMed} is confirmed in stock at the Health Center pharmacy (Ground Floor, beside Ganga Hostel) — open until 8:00 PM.`,
        summary: `Dispensary check: ${requestedMed} is confirmed in stock at the University Health Center.`,
        location: "University Health Center, Ground Floor Ganga Hostel Complex",
        locationDetails: {
          building: "Health & Wellness Pavilion (Beside Ganga Hostel)",
          floor: "Ground Floor",
          room: "Pharmacy Counter 1",
          walkingTime: "5 mins from Central Quad",
          routeSteps: [
            "Head South past Dining Hall 1",
            "Turn left toward Ganga Hostel Residential Wing",
            "The Health Center entrance is clearly signposted on the ground level",
          ],
        },
        timings: "Pharmacy Hours: 8:00 AM - 8:00 PM • Emergency Care: 24/7",
        steps: [
          "Paracetamol 650mg: IN STOCK (450+ strips available)",
          "Oral Rehydration Salts (ORS): IN STOCK (120 sachets available)",
          "Antacids & First Aid kits: Available at Counter 1",
        ],
        actions: [
          {
            type: "CALL",
            label: "Call Dispensary (+91 863 234 3000)",
            primary: true,
            payload: "tel:+918632343000",
          },
          {
            type: "DIRECTIONS",
            label: "Directions to Health Center",
            primary: false,
            payload: "health_center",
          },
        ],
        sourceType: "demo_mock_adapter",
      };
    }

    case "doctor_availability":
      return {
        intent: "doctor_availability",
        title: "Medical Officer Availability & Duty Schedule",
        answer:
          "Dr. K. R. Rao is currently on ward rounds and returns to the OPD clinic at 2:30 PM — walk-in tokens are issued at Counter 1.",
        summary: "Dr. K. R. Rao (Chief Medical Officer) is currently on in-patient rounds. Scheduled return to clinic at 2:30 PM.",
        location: "Consultation Room 2, University Health Center",
        locationDetails: {
          building: "Health & Wellness Pavilion",
          floor: "Ground Floor",
          room: "Consultation Room 2",
          walkingTime: "5 mins from Central Quad",
        },
        timings: "General OPD: 9:00 AM - 1:00 PM & 2:30 PM - 6:30 PM",
        steps: [
          "Duty Physician: Dr. K. R. Rao, MD (General Medicine)",
          "Current Status: In-Patient Ward Rounds (Emergency triage attended by Duty Staff Nurse)",
          "Expected Return ETA: 2:30 PM today",
          "Walk-in consultation tokens issued at Counter 1 upon student ID presentation",
        ],
        actions: [
          {
            type: "CALL",
            label: "Call Health Desk (+91 863 234 3000)",
            primary: true,
            payload: "tel:+918632343000",
          },
          {
            type: "DIRECTIONS",
            label: "Navigate to Clinic",
            primary: false,
            payload: "health_center",
          },
        ],
        sourceType: "demo_mock_adapter",
      };

    case "faculty_lookup": {
      const prof = entities.facultyName || "Ashok Kumar";
      return {
        intent: "faculty_lookup",
        title: `Faculty Directory: Prof. ${prof}`,
        answer: `Prof. ${prof}'s cabin is at AL-412 (Floor 4, CSE Faculty Wing) — office hours are Tuesday & Thursday, 2:00–4:00 PM.`,
        summary: `Prof. ${prof} (Department of Computer Science & Engineering) office hours and cabin location.`,
        location: "Cabin AL-412, Floor 4, Academic Learning Block",
        locationDetails: {
          building: "Academic Learning (AL) Block",
          floor: "4th Floor",
          room: "Cabin AL-412",
          walkingTime: "4 mins from ground lobby",
          routeSteps: [
            "Take Elevator Bank A in AL Block to the 4th Floor",
            "Exit elevator and turn right into the CSE Faculty Wing",
            "Cabin AL-412 is the third door on the right",
          ],
        },
        timings: "Office Hours: Tuesday & Thursday, 2:00 PM - 4:00 PM",
        steps: [
          "Designation: Professor & Program Coordinator, CSE",
          "Email: ashok.k@srmap.edu.in • Internal Phone: Ext 4120",
          "Student Consultation: Pre-booking available via ERP or walk-in during office hours",
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "Directions to Cabin AL-412",
            primary: true,
            payload: "AL-412",
          },
          {
            type: "PROCESS",
            label: "Send Email (ashok.k@srmap.edu.in)",
            primary: false,
            payload: "mailto:ashok.k@srmap.edu.in",
          },
        ],
        sourceType: "verified_campus_record",
      };
    }

    case "emergency_contact":
      return {
        intent: "emergency_contact",
        title: "Campus Emergency Priority Response (24/7)",
        answer:
          "Call the campus ambulance hotline at +91 863 234 3000 immediately — emergency response reaches anywhere on campus within 3 minutes.",
        summary: "Immediate emergency dispatch contacts for campus ambulance, university security, and medical triage.",
        location: "Central Campus Emergency Command Post, Admin Block Ground Floor",
        locationDetails: {
          building: "Central Administration Complex",
          floor: "Ground Floor",
          room: "Emergency Response Hub",
          walkingTime: "Ambulance response time < 3 mins anywhere on campus",
        },
        timings: "24 Hours / 7 Days a week",
        steps: [
          "Campus Ambulance Hotline: +91 863 234 3000 (Direct Emergency Medical Dispatch)",
          "Campus Security Control: +91 863 234 3100 (Internal Ext 100)",
          "Hostel Chief Warden Desk: +91 863 234 3200",
        ],
        actions: [
          {
            type: "CALL",
            label: "Call Ambulance Hotline (+91 863 234 3000)",
            primary: true,
            payload: "tel:+918632343000",
          },
          {
            type: "CALL",
            label: "Call Security Dispatch",
            primary: false,
            payload: "tel:+918632343100",
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "library":
      return {
        intent: "library",
        title: "Central Knowledge Resource Centre (Library)",
        answer:
          "The Central Library is open daily from 8:00 AM to 11:00 PM (until 2:00 AM during exams) — RFID self-checkout available at kiosks.",
        summary: "Library facilities, RFID self-checkout kiosks, reading halls, and digital book reservations.",
        location: "Central Library Building (Adjacent to Admin Block)",
        locationDetails: {
          building: "Central Knowledge Center",
          floor: "Ground to 3rd Floor",
          room: "Main Circulation Desk",
          walkingTime: "2 mins from Central Quad",
        },
        timings: "Daily: 8:00 AM - 11:00 PM • Exam Period: Open until 2:00 AM",
        steps: [
          "RFID Circulation: Tap student smartcard at kiosk for instant book checkout",
          "Digital Library: 80+ workstations available on the 2nd Floor",
          "Quiet Study Zone: 3rd Floor reading gallery with power outlets",
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "Directions to Library",
            primary: true,
            payload: "central_library",
          },
          {
            type: "PROCESS",
            label: "Access Digital Library Portal",
            primary: false,
            payload: "https://library.srmap.edu.in",
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "event_lookup":
      return {
        intent: "event_lookup",
        title: "Upcoming Campus Hackathon & Tech Events",
        answer:
          "Google Solution Hunt 2026 is currently accepting student team registrations — mentorship sessions run every Friday at AL-204.",
        summary: "Featured Event: Google Solution Hunt 2026 Challenge at SRM University-AP.",
        location: "Main University Auditorium & AL Block Labs",
        locationDetails: {
          building: "University Central Auditorium",
          floor: "Ground Floor",
          room: "Main Hall",
          walkingTime: "3 mins from Quad",
        },
        timings: "Challenge Period: 2026 Academic Season",
        steps: [
          "Google Solution Hunt 2026: Team registration open for student developers",
          "Hackathon tracks: Smart Campus OS, Accessibility, AI & Sustainability",
          "Mentorship sessions scheduled every Friday at AL-204",
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "Directions to Auditorium",
            primary: true,
            payload: "auditorium",
          },
          {
            type: "PROCESS",
            label: "View Event Schedule",
            primary: false,
            payload: "https://srmap.edu.in/events",
          },
        ],
        sourceType: "demo_mock_adapter",
      };

    case "lost_found": {
      const item = entities.item || "personal item";
      return {
        intent: "lost_found",
        title: "Lost & Found — Campus Security Office",
        answer: `Report your lost ${item} to Campus Security immediately — unclaimed items are logged and held at the Security Office for 30 days.`,
        summary: `The Campus Lost & Found is managed by Security at the Main Gate. Items are logged and stored for 30 days.`,
        location: "Campus Security Office, Main Gate (Admin Block Ground Floor)",
        locationDetails: {
          building: "Administrative Block",
          floor: "Ground Floor",
          room: "Security Control Room (Main Gate)",
          walkingTime: "3 mins from Central Quad",
          routeSteps: [
            "Head toward the main campus entrance",
            "Security Office is on the left side of the Main Gate",
            "Present your student ID and describe the lost item",
          ],
        },
        timings: "Security Desk: 24/7 • Admin Office: Monday - Saturday, 9:00 AM - 5:00 PM",
        steps: [
          "Visit the Security Office at the Main Gate with your student ID.",
          "Describe the lost item in detail — colour, model, markings.",
          "If found, items are held for 30 days. After that, they are donated.",
          "Alternatively, report via ERP portal under 'Student Services → Lost & Found'.",
        ],
        actions: [
          {
            type: "CALL",
            label: "Call Security (+91 863 234 3100)",
            primary: true,
            payload: "tel:+918632343100",
          },
          {
            type: "DIRECTIONS",
            label: "Navigate to Security Office",
            primary: false,
            payload: "main_gate_security",
          },
        ],
        sourceType: "verified_campus_record",
      };
    }

    case "hostel":
      return {
        intent: "hostel",
        title: "Student Hostel Services & Warden Office",
        answer:
          "Contact your block warden for room issues — the Chief Warden's office is in the Hostel Admin Block, open 9:00 AM to 6:00 PM daily.",
        summary: "Hostel allocation, mess timings, laundry schedules, and warden contact details for all residential blocks.",
        location: "Chief Warden Office, Hostel Administrative Block",
        locationDetails: {
          building: "Hostel Administrative Block (Near Ganga Hostel)",
          floor: "Ground Floor",
          room: "Warden Office – Room HW-01",
          walkingTime: "6 mins from Main Quad",
          routeSteps: [
            "Head towards the Residential Zone (South of Dining Hall 1)",
            "Enter the Hostel Admin Building adjacent to Ganga Hostel",
            "Chief Warden Office is Room HW-01 on the Ground Floor",
          ],
        },
        timings: "Warden Office: 9:00 AM - 6:00 PM daily • Emergency: 24/7 via Security",
        steps: [
          "Boys Hostels: Cauveri, Krishna (Chief Warden: Mr. Ramesh — Ext 3200)",
          "Girls Hostels: Ganga, Saraswathi (Chief Warden: Ms. Lalitha — Ext 3201)",
          "Mess Timings: Breakfast 7–9 AM • Lunch 12–2 PM • Dinner 7–9 PM",
          "Laundry: Available Monday, Wednesday, Friday in each block basement",
          "Room Allotment queries: Raise a ticket on the ERP Student Portal",
        ],
        actions: [
          {
            type: "CALL",
            label: "Call Chief Warden Desk (+91 863 234 3200)",
            primary: true,
            payload: "tel:+918632343200",
          },
          {
            type: "PROCESS",
            label: "Raise Hostel Ticket on ERP",
            primary: false,
            payload: "https://srmap.edu.in/student-portal/hostel",
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "maintenance":
      return {
        intent: "maintenance",
        title: "Campus Facility Maintenance — Report an Issue",
        answer:
          "Report facility issues (AC, lights, plumbing) via the ERP portal or call the Estate Office directly — response time is within 24 hours.",
        summary: "Campus Facility Management handles all maintenance requests — AC, electrical, plumbing, and structural issues across all campus zones.",
        location: "Estate Office, Admin Block Room 115",
        locationDetails: {
          building: "Administrative Block",
          floor: "1st Floor",
          room: "Room 115 – Estate & Facility Management",
          walkingTime: "4 mins from Central Quad",
        },
        timings: "Estate Office: Monday - Saturday, 8:30 AM - 5:30 PM",
        steps: [
          "Log the issue on the ERP portal under 'Services → Maintenance Request'.",
          "Include block name, room number, and description of fault.",
          "Average response SLA: Electrical within 4 hrs, Plumbing within 6 hrs.",
          "For urgent issues (water leak, power failure), call the Estate Hotline immediately.",
        ],
        actions: [
          {
            type: "PROCESS",
            label: "Submit Maintenance Request (ERP)",
            primary: true,
            payload: "https://srmap.edu.in/student-portal/maintenance",
          },
          {
            type: "CALL",
            label: "Estate Office Hotline (+91 863 234 3300)",
            primary: false,
            payload: "tel:+918632343300",
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "bus":
      return {
        intent: "bus",
        title: "Campus Transport & Bus Schedule",
        answer:
          "Bus #12 (Guntur Route) departs the Main Gate at 5:30 PM daily — check the ERP transport portal for all routes and live tracking.",
        summary: "SRM University-AP operates 20+ bus routes. Live tracking and schedules are available on the ERP Transport Module.",
        location: "Campus Bus Bay, Main Gate (West Side)",
        locationDetails: {
          building: "Main Campus Gate",
          floor: "Ground Level",
          room: "Bus Bay West",
          walkingTime: "4 mins from Central Quad",
          routeSteps: [
            "Head toward the Main Campus Gate (West Entrance)",
            "Bus Bay is signposted on the left side of the gate",
            "Check the digital display board for platform numbers",
          ],
        },
        timings: "Morning Pick-up: 6:30 AM - 8:30 AM • Evening Drop: 5:00 PM - 7:30 PM",
        steps: [
          "Bus #12 (Guntur): Departs 5:30 PM from Bay 3 — estimated 45 min journey",
          "Bus #7 (Vijayawada): Departs 5:15 PM from Bay 1 — estimated 55 min journey",
          "Bus #4 (Mangalagiri): Departs 5:45 PM from Bay 4 — estimated 20 min journey",
          "Boarding requires valid student ID smartcard tap at the bus gate reader",
        ],
        actions: [
          {
            type: "PROCESS",
            label: "View Full Bus Schedule (ERP)",
            primary: true,
            payload: "https://srmap.edu.in/student-portal/transport",
          },
          {
            type: "DIRECTIONS",
            label: "Navigate to Bus Bay",
            primary: false,
            payload: "bus_bay_main",
          },
        ],
        sourceType: "demo_mock_adapter",
      };

    case "academics":
      return {
        intent: "academics",
        title: "Academic Schedule, Timetable & CLA Portal",
        answer:
          "Access your personal timetable, exam schedule, and CLA submission portal via the SRM ERP — contact your Department Office for offline assistance.",
        summary: "Academic schedule, timetable, continuous learning assessments (CLA), attendance, and grades — accessible via ERP Student Portal.",
        location: "Department Academic Office (varies by department)",
        locationDetails: {
          building: "Academic Learning (AL) Block",
          floor: "Multiple floors (see department board)",
          room: "Department Office",
          walkingTime: "3-5 mins from Central Quad",
        },
        timings: "ERP Portal: 24/7 • Academic Office: Monday - Friday, 9:00 AM - 5:00 PM",
        steps: [
          "Personal Timetable: Login to ERP → Academics → My Schedule",
          "Exam Schedule: Available on ERP under Examinations → Timetable",
          "CLA Portal: Submit assignments via ERP → Learning → CLA Submissions",
          "Attendance: Check real-time under ERP → Academics → My Attendance",
          "SGPA/CGPA: View grade history under ERP → Academics → Grade Card",
        ],
        actions: [
          {
            type: "PROCESS",
            label: "Open Academic ERP Portal",
            primary: true,
            payload: "https://srmap.edu.in/student-portal/academics",
          },
          {
            type: "READ_ALOUD",
            label: "Read Steps",
            primary: false,
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "placement":
      return {
        intent: "placement",
        title: "Career Development Centre (CDC) — Placements",
        answer:
          "Visit the CDC (Admin Block, Room 203) for placement drives, internship opportunities, and interview prep resources — registrations are open on ERP.",
        summary: "The Career Development Centre (CDC) manages campus recruitment drives, internship listings, and student career mentoring.",
        location: "Career Development Centre, Room 203, Admin Block",
        locationDetails: {
          building: "Administrative Block",
          floor: "2nd Floor",
          room: "Room 203 – CDC",
          walkingTime: "5 mins from Central Quad",
          routeSteps: [
            "Enter Admin Block through the main entrance",
            "Take the staircase or elevator to the 2nd Floor",
            "CDC is Room 203 — look for the CDC signboard",
          ],
        },
        timings: "CDC Office: Monday - Friday, 9:30 AM - 5:00 PM • Walk-ins welcome",
        steps: [
          "Register on the CDC placement portal (ERP → Career → Register for Drives)",
          "Eligibility: No active backlogs, 60% aggregate minimum for most companies",
          "Aptitude Training: Every Wednesday, 4:00 PM - 6:00 PM at AL-204",
          "Resume Clinic: Drop in at CDC between 11 AM - 12 PM for 1-on-1 review",
          "Current Drive: Infosys, TCS, Wipro — check ERP for application deadlines",
        ],
        actions: [
          {
            type: "PROCESS",
            label: "Register on CDC Placement Portal",
            primary: true,
            payload: "https://srmap.edu.in/student-portal/career",
          },
          {
            type: "DIRECTIONS",
            label: "Directions to CDC Office",
            primary: false,
            payload: "admin_203_cdc",
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "general_campus_help":
      return {
        intent: "general_campus_help",
        title: "SRM Orbit Campus Services Helpdesk",
        answer:
          "The Student Information Centre (Admin Block, Counter 4) handles all campus service queries — open Monday to Saturday, 8:30 AM to 6:00 PM.",
        summary: "Single window assistance for student ERP access, hostel amenities, wifi, and administrative clearances.",
        location: "Student Information Centre, Ground Floor, Admin Block",
        locationDetails: {
          building: "Administrative Block",
          floor: "Ground Floor",
          room: "Helpdesk Counter 4",
          walkingTime: "3 mins walking time",
        },
        timings: "Monday - Saturday: 8:30 AM - 6:00 PM",
        steps: [
          "Ask any campus question in natural language via SRM Orbit",
          "Visit Counter 4 in Admin Block for fee queries or document attestations",
          "Campus IT Helpdesk: Contact itkc@srmap.edu.in for WiFi and credentials support",
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "Directions to Information Centre",
            primary: true,
            payload: "admin_helpdesk",
          },
          {
            type: "READ_ALOUD",
            label: "Read Summary",
            primary: false,
          },
        ],
        sourceType: "verified_campus_record",
      };

    case "unknown":
    default:
      return {
        intent: "unknown",
        title: "Campus Assistant",
        answer: "I can help with campus navigation, health, academics, transport, lost items, hostel queries, and more — just ask in natural language.",
        summary: "I can help with campus navigation, services, health information, academics, transport and other SRM Orbit features.",
        location: "SRM University-AP Campus Support",
        timings: "Always available via SRM Orbit",
        steps: [
          "Try asking: 'I lost my ID card. What do I do?'",
          "Try asking: 'Where is AL-204?'",
          "Try asking: 'Is ORS or Paracetamol available?'",
          "Try asking: 'Where is Professor Ashok Kumar's cabin?'",
          "Try asking: 'Campus ambulance emergency contact'",
          "Try asking: 'What are the hostel mess timings?'",
          "Try asking: 'When is the next placement drive?'",
        ],
        actions: [
          {
            type: "DIRECTIONS",
            label: "Explore Campus Map",
            primary: true,
            payload: "campus_map",
          },
          {
            type: "READ_ALOUD",
            label: "Read Suggestions",
            primary: false,
          },
        ],
        sourceType: "demo_mock_adapter",
      };
  }
}
