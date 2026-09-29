"use client";

import React, { useState } from "react";
import { SearchConsole } from "./SearchConsole";
import { ContextBanner } from "./ContextBanner";
import { QuickActions } from "./QuickActions";
import { ActionCard } from "./ActionCard";
import { EvaluationMetrics } from "./EvaluationMetrics";
import { samplePreloadedResponses } from "@/data/mock/campus-data";
import { OrbitActionCardData } from "@/types/orbit";
import { Sparkles, RefreshCcw } from "lucide-react";

export function OrbitDashboard() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<OrbitActionCardData | null>(
    samplePreloadedResponses.id_loss
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("I lost my ID card. What do I do?");

  const resolveQueryToCard = (query: string): OrbitActionCardData => {
    const q = query.toLowerCase();

    if (q.includes("id") || q.includes("lost") || q.includes("card")) {
      return samplePreloadedResponses.id_loss;
    }
    if (q.includes("al-204") || q.includes("al 204") || q.includes("nav") || q.includes("where") || q.includes("room")) {
      return samplePreloadedResponses.al204;
    }
    if (q.includes("pharmacy") || q.includes("health") || q.includes("paracetamol") || q.includes("ors") || q.includes("doctor")) {
      return samplePreloadedResponses.health_stock;
    }
    if (q.includes("bus") || q.includes("transit") || q.includes("guntur") || q.includes("eta")) {
      return samplePreloadedResponses.bus_guntur;
    }
    if (q.includes("emergency") || q.includes("ambulance") || q.includes("security") || q.includes("help") || q.includes("sos")) {
      return samplePreloadedResponses.emergency_card;
    }

    // Default contextual card matching query
    return {
      id: "card-custom",
      intent: "GENERAL_CAMPUS_INQUIRY",
      category: "ask",
      title: `Contextual Action for: "${query}"`,
      summary: "SRM Orbit translated your request into verified student action steps.",
      badge: "Contextual Match",
      location: {
        building: "Academic Learning (AL) Block",
        floor: "Ground Floor",
        room: "Student Information Center",
        walkingTime: "2 mins walking time",
      },
      timings: "8:30 AM - 6:00 PM",
      steps: [
        {
          stepNumber: 1,
          instruction: "Verify identity via Student ERP / Digital ID",
        },
        {
          stepNumber: 2,
          instruction: "Consult Student Helpdesk or designated faculty coordinator",
        },
      ],
      actions: [
        {
          type: "GET_DIRECTIONS",
          label: "Directions to Helpdesk",
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
  };

  const handleSearch = (query: string) => {
    setActiveQuery(query);
    setIsLoading(true);

    // Simulate instant contextual understanding pipeline
    setTimeout(() => {
      const response = resolveQueryToCard(query);
      setCurrentCard(response);
      setActiveCategory(response.category);
      setIsLoading(false);
    }, 400);
  };

  const handleSelectCategory = (categoryId: string, sampleQuery: string) => {
    setActiveCategory(categoryId);
    handleSearch(sampleQuery);
  };

  const handleNavigateRequest = (target: string) => {
    handleSearch(`Navigate to ${target}`);
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

      {/* Contextual Action Deck */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
              Actionable Campus Response
            </h3>
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
