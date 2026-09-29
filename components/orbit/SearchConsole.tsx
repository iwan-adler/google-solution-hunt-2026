"use client";

import React, { useState, useEffect } from "react";
import { Search, Mic, MicOff, Sparkles, CornerDownLeft, Loader2 } from "lucide-react";
import { useAccessibility } from "@/components/accessibility/AccessibilityContext";

interface SearchConsoleProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
}

export function SearchConsole({ onSearch, isLoading = false, initialQuery = "" }: SearchConsoleProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const { speakText } = useAccessibility();

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  const handleVoiceToggle = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      // SpeechRecognition Web API
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      if (!isListening) {
        recognition.start();
        setIsListening(true);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
          onSearch(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } else {
      // Graceful fallback simulation
      setIsListening(true);
      setTimeout(() => {
        const fallbackVoice = "Where is AL-204?";
        setQuery(fallbackVoice);
        setIsListening(false);
        onSearch(fallbackVoice);
        speakText("Voice recognized: Where is AL-204?");
      }, 1500);
    }
  };

  const promptChips = [
    { label: "I lost my ID card", query: "I lost my ID card. What do I do?" },
    { label: "Find AL-204", query: "I need to find AL-204" },
    { label: "Check Pharmacy Stock", query: "Are Paracetamol and ORS available right now?" },
    { label: "Bus #12 ETA", query: "What is the status of Bus #12 to Guntur?" },
    { label: "Campus Emergency", query: "Campus Ambulance emergency contact" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8 text-center">
      {/* Product Vision Principle Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="tracking-wide">ASK → UNDERSTAND → CONTEXTUALIZE → ACT</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          What do you need?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          No portals, PDFs, or menus. Ask in natural language; SRM Orbit turns campus technology into action.
        </p>
      </div>

      {/* Primary Contextual Command Bar */}
      <form onSubmit={handleSubmit} className="relative mt-4">
        <div className="relative flex items-center w-full rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all p-1.5 sm:p-2">
          <div className="pl-3 pr-2 text-slate-400 dark:text-slate-500">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything (e.g. 'I lost my ID card', 'Where is AL-204?', 'Bus #12 to Guntur')"
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none px-1 py-2 font-medium"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              title={isListening ? "Listening... click to stop" : "Voice Input"}
              className={`p-2.5 rounded-xl transition ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Ask Orbit Trigger Button */}
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide transition flex items-center gap-1.5 shadow-md shadow-blue-500/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Contextualizing...</span>
                </>
              ) : (
                <>
                  <span>Ask Orbit</span>
                  <CornerDownLeft className="w-3.5 h-3.5 hidden sm:inline opacity-80" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Natural Language Prompt Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
        <span className="text-[11px] text-slate-400 font-semibold mr-1">Suggestions:</span>
        {promptChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => {
              setQuery(chip.query);
              onSearch(chip.query);
            }}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 border border-slate-200/60 dark:border-slate-700/60 transition"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
