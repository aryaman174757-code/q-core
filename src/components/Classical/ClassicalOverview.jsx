import React, { useState } from "react";
import { Cpu, Check, AlertCircle, Laptop, Car, Factory, Activity, Wifi, Tv, Bot, Layers } from "lucide-react";
import ClassicalArch3D from "./ClassicalArch3D";
import CPUSimulator from "./CPUSimulator";
import { CLASSICAL_DATA } from "../../data/academicContent";

export default function ClassicalOverview() {
  const [selectedComponentId, setSelectedComponentId] = useState("alu");
  const [activeTab, setActiveTab] = useState("architecture"); // 'architecture' | 'simulation' | 'proscons'

  const iconMap = {
    Laptop: Laptop,
    Cpu: Cpu,
    Car: Car,
    Factory: Factory,
    Activity: Activity,
    Wifi: Wifi,
    Tv: Tv,
    Bot: Bot
  };

  return (
    <section id="classical" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
            <Cpu className="w-3.5 h-3.5" />
            Module 01: Classical Architecture
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Classical Microprocessor Systems
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {CLASSICAL_DATA.working.summary}
          </p>

          {/* Module Navigation Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 mt-4 shadow-xs">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "architecture"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              3D Architecture
            </button>
            <button
              onClick={() => setActiveTab("simulation")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "simulation"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Working Simulator (Slide 2)
            </button>
            <button
              onClick={() => setActiveTab("proscons")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "proscons"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Advantages & Limitations (Slide 4)
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === "architecture" && (
          <ClassicalArch3D
            components={CLASSICAL_DATA.architectureComponents}
            selectedId={selectedComponentId}
            onSelect={setSelectedComponentId}
          />
        )}

        {activeTab === "simulation" && (
          <CPUSimulator />
        )}

        {activeTab === "proscons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Advantages Card (Slide 4) */}
            <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white">
                    Advantages of Classical Microprocessors
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Reference PPT • Slide 4
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {CLASSICAL_DATA.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages Card (Slide 4) */}
            <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white">
                    Disadvantages of Classical Microprocessors
                  </h3>
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                    Reference PPT • Slide 4
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {CLASSICAL_DATA.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Applications of Classical Microprocessors (Slide 3) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
                Applications of Classical Microprocessors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                From Reference PPT • Slide 3 (8 Major Domains)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">8 Domains</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLASSICAL_DATA.applications.map((app) => {
              const IconComp = iconMap[app.icon] || Cpu;
              return (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-200 group hover:-translate-y-0.5 shadow-xs hover:shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <IconComp className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {app.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
