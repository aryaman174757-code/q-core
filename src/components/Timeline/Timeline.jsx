import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE_MILESTONES } from "../../data/timelineData";
import { sound } from "../../utils/audioEffects";
import { Calendar, CheckCircle2, ChevronRight, Sparkles, X, Info } from "lucide-react";

export default function Timeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(TIMELINE_MILESTONES[0]);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleSelect = (milestone, idx) => {
    sound.playClick();
    setSelectedMilestone(milestone);
    setActiveIdx(idx);
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-[#00E5FF]/5 to-transparent pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Architectural Evolution
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            From Vacuum Tubes to Qubits
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Follow the 80-year progression of computational hardware: from discrete mechanical thermionic bulbs to sub-atomic quantum entanglement.
          </p>
        </div>

        {/* Horizontal Timeline Bar with SVG connecting track */}
        <div className="relative mb-12">
          {/* Connecting Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeIdx + 1) / TIMELINE_MILESTONES.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Milestone Node Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {TIMELINE_MILESTONES.map((m, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={m.year}
                  onClick={() => handleSelect(m, idx)}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl bg-white dark:bg-slate-900/80 border transition-all duration-200 relative group shadow-xs ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/20 shadow-sm scale-105"
                      : "border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-white/30"
                  }`}
                >
                  {/* Indicator Dot */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 mb-2 transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-600 border-white scale-110 shadow-xs"
                        : "bg-slate-300 dark:bg-slate-700 border-white/60 group-hover:border-blue-500"
                    }`}
                  />
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {m.year}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-slate-800 dark:text-white mt-1 line-clamp-1">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Gen {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Animated Information Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 relative overflow-hidden shadow-sm backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative & Breakthrough */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: selectedMilestone.color }}
                  >
                    {selectedMilestone.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {selectedMilestone.era}
                  </span>
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {selectedMilestone.title}
                </h3>
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {selectedMilestone.subtitle}
                </h4>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedMilestone.description}
                </p>

                {/* Breakthrough Quote Box */}
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Architectural Breakthrough
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {selectedMilestone.breakthrough}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hardware Metrics / Specs Card */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Hardware Specifications
                  </span>
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="space-y-3">
                  {selectedMilestone.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 dark:border-white/5"
                    >
                      <span className="text-slate-600 dark:text-slate-400">{spec.label}</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Timeline Step {activeIdx + 1} of {TIMELINE_MILESTONES.length}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">
                    {activeIdx === TIMELINE_MILESTONES.length - 1 ? "Quantum Frontier" : "Next Gen Available"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
