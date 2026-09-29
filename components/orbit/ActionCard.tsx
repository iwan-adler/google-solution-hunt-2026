"use client";

import React, { useState } from "react";
import { OrbitActionCardData, ActionStep } from "@/types/orbit";
import { useAccessibility } from "@/components/accessibility/AccessibilityContext";
import {
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Volume2,
  Navigation,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";

interface ActionCardProps {
  data: OrbitActionCardData;
  onNavigateRequest?: (target: string) => void;
}

export function ActionCard({ data, onNavigateRequest }: ActionCardProps) {
  const { speakText } = useAccessibility();
  const [actionDone, setActionDone] = useState<Record<string, boolean>>({});

  const handleActionClick = (action: OrbitActionCardData["actions"][0]) => {
    setActionDone((prev) => ({ ...prev, [action.label]: true }));

    if (action.type === "READ_ALOUD") {
      let stepsText = "";
      if (data.steps && data.steps.length > 0) {
        stepsText = data.steps
          .map((s, idx) => (typeof s === "string" ? `${idx + 1}. ${s}` : `${s.stepNumber}. ${s.instruction}`))
          .join(". ");
      }
      const speech = `${data.title}. ${data.summary}. Action protocol: ${stepsText}`;
      speakText(speech);
      return;
    }

    if ((action.type === "GET_DIRECTIONS" || action.type === "DIRECTIONS") && onNavigateRequest && action.payload) {
      onNavigateRequest(action.payload);
      return;
    }

    if (action.type === "CALL" && action.payload) {
      window.location.href = action.payload;
      return;
    }

    if ((action.type === "START_PROCESS" || action.type === "PROCESS") && action.payload) {
      if (action.payload.startsWith("http") || action.payload.startsWith("mailto")) {
        window.open(action.payload, "_blank");
      }
    }
  };

  const getSourceBadge = (sourceType: string) => {
    switch (sourceType) {
      case "verified_campus_record":
        return { label: "Verified Campus Record", color: "text-emerald-600 dark:text-emerald-400" };
      case "demo_mock_adapter":
      case "simulated_adapter":
        return { label: "Demo Campus Adapter", color: "text-amber-600 dark:text-amber-400" };
      default:
        return { label: "AI Interpreted Intent", color: "text-blue-600 dark:text-blue-400" };
    }
  };

  const sourceMeta = getSourceBadge(data.sourceType);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-500/20 dark:border-blue-500/30 p-5 sm:p-7 shadow-xl shadow-blue-500/5 transition-all">
      {/* Header Badges & Source Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
            {data.badge || "Intent: " + data.intent}
          </span>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${sourceMeta.color}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            {sourceMeta.label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const speech = `${data.title}. ${data.summary}`;
            speakText(speech);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/40 transition"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Read Aloud</span>
        </button>
      </div>

      {/* Title & Simplified Summary */}
      <div className="pt-5 space-y-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {data.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Location & Timings Metadata Pill */}
      {(data.location || data.timings) && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
          {data.location && (
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {typeof data.location === "string" ? data.location : data.location.building}
                  {typeof data.location !== "string" && data.location.floor ? ` • ${data.location.floor}` : ""}
                </p>
                {typeof data.location !== "string" && data.location.room && (
                  <p className="text-slate-500 dark:text-slate-400">{data.location.room}</p>
                )}
                {typeof data.location !== "string" && data.location.walkingTime && (
                  <p className="text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    {data.location.walkingTime}
                  </p>
                )}
              </div>
            </div>
          )}

          {data.timings && (
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Operational Timings</p>
                <p className="text-slate-500 dark:text-slate-400">{data.timings}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actionable Route Steps */}
      {typeof data.location !== "string" && data.location?.routeSteps && data.location.routeSteps.length > 0 && (
        <div className="mt-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5 mb-2.5">
            <Navigation className="w-3.5 h-3.5" />
            Step-by-Step Wayfinding
          </p>
          <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
            {data.location.routeSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Sequential Action Steps */}
      {data.steps && data.steps.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Action Protocol
          </p>
          <div className="space-y-2">
            {data.steps.map((s, idx) => {
              const stepNumber = typeof s === "string" ? idx + 1 : s.stepNumber;
              const instruction = typeof s === "string" ? s : s.instruction;
              const detail = typeof s === "string" ? undefined : s.detail;

              return (
                <div
                  key={stepNumber}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 hover:border-blue-300 transition"
                >
                  <span className="w-6 h-6 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {stepNumber}
                  </span>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{instruction}</p>
                    {detail && <p className="text-slate-500 dark:text-slate-400">{detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Action CTAs */}
      {data.actions && data.actions.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2.5">
          {data.actions.map((act) => {
            const isDone = actionDone[act.label];
            const isDirections = act.type === "GET_DIRECTIONS" || act.type === "DIRECTIONS";
            const isProcess = act.type === "START_PROCESS" || act.type === "PROCESS";
            const isCall = act.type === "CALL";

            return (
              <button
                key={act.label}
                type="button"
                onClick={() => handleActionClick(act)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-xs ${
                  act.primary
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : isDirections ? (
                  <Navigation className="w-4 h-4" />
                ) : isProcess ? (
                  <ExternalLink className="w-4 h-4" />
                ) : isCall ? (
                  <PhoneCall className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{isDone ? "Triggered" : act.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
