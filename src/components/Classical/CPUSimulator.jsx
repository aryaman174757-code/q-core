import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, FastForward, CheckCircle2, ArrowDown, Cpu, Database, Binary, Activity } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function CPUSimulator() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Fetch, 2: Decode, 3: Execute, 4: Store
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [clockSpeed, setClockSpeed] = useState(1200); // ms per step

  // Operands from the prompt: 1010 (10) and 1100 (12), Operation: ADD
  const program = {
    instruction: "ADD R1, R2",
    op1Binary: "1010",
    op1Dec: 10,
    op2Binary: "1100",
    op2Dec: 12,
    resultBinary: "10110",
    resultDec: 22
  };

  const steps = [
    {
      id: 1,
      name: "Fetch",
      unit: "Memory & Program Counter",
      description: "Fetches the binary instruction (ADD R1, R2) and operands from memory address 0x04 into the Instruction Register.",
      activeComponent: "memory"
    },
    {
      id: 2,
      name: "Decode",
      unit: "Control Unit (CU)",
      description: "The Control Unit decodes the opcode bits 'ADD', sets the ALU control lines, and routes operands from R1 & R2.",
      activeComponent: "cu"
    },
    {
      id: 3,
      name: "Execute",
      unit: "Arithmetic Logic Unit (ALU)",
      description: "The ALU calculates: 1010 + 1100 = 10110 (Decimal: 10 + 12 = 22). Carry flags and zero flags are updated.",
      activeComponent: "alu"
    },
    {
      id: 4,
      name: "Store",
      unit: "Registers & Memory",
      description: "The computation result 10110 (22) is written back into Register R1 (Accumulator). PC increments to next instruction.",
      activeComponent: "registers"
    }
  ];

  // Auto-run loop
  useEffect(() => {
    let timer;
    if (isAutoRunning) {
      timer = setTimeout(() => {
        if (currentStep < 4) {
          handleStep(currentStep + 1);
        } else {
          handleStep(1); // loop continuous cycle as stated in Slide 2
        }
      }, clockSpeed);
    }
    return () => clearTimeout(timer);
  }, [isAutoRunning, currentStep, clockSpeed]);

  const handleStep = (stepNum) => {
    sound.playClick();
    setCurrentStep(stepNum);
    if (stepNum === 3) sound.playQuantumBeep();
    if (stepNum === 4) sound.playSuccess();
  };

  const handleReset = () => {
    sound.playClick();
    setIsAutoRunning(false);
    setCurrentStep(0);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <h3 className="font-['Orbitron'] text-xl font-bold text-white">
              Classical Von Neumann Cycle Simulator
            </h3>
          </div>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Slide 2 Academic Pipeline: Fetch → Decode → Execute → Store
          </p>
        </div>

        {/* Step Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStep(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 1
                ? "bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                : "bg-white/5 border border-white/10 text-white hover:border-[#00E5FF]"
            }`}
          >
            1. Fetch
          </button>
          <button
            onClick={() => handleStep(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 2
                ? "bg-[#38BDF8] text-black shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                : "bg-white/5 border border-white/10 text-white hover:border-[#38BDF8]"
            }`}
          >
            2. Decode
          </button>
          <button
            onClick={() => handleStep(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 3
                ? "bg-[#22C55E] text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                : "bg-white/5 border border-white/10 text-white hover:border-[#22C55E]"
            }`}
          >
            3. Execute
          </button>
          <button
            onClick={() => handleStep(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 4
                ? "bg-[#F59E0B] text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "bg-white/5 border border-white/10 text-white hover:border-[#F59E0B]"
            }`}
          >
            4. Store
          </button>

          <button
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isAutoRunning
                ? "bg-[#EF4444] text-white"
                : "bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black"
            }`}
          >
            {isAutoRunning ? <Activity className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isAutoRunning ? "Pause Clock" : "Auto Clock"}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white"
            title="Reset Simulator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hardware Data Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch relative">
        {/* 1. Memory Panel */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 1
              ? "bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)] scale-[1.02]"
              : "bg-[#050B18]/60 border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#00E5FF] mb-2">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                RAM Memory
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5">0x04</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#94A3B8]">Address: [0x04]</div>
              <div className="text-white font-bold tracking-wider">Instruction: ADD</div>
              <div className="text-[#00E5FF] flex justify-between">
                <span>Operand 1:</span>
                <span className="font-bold">{program.op1Binary} ({program.op1Dec})</span>
              </div>
              <div className="text-[#38BDF8] flex justify-between">
                <span>Operand 2:</span>
                <span className="font-bold">{program.op2Binary} ({program.op2Dec})</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[#94A3B8]">
            Status: {currentStep === 1 ? "Emitting opcode onto Bus..." : "Standing By"}
          </div>
        </div>

        {/* 2. Control Unit (CU) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 2
              ? "bg-[#38BDF8]/10 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-[1.02]"
              : "bg-[#050B18]/60 border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#38BDF8] mb-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Control Unit (CU)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5">Decoded</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#94A3B8]">Opcode: 0x01 (ADD)</div>
              <div className="text-white">Src1: R1 (1010)</div>
              <div className="text-white">Src2: R2 (1100)</div>
              <div className="text-[#22C55E] font-bold">ALU Gate: ENABLED</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[#94A3B8]">
            Status: {currentStep === 2 ? "Generating control clock pulse..." : "Idle"}
          </div>
        </div>

        {/* 3. Arithmetic Logic Unit (ALU) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 3
              ? "bg-[#22C55E]/10 border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-[1.02]"
              : "bg-[#050B18]/60 border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#22C55E] mb-2">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5" />
                ALU Core
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5">Execute</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#94A3B8]">Operation: Binary ADD</div>
              <div className="text-white">  {program.op1Binary}  (10)</div>
              <div className="text-white">+ {program.op2Binary}  (12)</div>
              <div className="text-[#22C55E] font-bold border-t border-white/20 pt-1">
                = {currentStep >= 3 ? `${program.resultBinary} (${program.resultDec})` : "----"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[#94A3B8]">
            Status: {currentStep === 3 ? "Sum calculated. Flags set." : "Waiting for operands"}
          </div>
        </div>

        {/* 4. Registers (Store) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 4
              ? "bg-[#F59E0B]/10 border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]"
              : "bg-[#050B18]/60 border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#F59E0B] mb-2">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                CPU Registers
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5">R1 / ACC</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#94A3B8]">Register R1 (Accumulator):</div>
              <div className="text-xl font-bold text-[#F59E0B] tracking-wider py-1">
                {currentStep === 4 ? program.resultBinary : program.op1Binary}
              </div>
              <div className="text-[11px] text-white">
                Decimal Value: {currentStep === 4 ? program.resultDec : program.op1Dec}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[#94A3B8]">
            Status: {currentStep === 4 ? "Stored! Cycle complete." : "Cached"}
          </div>
        </div>
      </div>

      {/* Active Phase Explanation Box */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-['Orbitron'] font-bold text-[#00E5FF] uppercase">
              Current Cycle Step:
            </span>
            <span className="text-xs font-bold font-mono text-white">
              {currentStep === 0 ? "Simulator Idle — Click Fetch or Auto Clock" : steps[currentStep - 1]?.name}
            </span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            {currentStep === 0
              ? "Press '1. Fetch' or 'Auto Clock' to initiate continuous microcode execution."
              : steps[currentStep - 1]?.description}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
          <span>Clock:</span>
          <select
            value={clockSpeed}
            onChange={(e) => setClockSpeed(Number(e.target.value))}
            className="bg-[#050B18] border border-white/10 rounded px-2 py-1 text-white text-xs"
          >
            <option value={2000}>0.5 Hz (Slow)</option>
            <option value={1200}>1.0 Hz (Normal)</option>
            <option value={600}>2.0 Hz (Fast)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
