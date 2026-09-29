"use client";

import React, { useState } from "react";
import { SearchConsole } from "./SearchConsole";
import { ContextBanner } from "./ContextBanner";
import { QuickActions } from "./QuickActions";
import { ActionCard } from "./ActionCard";
import { EvaluationMetrics } from "./EvaluationMetrics";
import { samplePreloadedResponses } from "@/data/mock/campus-data";
import { OrbitActionCardData, AskResponse } from "@/types/orbit";
import { RefreshCcw, AlertTriangle, Sparkles, Cpu } from "lucide-react";

export function OrbitDashboard() {
  const [activeCategory, setActiveCategory] = useState<string | null>("services");
  const [currentCard, setCurrentCard] = useState<OrbitActionCardData | null>(
    samplePreloadedResponses.id_loss
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState("I lost my ID card. What do I do?");
  const [detectedAiTelemetry, setDetectedAiTelemetry] = useState<{
    intent: string;
    confidence?: number;
  } | null>({
    intent: "id_replacement",
    confidence: 0.98,
  });

  const handleSearch = async (query: string) => {
    setActiveQuery(query);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to process request.");
        setIsLoading(false);
        return;
      }

      const askData = data as AskResponse;

      // Map intent to OrbitCategory
      const intentToCategory = (intent: string): string => {
        switch (intent) {
          case "navigation": return "navigate";
          case "pharmacy_lookup":
          case "doctor_availability": return "health";
          case "emergency_contact": return "emergency";
          case "id_replacement":
          case "lost_found":
          case "maintenance":
          case "general_campus_help": return "services";
          case "bus": return "transport";
          case "academics":
          case "faculty_lookup":
          case "event_lookup":
          case "library": return "academics";
          case "hostel":
          case "placement": return "services";
          default: return "ask";
        }
      };

      // Map AskResponse to OrbitActionCardData
      const cardData: OrbitActionCardData = {
        id: `card-${Date.now()}`,
        intent: askData.intent,
        category: intentToCategory(askData.intent) as any,
        title: askData.title,
        summary: askData.answer || askData.summary,
        badge: `Intent: ${askData.intent.toUpperCase()}`,
        location: askData.locationDetails || (askData.location ? { building: askData.location } : undefined),
        timings: askData.timings,
        steps: askData.steps?.map((stepStr, idx) => ({
          stepNumber: idx + 1,
          instruction: stepStr,
        })),
        actions: askData.actions,
        sourceType: askData.sourceType,
        entities: askData.entities,
      };

      setCurrentCard(cardData);
      setActiveCategory(cardData.category);
      setDetectedAiTelemetry({
        intent: askData.intent,
        confidence: askData.confidence,
      });
    } catch (err) {
      console.error("Client fetch error to /api/ask:", err);
      setErrorMessage("Network connection error. Reverting to local deterministic demo adapter.");
      // Fallback to local response if offline
      setCurrentCard(samplePreloadedResponses.id_loss);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCategory = (categoryId: string, sampleQuery: string) => {
    setActiveCategory(categoryId);
    handleSearch(sampleQuery);
  };

  const handleNavigateRequest = (target: string) => {
    handleSearch(`Where is ${target}?`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      {/* Search Console */}
      <SearchConsole
        onSearch={handleSearch}
        isLoading={isLoading}
        initialQuery={activeQuery}
      />

      {/* Real-time Contextual State Banner */}
      <ContextBanner onSelectContextQuery={handleSearch} />

      {/* Error Banner if validation or network issue occurs */}
      {errorMessage && (
        <div className="w-full p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Contextual Action Deck */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
              Actionable Campus Response
            </h3>
            {detectedAiTelemetry && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                <Cpu className="w-3 h-3 text-blue-500" />
                <span>
                  {detectedAiTelemetry.intent}
                  {typeof detectedAiTelemetry.confidence === "number"
                    ? ` · ${Math.round(detectedAiTelemetry.confidence * 100)}% confidence`
                    : ""}
                </span>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleSearch("I lost my ID card. What do I do?")}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset Demo Prompt</span>
          </button>
        </div>

        {currentCard && (
          <ActionCard
            data={currentCard}
            onNavigateRequest={handleNavigateRequest}
          />
        )}
      </div>

      {/* 6 Quick Action Categories */}
      <QuickActions
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
      />

      {/* Human–Machine Gap Evaluation Benchmark */}
      <EvaluationMetrics />
    </div>
  );
}
