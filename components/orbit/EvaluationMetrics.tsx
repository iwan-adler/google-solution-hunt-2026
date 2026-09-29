"use client";

import React from "react";
import { Zap, Clock, CheckCircle2, TrendingDown, Layers } from "lucide-react";

export function EvaluationMetrics() {
  const metrics = [
    {
      metric: "Information Search Time",
      before: "14 mins",
      after: "4.2 secs",
      impact: "99.5% faster",
      detail: "Across 4 portals and unsearchable PDFs",
    },
    {
      metric: "Task Completion Steps",
      before: "9 steps",
      after: "1 step",
      impact: "Zero portal hopping",
      detail: "Direct actionable next step without manual routing",
    },
    {
      metric: "Wayfinding Error Rate",
      before: "42%",
      after: "0%",
      impact: "Point-to-point clarity",
      detail: "Step-by-step route with floor & elevator guides",
    },
    {
      metric: "Notice Comprehension",
      before: "3-page legal PDF",
      after: "5 bullet points",
      impact: "Zero ambiguity",
      detail: "What Changed, Who is Affected, Deadline, and Action",
    },
  ];

  return (
    <div className="w-full my-10 p-5 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-sm sm:text-base tracking-tight">
            Impact Benchmark: Human–Machine Gap (PS05)
          </h4>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Simulated Hackathon Benchmark
        </span>
      </div>

      <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
        Comparing traditional student workflows (navigating fragmented portals, circulars, and desks) against the unified <span className="text-blue-400 font-semibold">SRM Orbit</span> contextual interaction layer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {metrics.map((m) => (
          <div
            key={m.metric}
            className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5"
          >
            <p className="text-xs text-slate-300 font-semibold">{m.metric}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through text-slate-500 font-medium">
                {m.before}
              </span>
              <span className="text-lg font-black text-emerald-400 flex items-center gap-1">
                {m.after}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-400">
              <TrendingDown className="w-3 h-3 text-emerald-400" />
              <span>{m.impact}</span>
            </div>
            <p className="text-[10px] text-slate-400 pt-0.5">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
