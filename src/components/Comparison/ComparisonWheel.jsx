import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPARISON_MATRIX } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";
import { Cpu, Atom, Zap, Binary, AlertTriangle, ThermometerSnowflake, Clock, DollarSign, Layers } from "lucide-react";

export default function ComparisonWheel() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  // Extend comparison matrix to include Cost from PPT advantages/disadvantages
  const extendedCategories = [
    ...COMPARISON_MATRIX,
    {
      category: "Cost & Practicality",
      classical: "Low cost – widely available and supported",
      quantum: "Very expensive to build & maintain",
      classicalDetail: "Slide 4: Standardized silicon fabrication plants mass-produce billions of chips for dollars each.",
      quantumDetail: "Slide 7: Multimillion-dollar dilution refrigerators, shielded labs, and specialized microwave electronics required.",
      icon: "DollarSign"
    }
  ];

  const currentItem = extendedCategories[activeCategoryIdx];

  const handleSelect = (idx) => {
    sound.playClick();
    setActiveCategoryIdx(idx);
  };

  return (
    <section id="comparison" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC4899]/15 border border-[#EC4899]/30 text-[#EC4899] text-xs font-['Orbitron'] font-semibold tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Interactive Comparison Center
          </div>
          <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Head-to-Head Architectural Wheel
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Slide 8 Academic Comparison Matrix transformed into an interactive rotary dial. Select any architectural criterion to inspect side-by-side mechanics.
          </p>
        </div>

        {/* Circular / Rotary Category Selector Hub */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {extendedCategories.map((cat, idx) => {
            const isSelected = activeCategoryIdx === idx;
            return (
              <button
                key={cat.category}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-2xl border text-center transition-all duration-300 relative group flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-b from-[#00E5FF]/20 to-[#7C4DFF]/20 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-[#050B18]/70 border-white/10 hover:border-white/20 hover:bg-white/5 opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mb-1.5 transition-all ${
                    isSelected ? "bg-[#00E5FF] scale-125" : "bg-white/30"
                  }`}
                />
                <span className="font-['Orbitron'] text-xs font-bold text-white block leading-tight">
                  {cat.category}
                </span>
                <span className="text-[9px] font-mono text-[#94A3B8] mt-1">
                  Aspect 0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Comparative Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left Card: Classical Microprocessor */}
            <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/15 border border-[#00E5FF]/40 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h3 className="font-['Orbitron'] text-lg font-bold text-white">
                        Classical Microprocessor
                      </h3>
                      <span className="text-xs font-mono text-[#00E5FF]">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-[#94A3B8]">
                    Binary Logic
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-['Orbitron'] font-bold text-[#94A3B8] uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold font-['Space_Grotesk'] text-white">
                    {currentItem.classical}
                  </div>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {currentItem.classicalDetail}
                </p>
              </div>

              {/* Classical Visual Indicator */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-[#00E5FF] space-y-1">
                <span className="text-[10px] text-[#94A3B8] uppercase block">Hardware Paradigm:</span>
                <div>Deterministic CMOS Transistors • Room Temp (300 K) • Von Neumann Bus</div>
              </div>
            </div>

            {/* Right Card: Quantum Microprocessor */}
            <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-[#7C4DFF]/40 space-y-6 flex flex-col justify-between relative overflow-hidden glow-purple">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#7C4DFF]/15 border border-[#7C4DFF]/40 flex items-center justify-center">
                      <Atom className="w-5 h-5 text-[#7C4DFF]" />
                    </div>
                    <div>
                      <h3 className="font-['Orbitron'] text-lg font-bold text-white">
                        Quantum Microprocessor (QPU)
                      </h3>
                      <span className="text-xs font-mono text-[#7C4DFF]">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#7C4DFF]/20 text-xs font-mono text-[#7C4DFF] font-bold">
                    Superposition & Entanglement
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-['Orbitron'] font-bold text-[#94A3B8] uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold font-['Space_Grotesk'] text-white">
                    {currentItem.quantum}
                  </div>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {currentItem.quantumDetail}
                </p>
              </div>

              {/* Quantum Visual Indicator */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-[#7C4DFF] space-y-1">
                <span className="text-[10px] text-[#94A3B8] uppercase block">Quantum Paradigm:</span>
                <div>Josephson Junction Qubits • Sub-Kelvin (15 mK) • Unitary Interference</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
