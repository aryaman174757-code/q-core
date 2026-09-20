import React, { useState } from "react";
import { motion } from "framer-motion";
import { QUANTUM_DATA } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers } from "lucide-react";

export default function QuantumPipeline() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = QUANTUM_DATA.working.flowchart;

  const handleStepClick = (step) => {
    sound.playClick();
    setActiveStep(step);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C4DFF] animate-pulse" />
          <h3 className="font-['Orbitron'] text-xl font-bold text-white">
            Working of a Quantum Microprocessor
          </h3>
        </div>
        <p className="text-xs text-[#94A3B8] font-mono mt-1">
          Exact Pipeline from Reference PPT • Slide 5 (Input Data → Qubits → Superposition → Gates → Processing → Measurement → Output)
        </p>
      </div>

      {/* Horizontal Flowchart Node Chain */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-[760px]">
          {steps.map((s, idx) => {
            const isActive = activeStep === s.step;
            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => handleStepClick(s.step)}
                  className={`flex-1 p-3 rounded-2xl border text-center transition-all duration-300 relative group ${
                    isActive
                      ? "bg-gradient-to-b from-[#7C4DFF]/20 to-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                      : "bg-[#050B18]/60 border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#00E5FF] block mb-1">
                    Step 0{s.step}
                  </span>
                  <span className="font-['Orbitron'] text-xs font-bold text-white block leading-tight">
                    {s.title}
                  </span>
                  {s.title.includes("Gates") && (
                    <span className="text-[9px] font-mono text-[#7C4DFF] block mt-1">
                      H, X, CNOT
                    </span>
                  )}
                </button>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="p-6 rounded-2xl bg-[#050B18]/80 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#7C4DFF]/20 text-[#7C4DFF] font-mono text-xs font-bold border border-[#7C4DFF]/40">
              Stage 0{activeStep} of 07
            </span>
            <span className="font-['Orbitron'] text-lg font-bold text-white">
              {steps[activeStep - 1]?.title}
            </span>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {steps[activeStep - 1]?.desc}
          </p>
        </div>

        <div className="md:col-span-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-2">
          <span className="text-[10px] uppercase font-mono text-[#00E5FF] block tracking-wider">
            Flowchart Transformation
          </span>
          <div className="font-mono text-xs text-white">
            {activeStep === 1 && "Classical Bitstream → Pulse Shaping"}
            {activeStep === 2 && "|0⟩ Ground State Initialized"}
            {activeStep === 3 && "|ψ⟩ = (|0⟩ + |1⟩)/√2 Entangled"}
            {activeStep === 4 && "Unitary Matrices (H, Pauli-X, CNOT)"}
            {activeStep === 5 && "Constructive Wave Interference"}
            {activeStep === 6 && "Wavefunction Collapse (Born's Rule)"}
            {activeStep === 7 && "High-Probability Binary Bitstring"}
          </div>
        </div>
      </div>
    </div>
  );
}
