import React, { useState } from "react";
import { Atom, Check, AlertCircle, Brain, ShieldCheck, Dna, CloudRain, TrendingUp } from "lucide-react";
import QuantumChip3D from "./QuantumChip3D";
import BlochSphere3D from "./BlochSphere3D";
import QuantumPipeline from "./QuantumPipeline";
import { QUANTUM_DATA } from "../../data/academicContent";

export default function QuantumOverview() {
  const [selectedLayerId, setSelectedLayerId] = useState("qubits");
  const [activeTab, setActiveTab] = useState("bloch"); // 'bloch' | 'chip3d' | 'pipeline' | 'proscons'

  const iconMap = {
    Brain: Brain,
    ShieldCheck: ShieldCheck,
    Dna: Dna,
    CloudRain: CloudRain,
    TrendingUp: TrendingUp
  };

  return (
    <section id="quantum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C4DFF]/15 border border-[#7C4DFF]/30 text-[#7C4DFF] text-xs font-['Orbitron'] font-semibold tracking-wider">
            <Atom className="w-3.5 h-3.5" />
            Module 02: Quantum Architecture
          </div>
          <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Quantum Microprocessor Systems (QPU)
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            {QUANTUM_DATA.working.summary}
          </p>

          {/* Module Navigation Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 mt-4 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab("bloch")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-['Orbitron'] transition-all ${
                activeTab === "bloch"
                  ? "bg-[#7C4DFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              3D Bloch Sphere
            </button>
            <button
              onClick={() => setActiveTab("chip3d")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-['Orbitron'] transition-all ${
                activeTab === "chip3d"
                  ? "bg-[#7C4DFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              3D QPU Cryostat
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-['Orbitron'] transition-all ${
                activeTab === "pipeline"
                  ? "bg-[#7C4DFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Working Pipeline (Slide 5)
            </button>
            <button
              onClick={() => setActiveTab("proscons")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-['Orbitron'] transition-all ${
                activeTab === "proscons"
                  ? "bg-[#7C4DFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Advantages & Limitations (Slide 7)
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === "bloch" && <BlochSphere3D />}

        {activeTab === "chip3d" && (
          <QuantumChip3D
            layers={QUANTUM_DATA.layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
          />
        )}

        {activeTab === "pipeline" && <QuantumPipeline />}

        {activeTab === "proscons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Advantages Card (Slide 7) */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#22C55E]/30 relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                </div>
                <div>
                  <h3 className="font-['Orbitron'] text-lg font-bold text-white">
                    Advantages of Quantum Microprocessor
                  </h3>
                  <span className="text-xs text-[#22C55E] font-mono font-semibold">
                    Reference PPT • Slide 7
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {QUANTUM_DATA.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#F8FAFC]">
                    <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages Card (Slide 7) */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#EF4444]/30 relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="font-['Orbitron'] text-lg font-bold text-white">
                    Disadvantages of Quantum Microprocessor
                  </h3>
                  <span className="text-xs text-[#EF4444] font-mono font-semibold">
                    Reference PPT • Slide 7
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {QUANTUM_DATA.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#F8FAFC]">
                    <span className="w-5 h-5 rounded-full bg-[#EF4444]/20 text-[#EF4444] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Applications of Quantum Microprocessors (Slide 6) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-['Orbitron'] text-xl font-bold text-white">
                Applications of Quantum Microprocessor
              </h3>
              <p className="text-xs text-[#94A3B8] font-mono">
                From Reference PPT • Slide 6 (5 Quantum Computing Frontiers)
              </p>
            </div>
            <span className="text-xs font-mono text-[#7C4DFF]">5 Frontiers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUANTUM_DATA.applications.map((app) => {
              const IconComp = iconMap[app.icon] || Atom;
              return (
                <div
                  key={app.id}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#7C4DFF]/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#7C4DFF]/10 border border-[#7C4DFF]/30 flex items-center justify-center mb-3 group-hover:bg-[#7C4DFF] transition-all">
                    <IconComp className="w-4 h-4 text-[#7C4DFF] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-['Orbitron'] text-sm font-bold text-white mb-1">
                    {app.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
