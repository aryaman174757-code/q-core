import React, { useState } from "react";
import { sound } from "../../utils/audioEffects";
import { Layers, Cpu, Atom, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

export default function Level3_InteractiveBuild({ onComplete }) {
  // Challenge 1: Order the Classical CPU Cycle (Slide 2: Fetch, Decode, Execute, Store)
  const [cpuSlots, setCpuSlots] = useState([null, null, null, null]);
  const [availableCpuSteps, setAvailableCpuSteps] = useState(["Execute", "Store", "Fetch", "Decode"]);
  const [cpuSuccess, setCpuSuccess] = useState(false);

  // Challenge 2: Synthesize a Bell State (|00⟩ + |11⟩)/√2
  const [quantumQ0Gate, setQuantumQ0Gate] = useState(null); // needs "H"
  const [quantumCoupler, setQuantumCoupler] = useState(false); // needs CNOT
  const [quantumSuccess, setQuantumSuccess] = useState(false);

  // CPU Cycle slotting
  const handlePickStep = (step) => {
    sound.playClick();
    const firstEmpty = cpuSlots.indexOf(null);
    if (firstEmpty !== -1) {
      const nextSlots = [...cpuSlots];
      nextSlots[firstEmpty] = step;
      setCpuSlots(nextSlots);
      setAvailableCpuSteps(prev => prev.filter(s => s !== step));

      // If full, check correctness
      if (nextSlots.every(s => s !== null)) {
        if (
          nextSlots[0] === "Fetch" &&
          nextSlots[1] === "Decode" &&
          nextSlots[2] === "Execute" &&
          nextSlots[3] === "Store"
        ) {
          sound.playSuccess();
          setCpuSuccess(true);
        } else {
          sound.playError();
        }
      }
    }
  };

  const handleClearCpuSlot = (idx) => {
    const step = cpuSlots[idx];
    if (!step) return;
    sound.playClick();
    const nextSlots = [...cpuSlots];
    nextSlots[idx] = null;
    setCpuSlots(nextSlots);
    setAvailableCpuSteps(prev => [...prev, step]);
    setCpuSuccess(false);
  };

  // Quantum Circuit Verification
  const verifyQuantumCircuit = () => {
    if (quantumQ0Gate === "H" && quantumCoupler) {
      sound.playSuccess();
      setQuantumSuccess(true);
    } else {
      sound.playError();
    }
  };

  const isBothComplete = cpuSuccess && quantumSuccess;

  return (
    <div className="space-y-8">
      {/* Challenge 1: Assemble Classical CPU Instruction Cycle */}
      <div className="p-6 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00E5FF]" />
            <h4 className="font-['Orbitron'] text-sm sm:text-base font-bold text-white">
              Task 1: Sequence the Classical Instruction Cycle
            </h4>
          </div>
          {cpuSuccess && (
            <span className="flex items-center gap-1 text-xs font-mono text-[#22C55E]">
              <CheckCircle2 className="w-4 h-4" />
              Verified (Slide 2)
            </span>
          )}
        </div>

        <p className="text-xs text-[#94A3B8]">
          Click the steps in sequential order according to the von Neumann architecture:
        </p>

        {/* 4 Ordered Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["1. Fetch", "2. Decode", "3. Execute", "4. Store"].map((label, idx) => (
            <div
              key={idx}
              onClick={() => handleClearCpuSlot(idx)}
              className={`p-3.5 rounded-xl border text-center font-mono cursor-pointer transition-all ${
                cpuSlots[idx]
                  ? cpuSuccess
                    ? "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E] font-bold"
                    : "bg-[#00E5FF]/20 border-[#00E5FF] text-white font-bold"
                  : "bg-white/5 border-dashed border-white/20 text-[#94A3B8]"
              }`}
            >
              <span className="text-[10px] text-[#94A3B8] block mb-1">{label}</span>
              <span className="text-sm font-bold">{cpuSlots[idx] || "(Click step)"}</span>
            </div>
          ))}
        </div>

        {/* Available Scrambled Steps */}
        {availableCpuSteps.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-xs font-mono text-[#94A3B8] self-center">Available:</span>
            {availableCpuSteps.map((step) => (
              <button
                key={step}
                onClick={() => handlePickStep(step)}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:border-[#00E5FF] text-white font-mono text-xs font-bold"
              >
                + {step}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Challenge 2: Synthesize Quantum Bell State */}
      <div className="p-6 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-[#7C4DFF]" />
            <h4 className="font-['Orbitron'] text-sm sm:text-base font-bold text-white">
              Task 2: Build a Quantum Bell State Circuit
            </h4>
          </div>
          {quantumSuccess && (
            <span className="flex items-center gap-1 text-xs font-mono text-[#7C4DFF]">
              <CheckCircle2 className="w-4 h-4" />
              Bell State (|00⟩ + |11⟩)/√2 Synthesized
            </span>
          )}
        </div>

        <p className="text-xs text-[#94A3B8]">
          Target State: <strong className="text-white font-mono">(|00⟩ + |11⟩) / √2</strong>. Place a Hadamard gate on q[0] and couple it to q[1] with a CNOT gate:
        </p>

        {/* Mini Circuit Construction */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-4 font-mono text-xs">
          {/* Wire q0 */}
          <div className="flex items-center gap-3">
            <span className="w-12 text-[#00E5FF] font-bold">q[0]: |0⟩</span>
            <div className="flex-1 flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setQuantumQ0Gate(prev => (prev === "H" ? null : "H"));
                  setQuantumSuccess(false);
                }}
                className={`w-12 h-10 rounded-lg border font-bold flex items-center justify-center transition-all ${
                  quantumQ0Gate === "H"
                    ? "bg-[#7C4DFF] border-white text-white shadow-md"
                    : "bg-white/5 border-dashed border-white/30 text-gray-400 hover:border-[#7C4DFF]"
                }`}
              >
                {quantumQ0Gate || "Gate?"}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setQuantumCoupler(!quantumCoupler);
                  setQuantumSuccess(false);
                }}
                className={`px-3 h-10 rounded-lg border font-bold transition-all ${
                  quantumCoupler
                    ? "bg-[#EC4899] border-white text-white shadow-md"
                    : "bg-white/5 border-dashed border-white/30 text-gray-400 hover:border-[#EC4899]"
                }`}
              >
                {quantumCoupler ? "● CNOT Control" : "+ Link CNOT"}
              </button>
            </div>
          </div>

          {/* Wire q1 */}
          <div className="flex items-center gap-3">
            <span className="w-12 text-[#7C4DFF] font-bold">q[1]: |0⟩</span>
            <div className="flex-1 flex items-center gap-2">
              <div className="w-12 h-10 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-gray-500">
                —
              </div>
              <div
                className={`px-3 h-10 rounded-lg border font-bold flex items-center justify-center ${
                  quantumCoupler
                    ? "bg-[#EC4899]/30 border-[#EC4899] text-white"
                    : "bg-white/5 border-dashed border-white/10 text-gray-500"
                }`}
              >
                {quantumCoupler ? "⊕ Target" : "No Gate"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-mono text-[#94A3B8]">
            State: {quantumSuccess ? "(|00⟩ + |11⟩) / √2" : "|00⟩ (Ground)"}
          </span>
          <button
            onClick={verifyQuantumCircuit}
            className="px-4 py-2 rounded-xl bg-[#7C4DFF] text-white font-bold font-mono text-xs hover:bg-[#9333EA] transition-all"
          >
            Verify Quantum Output
          </button>
        </div>
      </div>

      {/* Completion Trigger */}
      {isBothComplete && (
        <div className="p-5 rounded-2xl bg-[#22C55E]/20 border border-[#22C55E] text-center space-y-3">
          <h4 className="font-['Orbitron'] font-black text-lg text-white">
            🎉 Level 3 Master Builder Completed!
          </h4>
          <p className="text-xs text-white/90">
            You have successfully sequenced both the classical instruction pipeline and a quantum entangled circuit.
          </p>
          <button
            onClick={() => {
              sound.playSuccess();
              onComplete({
                level: 3,
                score: 100,
                total: 100,
                accuracy: 100
              });
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-black text-xs font-['Orbitron'] uppercase tracking-wider shadow-lg glow-cyan"
          >
            Claim Certificate & Final Score
          </button>
        </div>
      )}
    </div>
  );
}
