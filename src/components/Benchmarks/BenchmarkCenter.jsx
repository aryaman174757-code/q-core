import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import { BENCHMARK_PROBLEMS } from "../../data/benchmarkData";
import { sound } from "../../utils/audioEffects";
import { Activity, Zap, Server, Cpu, Atom, Clock, HelpCircle } from "lucide-react";

export default function BenchmarkCenter() {
  const [selectedProblemId, setSelectedProblemId] = useState("crypto");
  const [activeMetric, setActiveMetric] = useState("time"); // 'time' | 'power' | 'parallel'

  const currentProblem = BENCHMARK_PROBLEMS.find((p) => p.id === selectedProblemId) || BENCHMARK_PROBLEMS[0];

  const handleSelectProblem = (id) => {
    sound.playClick();
    setSelectedProblemId(id);
  };

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#050B18]/95 border border-white/20 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
          <p className="text-white font-bold mb-1">{`Dataset / Input Size: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${
                activeMetric === "time"
                  ? entry.value >= 1000
                    ? `${entry.value.toExponential(2)} s`
                    : `${entry.value} s`
                  : `${entry.value} Watts`
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="benchmarks" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-['Orbitron'] font-semibold tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Performance Simulation Center
          </div>
          <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Computational Complexity & Benchmarks
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Directly test theoretical speedups: compare classical polynomial/exponential slowdown against quantum polynomial algorithms (Shor's, Grover's, VQE).
          </p>
        </div>

        {/* Problem Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {BENCHMARK_PROBLEMS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-['Orbitron'] font-bold transition-all ${
                selectedProblemId === p.id
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                  : "bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Benchmark Dashboard Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 space-y-8">
          {/* Active Problem Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-white/10 pb-6">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7C4DFF]/20 text-[#7C4DFF] font-mono text-xs font-bold border border-[#7C4DFF]/40">
                  {currentProblem.speedupType}
                </span>
                <h3 className="font-['Orbitron'] text-xl font-bold text-white">
                  {currentProblem.name}
                </h3>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {currentProblem.description} {currentProblem.realWorldImpact}
              </p>
            </div>

            {/* Complexity Badges */}
            <div className="md:col-span-4 space-y-2 bg-[#050B18]/70 p-4 rounded-2xl border border-white/10 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Classical:
                </span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded">
                  {currentProblem.classicalAlgo}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7C4DFF] font-bold flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5" />
                  Quantum:
                </span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded">
                  {currentProblem.quantumAlgo}
                </span>
              </div>
            </div>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("time");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeMetric === "time"
                    ? "bg-[#00E5FF] text-black"
                    : "bg-white/5 text-[#94A3B8] hover:text-white"
                }`}
              >
                Execution Time (Seconds)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("power");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeMetric === "power"
                    ? "bg-[#F59E0B] text-black"
                    : "bg-white/5 text-[#94A3B8] hover:text-white"
                }`}
              >
                Power Consumption (Watts)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("parallel");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeMetric === "parallel"
                    ? "bg-[#7C4DFF] text-white"
                    : "bg-white/5 text-[#94A3B8] hover:text-white"
                }`}
              >
                Parallelism Model
              </button>
            </div>

            <span className="text-xs font-mono text-[#94A3B8]">
              Interactive Recharts Engine • 60 FPS
            </span>
          </div>

          {/* Visualization Body */}
          {activeMetric === "time" && (
            <div className="h-[360px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProblem.dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="size" stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <YAxis stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="classicalTime" name="Classical CPU Time (s)" fill="#00E5FF" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="quantumTime" name="Quantum QPU Time (s)" fill="#7C4DFF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeMetric === "power" && (
            <div className="h-[360px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProblem.dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="size" stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <YAxis stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="classicalPower" name="Classical Server Cluster (Watts)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="quantumPower" name="Quantum Dilution Cryo (Watts)" fill="#22C55E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeMetric === "parallel" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#050B18]/80 border border-white/10 items-center">
              {/* Classical Von Neumann Parallelism */}
              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-['Orbitron'] font-bold text-[#00E5FF]">
                  <Cpu className="w-4 h-4" />
                  <span>Sequential / Multi-Core Classical Model</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Classical computers run threads across discrete CPU cores. Even with 128 cores, each core calculates 1 state at a time sequentially.
                </p>
                <div className="font-mono text-xs text-white bg-black/40 p-3 rounded-lg border border-white/5">
                  States Explored = Cores × Clock Frequency (Linear Scaling)
                </div>
              </div>

              {/* Quantum Hilbert Space Parallelism */}
              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-[#7C4DFF]/40 glow-purple">
                <div className="flex items-center gap-2 text-xs font-['Orbitron'] font-bold text-[#7C4DFF]">
                  <Atom className="w-4 h-4" />
                  <span>Inherent Quantum Superposition Model</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Quantum processors do not just run fast—they operate in a 2^N dimensional Hilbert state space simultaneously. A 50-qubit processor calculates 1.12 quadrillion states at once.
                </p>
                <div className="font-mono text-xs text-white bg-black/40 p-3 rounded-lg border border-white/5">
                  States Explored = 2^N Simultaneous Amplitudes (Exponential)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
