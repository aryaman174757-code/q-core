import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Cpu, Atom, BookOpen, Layers } from "lucide-react";
import Core3DCanvas from "./Core3DCanvas";
import { INSTITUTION_INFO } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";

export default function Hero({ onNavigate }) {
  const [coreMode, setCoreMode] = useState("quantum");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleCore = () => {
    sound.playQuantumBeep();
    setCoreMode(prev => (prev === "quantum" ? "classical" : "quantum"));
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background: Starfield, Binary Particles & Quantum Energy Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Glow Centers */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C4DFF]/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Binary / Quantum Bits */}
        <div className="absolute inset-0 overflow-hidden opacity-25">
          {["0", "1", "|0⟩", "|1⟩", "H", "CNOT", "λ", "ψ", "ALU", "CU"].map((token, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-xs text-[#00E5FF]"
              style={{
                top: `${(i * 19 + 7) % 95}%`,
                left: `${(i * 27 + 11) % 92}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {token}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Academic Attribution Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-semibold text-slate-800 dark:text-white">
              {INSTITUTION_INFO.college}
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden md:inline text-blue-600 dark:text-blue-400 font-medium">
              {INSTITUTION_INFO.department}
            </span>
          </div>
        </motion.div>

        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cinematic Typography & CTAs */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
            style={{
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
            }}
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Next-Gen Computing Architecture
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Quantum vs Classical
                <span className="block text-blue-600 dark:text-blue-400 mt-1">
                  Microprocessors
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Explore the transition from deterministic binary silicon architectures to sub-Kelvin quantum superposition processors.
              Featuring interactive labs, 3D hardware inspection, and real-time algorithm execution.
            </p>

            {/* Sub-tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              <span className="text-blue-600 dark:text-blue-400">Explore</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-indigo-600 dark:text-indigo-400">Simulate</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300">Understand</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playQuantumBeep();
                  onNavigate("labs");
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Enter Virtual Labs</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("comparison");
                }}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 shadow-xs transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-0"
              >
                <span>Comparison Center</span>
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("quiz");
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all"
              >
                Knowledge Assessment
              </button>
            </div>

            {/* Quick Curriculum Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200 dark:border-white/10 text-left">
              <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Classical</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Fetch-Decode-Execute
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  <Atom className="w-3.5 h-3.5" />
                  <span>Quantum</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Superposition & Gates
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>4 Labs</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Bloch & Circuit Builder
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Morphing Chip Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
            style={{
              transform: `translate3d(${-mousePos.x * 0.2}px, ${-mousePos.y * 0.2}px, 0)`
            }}
          >
            <div className="relative">
              <Core3DCanvas mode={coreMode} onModeToggle={toggleCore} />
              
              {/* Quick Switch Overlay Buttons */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#94A3B8] px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Live 3D Hardware Simulation
                </span>
                <span className="font-mono text-[#00E5FF]">
                  Mode: {coreMode === "quantum" ? "Superconducting QPU (15 mK)" : "Silicon Microprocessor (3.5 GHz)"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
