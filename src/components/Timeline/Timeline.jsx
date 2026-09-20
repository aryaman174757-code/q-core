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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-['Orbitron'] font-semibold tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Architectural Evolution
          </div>
          <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
            From Vacuum Tubes to Qubits
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3">
            Follow the 80-year progression of computational hardware: from discrete mechanical thermionic bulbs to sub-atomic quantum entanglement.
          </p>
        </div>

        {/* Horizontal Timeline Bar with SVG connecting trace */}
        <div className="relative mb-12">
          {/* Neon Connecting Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F59E0B] via-[#00E5FF] to-[#7C4DFF]"
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
                  className={`flex flex-col items-center text-center p-3 rounded-2xl glass-panel transition-all duration-300 relative group ${
                    isSelected
                      ? "border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)] bg-[#0F172A]/90 scale-105"
                      : "hover:border-white/20 hover:bg-white/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Indicator Dot */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 mb-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#00E5FF] border-white scale-125 glow-cyan"
                        : "bg-[#050B18] border-white/40 group-hover:border-[#00E5FF]"
                    }`}
                  />
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#00E5FF]">
                    {m.year}
                  </span>
                  <span className="font-['Orbitron'] text-xs font-semibold text-white mt-1 line-clamp-1">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
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
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ backgroundColor: selectedMilestone.color }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative & Breakthrough */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-['Orbitron'] font-bold uppercase tracking-wider text-black"
                    style={{ backgroundColor: selectedMilestone.color }}
                  >
                    {selectedMilestone.year}
                  </span>
                  <span className="text-xs font-['Space_Grotesk'] font-semibold text-[#94A3B8]">
                    {selectedMilestone.era}
                  </span>
                </div>

                <h3 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold text-white">
                  {selectedMilestone.title}
                </h3>
                <h4 className="text-sm font-semibold text-[#00E5FF] font-['Space_Grotesk']">
                  {selectedMilestone.subtitle}
                </h4>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  {selectedMilestone.description}
                </p>

                {/* Breakthrough Quote Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block font-['Orbitron']">
                      Architectural Breakthrough
                    </span>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {selectedMilestone.breakthrough}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hardware Metrics / Specs Card */}
              <div className="lg:col-span-5 bg-[#050B18]/70 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-['Orbitron'] font-bold text-white uppercase tracking-wider">
                    Hardware Specifications
                  </span>
                  <Info className="w-4 h-4 text-[#00E5FF]" />
                </div>

                <div className="space-y-3">
                  {selectedMilestone.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/5"
                    >
                      <span className="text-[#94A3B8]">{spec.label}</span>
                      <span className="font-mono font-semibold text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>Timeline Step {activeIdx + 1} of {TIMELINE_MILESTONES.length}</span>
                  <span className="text-[#00E5FF] font-mono">
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
