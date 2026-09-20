import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { sound } from "../../utils/audioEffects";

function Motherboard3D({ selectedComponent, onSelectComponent }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  const hotspots = [
    { id: "alu", position: [-0.4, 0.25, -0.4], label: "ALU", color: "#22C55E" },
    { id: "cu", position: [0.4, 0.25, -0.4], label: "Control Unit", color: "#38BDF8" },
    { id: "registers", position: [-0.4, 0.25, 0.4], label: "Registers", color: "#F59E0B" },
    { id: "cache", position: [0.4, 0.25, 0.4], label: "L1/L2 Cache", color: "#A855F7" },
    { id: "bus", position: [0, 0.12, 1.2], label: "System Bus", color: "#00E5FF" }
  ];

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Motherboard PCB Substrate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.1, 4.2]} />
        <meshStandardMaterial color="#064E3B" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Gold Edge Connector Traces */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 0.06, 0]}>
          <boxGeometry args={[0.2, 0.02, 3.6]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* CPU Socket Housing */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.2, 0.12, 2.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Silicon Die Sub-sections */}
      {/* ALU Block */}
      <mesh
        position={[-0.45, 0.18, -0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent("alu");
        }}
      >
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial
          color={selectedComponent === "alu" ? "#22C55E" : "#166534"}
          emissive="#22C55E"
          emissiveIntensity={selectedComponent === "alu" ? 0.8 : 0.2}
        />
      </mesh>

      {/* Control Unit Block */}
      <mesh
        position={[0.45, 0.18, -0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent("cu");
        }}
      >
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial
          color={selectedComponent === "cu" ? "#00E5FF" : "#0284C7"}
          emissive="#00E5FF"
          emissiveIntensity={selectedComponent === "cu" ? 0.8 : 0.2}
        />
      </mesh>

      {/* Registers Block */}
      <mesh
        position={[-0.45, 0.18, 0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent("registers");
        }}
      >
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial
          color={selectedComponent === "registers" ? "#F59E0B" : "#B45309"}
          emissive="#F59E0B"
          emissiveIntensity={selectedComponent === "registers" ? 0.8 : 0.2}
        />
      </mesh>

      {/* Cache Block */}
      <mesh
        position={[0.45, 0.18, 0.45]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent("cache");
        }}
      >
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial
          color={selectedComponent === "cache" ? "#A855F7" : "#6B21A8"}
          emissive="#A855F7"
          emissiveIntensity={selectedComponent === "cache" ? 0.8 : 0.2}
        />
      </mesh>

      {/* RAM DIMM Slots */}
      {[-1.4, -1.2].map((z, idx) => (
        <mesh key={`dimm-${idx}`} position={[0, 0.25, z]}>
          <boxGeometry args={[2.4, 0.35, 0.08]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* PCIe Lane Connector */}
      <mesh position={[0, 0.15, 1.4]}>
        <boxGeometry args={[2.8, 0.18, 0.15]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Hotspot Markers */}
      {hotspots.map((spot) => (
        <group key={spot.id} position={spot.position}>
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(spot.id);
            }}
          >
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color={spot.color}
              emissive={spot.color}
              emissiveIntensity={1.2}
            />
          </mesh>
          <Html distanceFactor={8} position={[0, 0.18, 0]} center>
            <button
              onClick={() => onSelectComponent(spot.id)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider transition-all whitespace-nowrap shadow-md ${
                selectedComponent === spot.id
                  ? "bg-white text-black scale-110"
                  : "bg-[#050B18]/90 text-white border border-white/20 hover:border-[#00E5FF]"
              }`}
            >
              {spot.label}
            </button>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function ClassicalArch3D({ components, selectedId, onSelect }) {
  const selectedInfo = components.find((c) => c.id === selectedId) || components[0];

  const handleSelect = (id) => {
    sound.playClick();
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Motherboard Canvas */}
      <div className="lg:col-span-7 h-[420px] rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <Canvas camera={{ position: [3.8, 3.2, 3.8], fov: 46 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-5, 2, -5]} intensity={1.0} color="#00E5FF" />
          <Motherboard3D selectedComponent={selectedId} onSelectComponent={handleSelect} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={2.5}
            maxDistance={7}
          />
        </Canvas>

        {/* Floating Canvas Tag */}
        <div className="absolute top-4 left-4 bg-[#050B18]/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-xs font-mono text-[#00E5FF]">
          3D Microarchitecture Die View
        </div>
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="text-[11px] text-[#94A3B8]/80 font-mono">
            Click on a module or hotspot pin to inspect circuitry
          </span>
        </div>
      </div>

      {/* Component Inspector Card */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-['Orbitron'] font-semibold text-[#00E5FF] uppercase tracking-wider">
          <span>Component Inspector</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-['Orbitron'] text-xl font-bold text-white">
                {selectedInfo.name}
              </h3>
              <p className="text-xs font-mono text-[#38BDF8] mt-0.5">
                {selectedInfo.role}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-mono font-bold">
              Active
            </span>
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {selectedInfo.description}
          </p>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#F8FAFC]">
            <span className="text-[#38BDF8] block text-[10px] uppercase tracking-wider mb-1 font-bold">
              Silicon Hardware Metrics
            </span>
            {selectedInfo.stats}
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-2">
            {components.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all truncate ${
                  selectedId === c.id
                    ? "bg-[#00E5FF] text-[#050B18] shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                    : "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"
                }`}
              >
                {c.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
