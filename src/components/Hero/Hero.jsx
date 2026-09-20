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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#00E5FF]/30 text-xs text-[#94A3B8] shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-white font-medium">
              {INSTITUTION_INFO.college}
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-[#00E5FF]">
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
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#7C4DFF]/15 border border-[#7C4DFF]/30 text-[#7C4DFF] text-xs font-['Orbitron'] font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                Next-Gen Computing Education
              </div>
              <h1 className="font-['Orbitron'] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none">
                <span className="bg-gradient-to-r from-[#00E5FF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                  Q-CORE
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#F8FAFC] font-bold block mt-2">
                  Quantum vs Classical Microprocessor
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl font-light leading-relaxed">
              Explore the transition from binary silicon Von Neumann architectures to sub-Kelvin quantum superposition processors.
              Featuring interactive labs, 3D hardware exploration, and live algorithm simulations.
            </p>

            {/* Sub-tagline from prompt */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-['Space_Grotesk'] font-semibold tracking-widest text-[#00E5FF] uppercase">
              <span>Explore</span>
              <span className="text-white/20">•</span>
              <span className="text-[#7C4DFF]">Simulate</span>
              <span className="text-white/20">•</span>
              <span>Understand</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playQuantumBeep();
                  onNavigate("labs");
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-bold text-sm flex items-center gap-2 hover:opacity-90 shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Enter Virtual Labs</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("comparison");
                }}
                className="px-6 py-3.5 rounded-xl glass-panel border border-white/15 hover:border-[#00E5FF] text-white font-semibold text-sm flex items-center gap-2 transition-all hover:bg-white/10 active:scale-95"
              >
                <span>Comparison Center</span>
                <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("quiz");
                }}
                className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#7C4DFF] text-[#94A3B8] hover:text-white text-sm font-medium transition-all"
              >
                Test Knowledge
              </button>
            </div>

            {/* Quick Curriculum Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-left">
              <div className="glass-panel p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-[#00E5FF] font-['Space_Grotesk'] font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Classical</span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                  Fetch-Decode-Execute
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-[#7C4DFF] font-['Space_Grotesk'] font-bold">
                  <Atom className="w-3.5 h-3.5" />
                  <span>Quantum</span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                  Superposition & Gates
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-['Space_Grotesk'] font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>4 Labs</span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-mono">
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
