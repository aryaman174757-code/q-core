import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Zap, RotateCcw, Sparkles, BarChart2, Atom, Layers } from "lucide-react";
import { sound } from "../../utils/audioEffects";

// Embedded Bloch 3D component for Lab 2
function MiniBloch({ theta, phi }) {
  const radius = 1.4;
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.cos(theta);
  const z = radius * Math.sin(theta) * Math.sin(phi);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color="#0F172A" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.005, 12, 12]} />
        <meshBasicMaterial color="#7C4DFF" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 48]} />
        <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
      {/* Z Axis */}
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, radius * 2.4, 8]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      {/* State Vector */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geo) => {
            const pos = new Float32Array([0, 0, 0, x, y, z]);
            geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          }}
        />
        <lineBasicMaterial color="#FFFFFF" linewidth={2} />
      </line>
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#00E5FF" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export default function Lab2_QubitState({ onLabComplete }) {
  const [theta, setTheta] = useState(0); // Ground state |0⟩
  const [phi, setPhi] = useState(0);
  const [shots, setShots] = useState(1024);
  const [measurementData, setMeasurementData] = useState(null);
  const [isSampling, setIsSampling] = useState(false);

  const prob0 = Math.cos(theta / 2) ** 2;
  const prob1 = Math.sin(theta / 2) ** 2;

  // Gate actions
  const applyHadamard = () => {
    sound.playQuantumBeep();
    // Hadamard puts |0⟩ into (|0⟩+|1⟩)/√2 (theta=pi/2, phi=0)
    setTheta(Math.PI / 2);
    setPhi(0);
    setMeasurementData(null);
  };

  const applyPauliX = () => {
    sound.playQuantumBeep();
    // Pauli-X flips |0⟩ to |1⟩ and vice-versa
    setTheta(prev => (prev === 0 ? Math.PI : 0));
    setMeasurementData(null);
  };

  const applyPauliZ = () => {
    sound.playQuantumBeep();
    setPhi(prev => (prev === 0 ? Math.PI : 0));
    setMeasurementData(null);
  };

  const handleReset = () => {
    sound.playClick();
    setTheta(0);
    setPhi(0);
    setMeasurementData(null);
  };

  const runShotsMeasurement = () => {
    sound.playQuantumBeep();
    setIsSampling(true);

    setTimeout(() => {
      let count0 = 0;
      for (let i = 0; i < shots; i++) {
        if (Math.random() < prob0) count0++;
      }
      const count1 = shots - count0;
      setMeasurementData({ count0, count1 });
      setIsSampling(false);
      sound.playSuccess();
      if (onLabComplete) onLabComplete("lab2");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-[#7C4DFF]" />
            Lab 02: Qubit State & IBM Quantum Composer Lab
          </h3>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Superposition Simulator, Unitary Gate Pulses & Statistical Collapse
          </p>
        </div>

        {/* Gate Pulse Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={applyHadamard}
            className="px-3 py-1.5 rounded-xl bg-[#7C4DFF]/20 border border-[#7C4DFF]/60 text-white font-mono font-bold text-xs hover:bg-[#7C4DFF] hover:text-black transition-all"
            title="Hadamard Gate (Create Superposition)"
          >
            Gate H
          </button>
          <button
            onClick={applyPauliX}
            className="px-3 py-1.5 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/60 text-white font-mono font-bold text-xs hover:bg-[#00E5FF] hover:text-black transition-all"
            title="Pauli-X (Quantum NOT Gate)"
          >
            Gate X
          </button>
          <button
            onClick={applyPauliZ}
            className="px-3 py-1.5 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/60 text-white font-mono font-bold text-xs hover:bg-[#F59E0B] hover:text-black transition-all"
            title="Pauli-Z (Phase Flip Gate)"
          >
            Gate Z
          </button>

          <button
            onClick={runShotsMeasurement}
            disabled={isSampling}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] text-[#050B18] font-bold font-['Orbitron'] text-xs flex items-center gap-1.5 shadow-lg glow-purple active:scale-95 disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isSampling ? "Sampling 1024 Shots..." : "Measure Qubit"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white"
            title="Reset to Ground State |0⟩"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: 3D Bloch & Composer Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 3D Bloch Visualizer */}
        <div className="lg:col-span-6 h-[340px] rounded-2xl glass-panel border border-white/10 relative overflow-hidden bg-[#050B18]/90">
          <Canvas camera={{ position: [2.5, 2.0, 2.5], fov: 45 }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00E5FF" />
            <pointLight position={[-5, -5, -5]} intensity={1.0} color="#7C4DFF" />
            <MiniBloch theta={theta} phi={phi} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          <div className="absolute top-3 left-3 bg-[#050B18]/80 px-2.5 py-0.5 rounded-lg border border-white/10 font-mono text-[10px] text-[#7C4DFF]">
            3D Bloch State Vector
          </div>
        </div>

        {/* Right: Telemetry & State Equation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-[#050B18]/80 border border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-['Orbitron'] font-bold text-[#00E5FF] tracking-wider">
              State Vector Formula
            </span>
            <div className="font-mono text-sm text-white bg-black/50 p-2.5 rounded-lg border border-white/5">
              |ψ⟩ = {Math.cos(theta / 2).toFixed(3)}|0⟩ + {Math.sin(theta / 2).toFixed(3)}|1⟩
            </div>
          </div>

          {/* Theta & Phi Controls */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">Polar Theta (θ):</span>
                <span className="text-[#00E5FF] font-bold">{(theta / Math.PI).toFixed(2)}π</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.PI}
                step={0.01}
                value={theta}
                onChange={(e) => {
                  setTheta(Number(e.target.value));
                  setMeasurementData(null);
                }}
                className="w-full accent-[#00E5FF] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white">Phase Phi (φ):</span>
                <span className="text-[#7C4DFF] font-bold">{(phi / Math.PI).toFixed(2)}π</span>
              </div>
              <input
                type="range"
                min={0}
                max={2 * Math.PI}
                step={0.01}
                value={phi}
                onChange={(e) => {
                  setPhi(Number(e.target.value));
                  setMeasurementData(null);
                }}
                className="w-full accent-[#7C4DFF] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Probabilities */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-[#00E5FF] font-mono block">P(|0⟩)</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                {(prob0 * 100).toFixed(1)}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-[#7C4DFF] font-mono block">P(|1⟩)</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                {(prob1 * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Sampling Histogram (IBM Quantum Style) */}
      {measurementData && (
        <div className="p-5 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-['Orbitron'] font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#00E5FF]" />
              Multi-Shot Quantum Measurement Histogram (1,024 Shots)
            </span>
            <span className="text-[10px] font-mono text-[#22C55E]">
              Wavefunction Collapsed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* |0⟩ Result Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#00E5FF] font-bold">Outcome |0⟩:</span>
                <span className="text-white font-bold">{measurementData.count0} shots ({((measurementData.count0 / shots) * 100).toFixed(1)}%)</span>
              </div>
              <div className="h-6 rounded-lg bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] rounded transition-all duration-500"
                  style={{ width: `${(measurementData.count0 / shots) * 100}%` }}
                />
              </div>
            </div>

            {/* |1⟩ Result Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#7C4DFF] font-bold">Outcome |1⟩:</span>
                <span className="text-white font-bold">{measurementData.count1} shots ({((measurementData.count1 / shots) * 100).toFixed(1)}%)</span>
              </div>
              <div className="h-6 rounded-lg bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#A855F7] rounded transition-all duration-500"
                  style={{ width: `${(measurementData.count1 / shots) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
