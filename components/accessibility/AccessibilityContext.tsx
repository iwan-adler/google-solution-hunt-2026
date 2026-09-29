"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AccessibilitySettings } from "@/types/orbit";

interface AccessibilityContextType extends AccessibilitySettings {
  setHighContrast: (v: boolean) => void;
  setLargeText: (v: boolean) => void;
  setSimplifiedView: (v: boolean) => void;
  setSoundFeedback: (v: boolean) => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  speakText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [simplifiedView, setSimplifiedView] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("a11y-high-contrast");
    } else {
      root.classList.remove("a11y-high-contrast");
    }

    if (largeText) {
      root.classList.add("a11y-large-text");
    } else {
      root.classList.remove("a11y-large-text");
    }
  }, [highContrast, largeText]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleLargeText = () => setLargeText((prev) => !prev);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        simplifiedView,
        soundFeedback,
        setHighContrast,
        setLargeText,
        setSimplifiedView,
        setSoundFeedback,
        toggleHighContrast,
        toggleLargeText,
        speakText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
