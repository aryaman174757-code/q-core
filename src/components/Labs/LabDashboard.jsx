import React, { useState } from "react";
import { Cpu, Atom, Layers, ThermometerSnowflake, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Lab1_CPUExecution from "./Lab1_CPUExecution";
import Lab2_QubitState from "./Lab2_QubitState";
import Lab3_CircuitBuilder from "./Lab3_CircuitBuilder";
import Lab4_CryoChamber from "./Lab4_CryoChamber";
import { sound } from "../../utils/audioEffects";

export default function LabDashboard({ completedLabs = {}, onLabComplete }) {
  const [activeLabId, setActiveLabId] = useState("lab1");

  const labCards = [
    {
      id: "lab1",
      number: "01",
      title: "CPU Execution Lab",
      subtitle: "Bitwise ALU & Von Neumann Execution",
      icon: Cpu,
      color: "#00E5FF",
      accent: "from-[#00E5FF]/20 to-[#38BDF8]/10",
      description: "Control registers R1 & R2, execute ADD/SUB/AND/OR/XOR micro-operations, and inspect status flags."
    },
    {
      id: "lab2",
      number: "02",
      title: "Qubit State Lab",
      subtitle: "IBM Composer & Superposition",
      icon: Atom,
      color: "#7C4DFF",
      accent: "from-[#7C4DFF]/20 to-[#A855F7]/10",
      description: "Manipulate theta/phi polar coordinates, fire unitary Hadamard pulses, and sample 1,024-shot measurement collapse."
    },
    {
      id: "lab3",
      number: "03",
      title: "Quantum Circuit Builder",
      subtitle: "Gate Array & Bell State Synthesizer",
      icon: Layers,
      color: "#EC4899",
      accent: "from-[#EC4899]/20 to-[#7C4DFF]/10",
      description: "Place quantum gates (H, X, Y, Z, CNOT, Measure) on multi-qubit wires and simulate Hilbert state vectors."
    },
    {
      id: "lab4",
      number: "04",
      title: "Cryogenic Cooling Simulator",
      subtitle: "Sub-Kelvin Thermal Management",
      icon: ThermometerSnowflake,
      color: "#38BDF8",
      accent: "from-[#38BDF8]/20 to-[#00E5FF]/10",
      description: "Explore why quantum computing requires ~15 mK dilution refrigerators. Watch qubits decohere at 300 K."
    }
  ];

  const handleSelectLab = (id) => {
    sound.playClick();
    setActiveLabId(id);
  };

  return (
    <section id="labs" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Flagship Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#00E5FF]/15 to-[#7C4DFF]/15 border border-[#00E5FF]/30 text-white text-xs font-['Orbitron'] font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            Flagship Interactive Environment
          </div>
          <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Virtual Laboratories
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Hands-on engineering simulation suites designed to bridge textbook computer architecture concepts with experimental quantum physics.
          </p>
        </div>

        {/* 4 Laboratory Selection Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {labCards.map((lab) => {
            const isSelected = activeLabId === lab.id;
            const isCompleted = completedLabs[lab.id];
            const Icon = lab.icon;

            return (
              <button
                key={lab.id}
                onClick={() => handleSelectLab(lab.id)}
                className={`p-5 rounded-3xl text-left glass-panel transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                  isSelected
                    ? `border-[${lab.color}] shadow-[0_0_25px_rgba(0,229,255,0.25)] bg-[#0F172A] scale-[1.02]`
                    : "hover:border-white/20 hover:bg-white/5 opacity-85 hover:opacity-100"
                }`}
                style={{
                  borderColor: isSelected ? lab.color : undefined
                }}
              >
                {/* Ambient Top Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none bg-gradient-to-br ${lab.accent}`}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#94A3B8]">
                      LAB {lab.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#94A3B8] px-2 py-0.5 rounded-full bg-white/5">
                        Interactive
                      </span>
                    )}
                  </div>

                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${lab.color}20`, border: `1px solid ${lab.color}50` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: lab.color }} />
                  </div>

                  <div>
                    <h3 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#00E5FF] transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#38BDF8] mt-0.5">
                      {lab.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold" style={{ color: lab.color }}>
                  <span>{isSelected ? "Active Suite" : "Launch Lab"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lab Display Chamber */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden">
          {activeLabId === "lab1" && <Lab1_CPUExecution onLabComplete={onLabComplete} />}
          {activeLabId === "lab2" && <Lab2_QubitState onLabComplete={onLabComplete} />}
          {activeLabId === "lab3" && <Lab3_CircuitBuilder onLabComplete={onLabComplete} />}
          {activeLabId === "lab4" && <Lab4_CryoChamber onLabComplete={onLabComplete} />}
        </div>
      </div>
    </section>
  );
}
