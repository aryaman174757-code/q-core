import React, { useState } from "react";
import { Play, RotateCcw, Sparkles, CheckCircle2, Zap, HelpCircle, Layers } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Lab3_CircuitBuilder({ onLabComplete }) {
  // 2-Qubit, 4-Step grid
  const [circuit, setCircuit] = useState([
    ["H", null, null, "M"], // q0
    [null, "CNOT_TARGET", null, "M"]  // q1 (CNOT target coupled with q0 step 1)
  ]);
  const [selectedGate, setSelectedGate] = useState("H");
  const [isRunning, setIsRunning] = useState(false);
  const [activePlayhead, setActivePlayhead] = useState(-1);
  const [simResults, setSimResults] = useState(null);

  const availableGates = [
    { id: "H", label: "H", name: "Hadamard", color: "#7C4DFF", desc: "Creates equal superposition" },
    { id: "X", label: "X", name: "Pauli-X", color: "#00E5FF", desc: "Quantum NOT / Bit Flip" },
    { id: "Y", label: "Y", name: "Pauli-Y", color: "#22C55E", desc: "Bit & Phase Flip" },
    { id: "Z", label: "Z", name: "Pauli-Z", color: "#F59E0B", desc: "Phase Flip (|1⟩ → -|1⟩)" },
    { id: "CNOT", label: "CX", name: "CNOT", color: "#EC4899", desc: "Entangles control & target" },
    { id: "M", label: "M", name: "Measure", color: "#64748B", desc: "Projects into classical bit" }
  ];

  const handleSlotClick = (qubitIdx, stepIdx) => {
    sound.playClick();
    const next = circuit.map((row) => [...row]);

    if (selectedGate === "CNOT") {
      // CNOT connects q0 (control) and q1 (target)
      next[0][stepIdx] = "CNOT_CONTROL";
      next[1][stepIdx] = "CNOT_TARGET";
    } else {
      // Toggle or set
      if (next[qubitIdx][stepIdx] === selectedGate) {
        next[qubitIdx][stepIdx] = null;
      } else {
        next[qubitIdx][stepIdx] = selectedGate;
      }
    }
    setCircuit(next);
    setSimResults(null);
  };

  const loadPreset = (presetName) => {
    sound.playClick();
    if (presetName === "bell") {
      setCircuit([
        ["H", "CNOT_CONTROL", null, "M"],
        [null, "CNOT_TARGET", null, "M"]
      ]);
    } else if (presetName === "superposition") {
      setCircuit([
        ["H", null, null, "M"],
        ["H", null, null, "M"]
      ]);
    } else if (presetName === "x_flip") {
      setCircuit([
        ["X", null, null, "M"],
        [null, null, null, "M"]
      ]);
    }
    setSimResults(null);
  };

  const handleReset = () => {
    sound.playClick();
    setCircuit([
      [null, null, null, null],
      [null, null, null, null]
    ]);
    setSimResults(null);
  };

  // Run simulation & evaluate state
  const runCircuit = () => {
    sound.playQuantumBeep();
    setIsRunning(true);
    setActivePlayhead(0);
    setSimResults(null);

    // Animate playhead step-by-step through 4 slots
    const steps = [0, 1, 2, 3];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActivePlayhead(step);
        sound.playClick();
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsRunning(false);
      setActivePlayhead(-1);
      sound.playSuccess();

      // Compute outcomes based on circuit
      const q0HasH = circuit[0].includes("H");
      const q0HasX = circuit[0].includes("X");
      const hasCNOT = circuit[0].includes("CNOT_CONTROL") && circuit[1].includes("CNOT_TARGET");

      let finalState = "|00⟩";
      let probabilities = [
        { basis: "|00⟩", prob: 1.0 },
        { basis: "|01⟩", prob: 0.0 },
        { basis: "|10⟩", prob: 0.0 },
        { basis: "|11⟩", prob: 0.0 }
      ];
      let isEntangled = false;
      let depth = 0;

      // Calculate depth
      for (let s = 0; s < 4; s++) {
        if (circuit[0][s] || circuit[1][s]) depth++;
      }

      if (q0HasH && hasCNOT) {
        // Bell State
        finalState = "(|00⟩ + |11⟩) / √2";
        probabilities = [
          { basis: "|00⟩", prob: 0.5 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 0.0 },
          { basis: "|11⟩", prob: 0.5 }
        ];
        isEntangled = true;
      } else if (q0HasH && !hasCNOT) {
        finalState = "(|00⟩ + |10⟩) / √2";
        probabilities = [
          { basis: "|00⟩", prob: 0.5 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 0.5 },
          { basis: "|11⟩", prob: 0.0 }
        ];
      } else if (q0HasX && !hasCNOT) {
        finalState = "|10⟩";
        probabilities = [
          { basis: "|00⟩", prob: 0.0 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 1.0 },
          { basis: "|11⟩", prob: 0.0 }
        ];
      }

      setSimResults({
        finalState,
        probabilities,
        isEntangled,
        depth: Math.max(1, depth)
      });

      if (onLabComplete) onLabComplete("lab3");
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7C4DFF]" />
            Lab 03: Interactive Quantum Circuit Builder
          </h3>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Drag-and-Place Unitary Gate Array, Multi-Qubit Entanglement & State Evaluator
          </p>
        </div>

        {/* Presets & Run Action */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPreset("bell")}
            className="px-3 py-1.5 rounded-lg bg-[#EC4899]/20 border border-[#EC4899]/40 text-white text-xs font-mono font-bold hover:bg-[#EC4899]"
          >
            Preset: Bell State
          </button>
          <button
            onClick={() => loadPreset("superposition")}
            className="px-3 py-1.5 rounded-lg bg-[#7C4DFF]/20 border border-[#7C4DFF]/40 text-white text-xs font-mono font-bold hover:bg-[#7C4DFF]"
          >
            Preset: Superposition
          </button>

          <button
            onClick={runCircuit}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-bold font-['Orbitron'] text-xs flex items-center gap-1.5 shadow-lg glow-cyan active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Simulating Waves..." : "Run Quantum Circuit"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white"
            title="Clear Circuit"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gate Selector Palette */}
      <div className="p-4 rounded-2xl bg-[#050B18]/80 border border-white/10 space-y-2">
        <span className="text-xs font-['Orbitron'] font-bold text-white uppercase tracking-wider block">
          Quantum Gate Palette (Click to select gate, then click slot to place):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {availableGates.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                sound.playClick();
                setSelectedGate(g.id);
              }}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                selectedGate === g.id
                  ? "bg-white text-black font-bold scale-105 shadow-md border-white"
                  : "bg-[#0F172A] border-white/10 text-white hover:border-[#00E5FF]"
              }`}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs mb-1"
                style={{
                  backgroundColor: selectedGate === g.id ? "#050B18" : g.color,
                  color: selectedGate === g.id ? g.color : "#FFFFFF"
                }}
              >
                {g.label}
              </span>
              <span className="text-[11px] font-semibold">{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Grid Canvas */}
      <div className="p-6 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-6 relative overflow-hidden">
        {/* Playhead Laser Pulse Line */}
        {isRunning && activePlayhead >= 0 && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] transition-all duration-300 pointer-events-none z-20"
            style={{ left: `${(activePlayhead + 1.2) * 20}%` }}
          />
        )}

        {/* Qubit Wire 0 */}
        <div className="flex items-center gap-4">
          <div className="w-16 font-mono text-sm font-bold text-[#00E5FF] flex items-center gap-1.5 shrink-0">
            <span>q[0]:</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-white">|0⟩</span>
          </div>

          <div className="flex-1 relative flex items-center justify-between py-4">
            {/* Wire Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2" />

            {/* 4 Time Slots */}
            {[0, 1, 2, 3].map((slotIdx) => {
              const gate = circuit[0][slotIdx];
              return (
                <div
                  key={`q0-slot-${slotIdx}`}
                  onClick={() => handleSlotClick(0, slotIdx)}
                  className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    gate
                      ? "bg-[#7C4DFF] border-white text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(124,77,255,0.4)] scale-105"
                      : "bg-[#0F172A] border-dashed border-white/30 hover:border-[#00E5FF] hover:bg-white/5"
                  }`}
                >
                  {gate === "CNOT_CONTROL" ? (
                    <div className="w-3 h-3 rounded-full bg-[#EC4899] border-2 border-white" />
                  ) : (
                    gate || "+"
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CNOT Entanglement Linking Line */}
        {circuit[0].some((g, i) => g === "CNOT_CONTROL" && circuit[1][i] === "CNOT_TARGET") && (
          <div className="relative h-4 pointer-events-none">
            <div className="absolute left-[40%] top-[-10px] bottom-[-10px] w-0.5 bg-[#EC4899] shadow-[0_0_10px_#EC4899]" />
          </div>
        )}

        {/* Qubit Wire 1 */}
        <div className="flex items-center gap-4">
          <div className="w-16 font-mono text-sm font-bold text-[#7C4DFF] flex items-center gap-1.5 shrink-0">
            <span>q[1]:</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-white">|0⟩</span>
          </div>

          <div className="flex-1 relative flex items-center justify-between py-4">
            {/* Wire Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2" />

            {/* 4 Time Slots */}
            {[0, 1, 2, 3].map((slotIdx) => {
              const gate = circuit[1][slotIdx];
              return (
                <div
                  key={`q1-slot-${slotIdx}`}
                  onClick={() => handleSlotClick(1, slotIdx)}
                  className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    gate
                      ? "bg-[#00E5FF] border-white text-black font-mono font-bold text-sm shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                      : "bg-[#0F172A] border-dashed border-white/30 hover:border-[#7C4DFF] hover:bg-white/5"
                  }`}
                >
                  {gate === "CNOT_TARGET" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                      ⊕
                    </div>
                  ) : (
                    gate || "+"
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output Simulation Results Dashboard */}
      {simResults && (
        <div className="p-5 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-['Orbitron'] font-bold text-white uppercase tracking-wider block">
                Circuit Execution Telemetry
              </span>
              <span className="text-xs font-mono text-[#00E5FF]">
                Final State Vector: {simResults.finalState}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white">
                Circuit Depth: {simResults.depth}
              </span>
              {simResults.isEntangled && (
                <span className="px-2.5 py-0.5 rounded bg-[#EC4899]/20 border border-[#EC4899]/40 text-xs font-mono font-bold text-[#EC4899] animate-pulse">
                  Entangled Bell Pair
                </span>
              )}
            </div>
          </div>

          {/* Basis State Probability Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {simResults.probabilities.map((item) => (
              <div key={item.basis} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">{item.basis}</span>
                  <span className="text-[#00E5FF]">{(item.prob * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] transition-all duration-500"
                    style={{ width: `${item.prob * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
