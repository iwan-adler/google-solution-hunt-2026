"use client";

import React from "react";
import { quickCategoriesList } from "@/data/mock/campus-data";
import {
  Compass,
  Bus,
  HeartPulse,
  GraduationCap,
  Settings,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface QuickActionsProps {
  onSelectCategory: (categoryId: string, query: string) => void;
  activeCategory: string | null;
}

export function QuickActions({ onSelectCategory, activeCategory }: QuickActionsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Compass":
        return <Compass className="w-5 h-5" />;
      case "Bus":
        return <Bus className="w-5 h-5" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Settings":
        return <Settings className="w-5 h-5" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full space-y-3.5 my-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Quick Campus Portals
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Instant contextual jump to essential services without navigating complex menus
          </p>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hidden sm:inline">
          6 Core Verticals
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickCategoriesList.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id, cat.sampleQuery)}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group h-36 ${
                isSelected
                  ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-500/20"
                  : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${cat.color} shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400 gap-1 group-hover:translate-x-0.5 transition-transform pt-1">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
