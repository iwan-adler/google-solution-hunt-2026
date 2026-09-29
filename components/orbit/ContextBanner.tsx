"use client";

import React from "react";
import { mockStudentContext } from "@/data/mock/campus-data";
import { Clock, MapPin, Bus, AlertCircle, ArrowUpRight } from "lucide-react";

interface ContextBannerProps {
  onSelectContextQuery: (query: string) => void;
}

export function ContextBanner({ onSelectContextQuery }: ContextBannerProps) {
  const { upcomingClass, assignedBus, activeAlert } = mockStudentContext;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 my-6">
      {/* 1. Upcoming Academic Schedule */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-900 border border-blue-100 dark:border-slate-700/80 p-4 transition-all hover:shadow-md hover:border-blue-300">
        <div className="flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Next Class in {upcomingClass.startsInMinutes}m
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[11px] font-bold">
            {upcomingClass.time}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
          {upcomingClass.courseCode}: {upcomingClass.courseName}
        </h4>
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
          <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="font-medium">{upcomingClass.room}</span>
          <span className="text-slate-400">• {upcomingClass.building}</span>
        </div>
        <button
          type="button"
          onClick={() => onSelectContextQuery("Where is AL-204?")}
          className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-slate-700 flex items-center justify-center gap-1 transition shadow-2xs"
        >
          <span>Find Route to {upcomingClass.room}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Live Transit Telemetry */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 dark:from-slate-800/80 dark:to-slate-900 border border-amber-100 dark:border-slate-700/80 p-4 transition-all hover:shadow-md hover:border-amber-300">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
          <span className="flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5" />
            Assigned Bus #{assignedBus.busNumber}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-800 dark:text-amber-300">
            ETA {assignedBus.etaMinutes}m
          </span>
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
          {assignedBus.routeName}
        </h4>
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
          <span className="text-slate-400">Approaching:</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">{assignedBus.currentStop}</span>
        </div>
        <button
          type="button"
          onClick={() => onSelectContextQuery("What is the status of Bus #12 to Guntur?")}
          className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-600 hover:text-white text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-slate-700 flex items-center justify-center gap-1 transition shadow-2xs"
        >
          <span>Track Bus Telemetry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Approaching Campus Deadline */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50/40 dark:from-slate-800/80 dark:to-slate-900 border border-rose-100 dark:border-slate-700/80 p-4 transition-all hover:shadow-md hover:border-rose-300">
        <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400 mb-2">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Campus Deadline
          </span>
          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-[11px] font-bold text-rose-800 dark:text-rose-300">
            {activeAlert.deadline}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
          {activeAlert.title}
        </h4>
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
          <span className="text-slate-500">Action:</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">Submit exam eligibility verification</span>
        </div>
        <button
          type="button"
          onClick={() => onSelectContextQuery("When is the Mid-Term Hall Ticket verification deadline?")}
          className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-slate-700 flex items-center justify-center gap-1 transition shadow-2xs"
        >
          <span>View Verification Steps</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
