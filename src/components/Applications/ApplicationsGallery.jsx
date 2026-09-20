import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../../utils/audioEffects";
import {
  Brain,
  ShieldCheck,
  Dna,
  CloudRain,
  Bot,
  TrendingUp,
  Rocket,
  X,
  ArrowRight,
  Cpu,
  Atom,
  CheckCircle2
} from "lucide-react";

export default function ApplicationsGallery() {
  const [selectedApp, setSelectedApp] = useState(null);

  const applications = [
    {
      id: "ai",
      title: "Artificial Intelligence & ML",
      category: "Quantum & Classical Hybrid",
      icon: Brain,
      color: "#00E5FF",
      summary: "Training neural networks, accelerating gradient descent, and high-dimensional kernel mapping.",
      classicalRole: "Slide 3: Large GPU clusters run matrix multiplications for deep neural network inference and training.",
      quantumRole: "Slide 6: Quantum Neural Networks (QNN) exploit Hilbert space to evaluate exponentially large parameter spaces in polynomial time.",
      caseStudy: "Quantum natural language processing and ultra-fast chemical compound clustering."
    },
    {
      id: "cybersecurity",
      title: "Cryptography & Cybersecurity",
      category: "Critical Security Frontier",
      icon: ShieldCheck,
      color: "#7C4DFF",
      summary: "Public-key encryption, prime factorization, and quantum key distribution (QKD).",
      classicalRole: "Slide 3: AES, RSA, and ECC algorithms protect modern Internet banking and communication systems.",
      quantumRole: "Slide 6: Shor's algorithm solves discrete logarithms to break RSA, while QKD guarantees eavesdropping detection via no-cloning.",
      caseStudy: "Transition to Post-Quantum Cryptography (PQC) standards mandated by NIST."
    },
    {
      id: "medicine",
      title: "Drug & Medical Research",
      category: "Bio-Molecular Engineering",
      icon: Dna,
      color: "#22C55E",
      summary: "Molecular docking, protein folding, and simulated enzymatic reaction pathways.",
      classicalRole: "Slide 3: Medical monitors, MRI controllers, and classical molecular dynamics simulations.",
      quantumRole: "Slide 6: Quantum processors simulate electron-electron quantum correlations with exact chemical accuracy.",
      caseStudy: "Designing targeted cancer therapies and solving synthetic nitrogen fixation for food supply."
    },
    {
      id: "climate",
      title: "Climate & Weather Simulation",
      category: "Planetary Atmospheric Science",
      icon: CloudRain,
      color: "#38BDF8",
      summary: "Simulating chaotic fluid dynamics, global atmospheric currents, and carbon capture materials.",
      classicalRole: "Slide 3: Supercomputers run numerical partial differential equations for 7-day weather forecasts.",
      quantumRole: "Slide 6: Simulates chaotic multi-variable fluid turbulence and complex carbon dioxide capture catalysts.",
      caseStudy: "Hyper-localized hurricane path predictions and ultra-efficient carbon-neutral catalysts."
    },
    {
      id: "robotics",
      title: "Industrial Robotics & Automation",
      category: "Real-Time Embedded Systems",
      icon: Bot,
      color: "#F59E0B",
      summary: "Motor actuation, machine vision, and multi-robot factory coordination.",
      classicalRole: "Slide 3: High-frequency microcontrollers read LiDAR and sensor telemetry to actuate robotic joints.",
      quantumRole: "Slide 6: Global optimization of automated fleets and swarming logistics across dense industrial plants.",
      caseStudy: "Autonomous warehouse fleet coordination and real-time obstacle avoidance in space exploration."
    },
    {
      id: "finance",
      title: "Financial Optimization & Arbitrage",
      category: "Operations Research",
      icon: TrendingUp,
      color: "#EC4899",
      summary: "Portfolio risk analysis, derivative pricing, and algorithmic high-frequency arbitrage.",
      classicalRole: "Slide 3: Monte Carlo numerical simulations on Wall Street CPU/GPU clusters.",
      quantumRole: "Slide 6: Quantum Amplitude Estimation calculates risk with quadratic speedup over Monte Carlo.",
      caseStudy: "Global currency arbitrage and credit risk scoring on trillion-dollar portfolios."
    },
    {
      id: "space",
      title: "Space Exploration & Avionics",
      category: "Deep Space Engineering",
      icon: Rocket,
      color: "#A855F7",
      summary: "Radiation-hardened spacecraft control, orbital trajectory optimization, and deep-space telemetry.",
      classicalRole: "Slide 3: Radiation-tolerant microprocessors (e.g. RAD750) piloting Mars rovers and probes.",
      quantumRole: "Slide 6: Quantum sensors for ultra-sensitive gravitational wave detection and interplanetary communication.",
      caseStudy: "Optimal interplanetary flyby trajectory calculations through complex gravitational wells."
    }
  ];

  const handleOpen = (app) => {
    sound.playQuantumBeep();
    setSelectedApp(app);
  };

  const handleClose = () => {
    sound.playClick();
    setSelectedApp(null);
  };

  return (
    <section id="applications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
            <span>Global Applications</span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Real-World Industry Frontiers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Directly from Slides 3 & 6 of the academic presentation: how classical microprocessors empower today's world, and how quantum processors will reshape tomorrow.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleOpen(app)}
                className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 text-left transition-all duration-200 group flex flex-col justify-between hover:-translate-y-0.5 relative overflow-hidden shadow-xs hover:shadow-sm"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${app.color}15`, border: `1px solid ${app.color}35` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: app.color }} />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      {app.category}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {app.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {app.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-semibold" style={{ color: app.color }}>
                  <span>Inspect Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Fullscreen Interactive Modal */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 max-w-2xl w-full relative space-y-6 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedApp.color}15`, border: `1px solid ${selectedApp.color}35` }}
                  >
                    <selectedApp.icon className="w-6 h-6" style={{ color: selectedApp.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {selectedApp.category}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {selectedApp.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedApp.summary}
                </p>

                {/* Classical vs Quantum Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Classical Role */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-blue-200 dark:border-blue-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <Cpu className="w-4 h-4" />
                      <span>Classical Approach (Slide 3)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedApp.classicalRole}
                    </p>
                  </div>

                  {/* Quantum Role */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-indigo-200 dark:border-indigo-900/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Atom className="w-4 h-4" />
                      <span>Quantum Advantage (Slide 6)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedApp.quantumRole}
                    </p>
                  </div>
                </div>

                {/* Case Study Callout */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-900 dark:text-white tracking-wider block">
                    Real-World Implementation Case Study:
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {selectedApp.caseStudy}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    Close Overview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
