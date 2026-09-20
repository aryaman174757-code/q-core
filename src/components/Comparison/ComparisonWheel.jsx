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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            Architectural Matrix Analysis
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Head-to-Head Comparison Wheel
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Slide 8 Academic Comparison Matrix transformed into an interactive rotary dial. Select any architectural criterion to inspect side-by-side mechanics.
          </p>
        </div>

        {/* Category Selector Hub */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {extendedCategories.map((cat, idx) => {
            const isSelected = activeCategoryIdx === idx;
            return (
              <button
                key={cat.category}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 relative group flex flex-col items-center justify-center shadow-xs ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-105"
                    : "bg-white dark:bg-slate-900/70 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-white/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mb-1.5 transition-all ${
                    isSelected ? "bg-white scale-125" : "bg-slate-300 dark:bg-white/30"
                  }`}
                />
                <span className={`text-xs font-bold block leading-tight ${isSelected ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {cat.category}
                </span>
                <span className={`text-[9px] font-mono mt-1 ${isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
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
            <div className="lg:col-span-6 bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-blue-200 dark:border-blue-900/40 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white">
                        Classical Microprocessor
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                    Binary Logic
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentItem.classical}
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentItem.classicalDetail}
                </p>
              </div>

              {/* Classical Visual Indicator */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 font-mono text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">Hardware Paradigm:</span>
                <div>Deterministic CMOS Transistors • Room Temp (300 K) • Von Neumann Bus</div>
              </div>
            </div>

            {/* Right Card: Quantum Microprocessor */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-900/40 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                      <Atom className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white">
                        Quantum Microprocessor (QPU)
                      </h3>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    Superposition & Entanglement
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentItem.quantum}
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentItem.quantumDetail}
                </p>
              </div>

              {/* Quantum Visual Indicator */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 font-mono text-xs text-indigo-600 dark:text-indigo-400 space-y-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">Quantum Paradigm:</span>
                <div>Josephson Junction Qubits • Sub-Kelvin (15 mK) • Unitary Interference</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
