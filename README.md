SRM Orbit — Campus OS

An AI-powered contextual campus assistant for SRM University-AP.

Overview

SRM Orbit is a smart campus assistant designed to help students access campus information and services through natural-language interaction.

Instead of searching through multiple portals, PDFs, and menus, students can simply ask what they need and receive a contextual, actionable response.

Example

A student can ask:

"I lost my ID card. What do I do?"
"Where is AL-204?"
"What are the library timings?"
"When is the next bus?"
"Where can I find the campus ambulance?"
"When is my next class?"

The system identifies the user's intent, retrieves the relevant campus information, and presents it as an actionable response.

Key Features
🤖 AI-powered natural language interaction
🎯 Intent detection and entity extraction
🏫 Campus-specific information and services
📍 Campus location and wayfinding support
🚌 Campus transportation information
📚 Academic and library information
🪪 Student service workflows
♿ Accessibility features
🔊 Read-aloud support
📱 Responsive web interface
🛡️ Deterministic fallback for reliable responses
How It Works
Student Question
       ↓
Natural Language Understanding
       ↓
Intent Detection
       ↓
Campus Context Retrieval
       ↓
Structured Actionable Response
       ↓
Student

The application combines AI-based intent detection with a structured campus data layer to provide relevant and actionable campus information.

Technology Stack

Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React
AI: Google Gemini, Google GenAI SDK
Backend: Next.js API Routes, TypeScript
Development: Node.js, npm, Git, GitHub

Project Structure
google-solution-hunt-2026/
│
├── app/
│   ├── api/
│   │   └── ask/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── accessibility/
│   └── orbit/
│
├── data/
│   └── mock/
│
├── lib/
│   ├── ai/
│   └── services/
│
├── types/
│
├── public/
│
├── .env.example
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
Getting Started
1. Clone the repository
git clone https://github.com/iwan-adler/google-solution-hunt-2026.git
cd google-solution-hunt-2026
2. Install dependencies
npm install
3. Configure environment variables

Create a .env.local file in the project root:

GEMINI_API_KEY=your_gemini_api_key

Do not commit your API key to GitHub.

4. Start the development server
npm run dev

Open http://localhost:3000 in your browser.

Available Commands
npm run dev

Starts the development server.

npm run build

Creates an optimized production build.

npm run start

Starts the production server.

npm run typecheck

Checks the TypeScript code for type errors.

AI Architecture

SRM Orbit uses an intent-based architecture.

For each student query:

The question is received through the /api/ask endpoint.
The AI layer identifies the user's intent and relevant entities.
The campus service layer retrieves the appropriate campus information.
The application returns a structured response.
The frontend displays the response together with relevant actions such as directions, forms, or read-aloud support.

A deterministic fallback is included so that supported campus scenarios can still produce useful responses when AI inference is unavailable.

Accessibility

SRM Orbit includes accessibility-focused functionality such as:

Contrast controls
Text-size controls
Read-aloud support
Clear action-oriented responses
Natural-language interaction
Hackathon

This project was developed for the Google Solution Hunt Challenge 2026 at SRM University-AP.

Team

Developed by the team participating in the Google Solution Hunt Challenge 2026.

SRM Orbit — Ask. Understand. Contextualize. Act.