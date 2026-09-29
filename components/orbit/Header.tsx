"use client";

import React from "react";
import { useAccessibility } from "@/components/accessibility/AccessibilityContext";
import { Eye, Type, Volume2, Sparkles, Orbit } from "lucide-react";

export function Header() {
  const { highContrast, toggleHighContrast, largeText, toggleLargeText, speakText } =
    useAccessibility();

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Orbit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                SRM Orbit
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Campus OS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Contextual Operating Layer • SRM University-AP
            </p>
          </div>
        </div>

        {/* Action Controls & Accessibility Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Mode Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Demo Mode Active</span>
          </div>

          {/* Accessibility Quick Toggles */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={toggleHighContrast}
              title="Toggle High Contrast Mode"
              className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                highContrast
                  ? "bg-amber-400 text-black font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Contrast</span>
            </button>

            <button
              type="button"
              onClick={toggleLargeText}
              title="Toggle Large Text Mode"
              className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                largeText
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Text Size</span>
            </button>

            <button
              type="button"
              onClick={() =>
                speakText(
                  "Welcome to SRM Orbit. The contextual campus operating system. Ask anything or choose an action."
                )
              }
              title="Read Page Summary"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 text-xs transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
