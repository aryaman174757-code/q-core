import React, { useState, useMemo } from "react";
import { ThermometerSnowflake, AlertTriangle, ShieldAlert, Zap, Activity, RotateCcw } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Lab4_CryoChamber({ onLabComplete }) {
  // Temperature in Kelvin: 0.015 K (15 mK) to 300 K
  const [temperature, setTemperature] = useState(0.015);
  const [noiseLevel, setNoiseLevel] = useState(5); // %
  const [coolingPower, setCoolingPower] = useState(90); // %
  const [magneticDisturbance, setMagneticDisturbance] = useState(2); // Gauss

  // Critical superconducting temperature for Niobium / Aluminum is around 1.2 K
  const isSuperconducting = temperature <= 1.2;

  // Calculate live telemetry metrics
  const metrics = useMemo(() => {
    // Effective thermal energy factor
    const tempFactor = Math.min(1, Math.log10(temperature / 0.015 + 1) / Math.log10(300 / 0.015 + 1));
    const noiseFactor = noiseLevel / 100;
    const coolingFactor = coolingPower / 100;
    const magFactor = magneticDisturbance / 100;

    // Stability: 100% down to 2%
    const stability = Math.max(
      1.5,
      (1 - tempFactor * 0.85 - noiseFactor * 0.1 - magFactor * 0.15) * (0.8 + 0.2 * coolingFactor) * 100
    );

    // Error Rate: 0.05% up to 98%
    const errorRate = Math.min(
      99.2,
      0.05 + tempFactor * 85 + noiseFactor * 8 + magFactor * 12
    );

    // Fidelity: 99.95% down to 12%
    const fidelity = Math.max(10.0, 100 - errorRate);

    // Decoherence T2: 120 microseconds down to 0.002 microseconds
    const t2 = Math.max(0.002, 120 * (1 - tempFactor * 0.999)).toFixed(2);

    return {
      stability: stability.toFixed(1),
      errorRate: errorRate.toFixed(2),
      fidelity: fidelity.toFixed(2),
      t2
    };
  }, [temperature, noiseLevel, coolingPower, magneticDisturbance]);

  const handleTempPreset = (kelvin) => {
    sound.playClick();
    setTemperature(kelvin);
    if (kelvin > 1.5) {
      sound.playError();
    } else {
      sound.playSuccess();
    }
    if (onLabComplete) onLabComplete("lab4");
  };

  const handleReset = () => {
    sound.playClick();
    setTemperature(0.015);
    setNoiseLevel(5);
    setCoolingPower(90);
    setMagneticDisturbance(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-white flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-[#00E5FF]" />
            Lab 04: Cryogenic Cooling & Sub-Kelvin Chamber Simulator
          </h3>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Why Quantum Computers Require ~15 mK (Slide 8: Operating Conditions)
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#94A3B8] hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to 15 mK</span>
        </button>
      </div>

      {/* Temperature Alert Banner */}
      {!isSuperconducting && (
        <div className="p-4 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center gap-3 text-sm text-[#EF4444] animate-pulse">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-['Orbitron'] font-bold block">
              CRITICAL DECOHERENCE EVENT (T &gt; 1.2 K)
            </span>
            <span className="text-xs text-white/90">
              Cooper pairs have broken apart. Superconductivity collapsed. Qubits have turned into noisy classical resistors!
            </span>
          </div>
        </div>
      )}

      {/* Controls & Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature Control */}
        <div className="p-4 rounded-2xl bg-[#050B18]/80 border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white font-bold">Chamber Temp:</span>
            <span className={temperature <= 0.02 ? "text-[#00E5FF] font-bold" : "text-[#EF4444] font-bold"}>
              {temperature < 1 ? `${(temperature * 1000).toFixed(0)} mK` : `${temperature.toFixed(1)} K`}
            </span>
          </div>
          <input
            type="range"
            min={0.015}
            max={300}
            step={0.5}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-[#00E5FF] h-2 bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono pt-1">
            <span>15 mK</span>
            <span>4 K (LHe)</span>
            <span>77 K (LN2)</span>
            <span>300 K</span>
          </div>
        </div>

        {/* Thermal Noise */}
        <div className="p-4 rounded-2xl bg-[#050B18]/80 border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white font-bold">Thermal Noise:</span>
            <span className="text-[#F59E0B] font-bold">{noiseLevel}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(Number(e.target.value))}
            className="w-full accent-[#F59E0B] h-2 bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-[#94A3B8] font-mono">
            Blackbody Johnson-Nyquist Noise
          </div>
        </div>

        {/* Cooling Power */}
        <div className="p-4 rounded-2xl bg-[#050B18]/80 border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white font-bold">Cooling Power:</span>
            <span className="text-[#22C55E] font-bold">{coolingPower}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={coolingPower}
            onChange={(e) => setCoolingPower(Number(e.target.value))}
            className="w-full accent-[#22C55E] h-2 bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-[#94A3B8] font-mono">
            He3/He4 Dilution Cycle Flow
          </div>
        </div>

        {/* Magnetic Disturbance */}
        <div className="p-4 rounded-2xl bg-[#050B18]/80 border border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white font-bold">EM Field Flux:</span>
            <span className="text-[#7C4DFF] font-bold">{magneticDisturbance} G</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={magneticDisturbance}
            onChange={(e) => setMagneticDisturbance(Number(e.target.value))}
            className="w-full accent-[#7C4DFF] h-2 bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-[#94A3B8] font-mono">
            Mu-Metal Shield Penetration
          </div>
        </div>
      </div>

      {/* Quick Scientific Milestones */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-[#94A3B8]">Scientific Milestones:</span>
        <button
          onClick={() => handleTempPreset(0.015)}
          className="px-2.5 py-1 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-bold hover:bg-[#00E5FF] hover:text-black transition-all"
        >
          15 mK (Operational QPU)
        </button>
        <button
          onClick={() => handleTempPreset(4.2)}
          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10 transition-all"
        >
          4.2 K (Liquid Helium)
        </button>
        <button
          onClick={() => handleTempPreset(77)}
          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10 transition-all"
        >
          77 K (Liquid Nitrogen)
        </button>
        <button
          onClick={() => handleTempPreset(300)}
          className="px-2.5 py-1 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-mono font-bold hover:bg-[#EF4444] hover:text-white transition-all"
        >
          300 K (Room Temperature)
        </button>
      </div>

      {/* Live Quantum Core Telemetry Dashboard */}
      <div className="p-6 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-['Orbitron'] font-bold text-white uppercase tracking-wider">
            Sub-Kelvin Cryo-Telemetry Dashboard
          </span>
          <span className="text-xs font-mono text-[#22C55E]">
            {isSuperconducting ? "● Superconducting Regime" : "▲ Normal Conduction Regime"}
          </span>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Error Rate */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Gate Error Rate</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black font-['Orbitron'] ${Number(metrics.errorRate) > 5 ? "text-[#EF4444]" : "text-[#22C55E]"}`}>
                {metrics.errorRate}%
              </span>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Target: &lt; 0.1% per gate</div>
          </div>

          {/* Qubit Stability */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Qubit Stability</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-['Orbitron'] text-[#00E5FF]">
                {metrics.stability}%
              </span>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Hilbert Phase Coherence</div>
          </div>

          {/* Average Gate Fidelity */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Gate Fidelity</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-['Orbitron'] text-[#7C4DFF]">
                {metrics.fidelity}%
              </span>
            </div>
            <div className="text-[10px] text-[#94A3B8]">State Overlap Probability</div>
          </div>

          {/* Decoherence T2 Time */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#94A3B8] block">Decoherence Time T₂</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-['Space_Grotesk'] text-[#F59E0B]">
                {metrics.t2} μs
              </span>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Phase Relaxation Window</div>
          </div>
        </div>

        {/* Visual Simulated Qubit Array Grid (Showing thermal jitter) */}
        <div className="p-5 rounded-2xl bg-black/50 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-[#94A3B8]">
            <span>Active Qubit Core Grid (16 Transmon Array):</span>
            <span className={isSuperconducting ? "text-[#00E5FF]" : "text-[#EF4444]"}>
              {isSuperconducting ? "Resonators Synchronized" : "Phase Scrambled by Phonons"}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[...Array(16)].map((_, i) => {
              // Calculate random jitter if temperature is high
              const jitter = !isSuperconducting ? (Math.sin(Date.now() + i) * 10).toFixed(0) : 0;
              return (
                <div
                  key={i}
                  className={`h-12 rounded-xl border flex flex-col items-center justify-center font-mono text-[10px] transition-all duration-300 ${
                    isSuperconducting
                      ? "bg-[#7C4DFF]/20 border-[#7C4DFF] text-[#00E5FF] shadow-[0_0_10px_rgba(124,77,255,0.4)]"
                      : "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] animate-bounce"
                  }`}
                  style={{ animationDuration: `${0.2 + (i % 3) * 0.1}s` }}
                >
                  <span className="font-bold">q[{i}]</span>
                  <span className="text-[9px] opacity-80">
                    {isSuperconducting ? "15 mK" : "NOISE"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
