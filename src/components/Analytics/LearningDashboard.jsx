import React, { useState, useEffect } from "react";
import { BarChart3, Award, Clock, Target, CheckCircle2, Lock, Sparkles, Cpu, Atom, Layers, Zap } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function LearningDashboard({ completedLabs = {}, quizScore = 0 }) {
  const [sessionSeconds, setSessionSeconds] = useState(145);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const totalLabsCompleted = Object.values(completedLabs).filter(Boolean).length;
  const labProgressPercent = Math.round((totalLabsCompleted / 4) * 100);

  // 5 Gamification Badges from prompt
  const achievements = [
    {
      id: "cpu_explorer",
      title: "CPU Explorer",
      desc: "Inspected classical 3D die & ALU microarchitecture.",
      icon: Cpu,
      color: "#00E5FF",
      isUnlocked: true // unlocked by exploring
    },
    {
      id: "register_master",
      title: "Register Master",
      desc: "Executed custom bitwise operations in Lab 01.",
      icon: Zap,
      color: "#38BDF8",
      isUnlocked: !!completedLabs.lab1 || totalLabsCompleted > 0
    },
    {
      id: "quantum_scientist",
      title: "Quantum Scientist",
      desc: "Manipulated 3D Bloch sphere superposition in Lab 02.",
      icon: Atom,
      color: "#7C4DFF",
      isUnlocked: !!completedLabs.lab2 || totalLabsCompleted >= 2
    },
    {
      id: "circuit_builder",
      title: "Circuit Builder",
      desc: "Assembled an entangled multi-qubit circuit in Lab 03.",
      icon: Layers,
      color: "#EC4899",
      isUnlocked: !!completedLabs.lab3 || totalLabsCompleted >= 3
    },
    {
      id: "microprocessor_master",
      title: "Microprocessor Master",
      desc: "Completed Level 3 challenge and earned graduation honors.",
      icon: Award,
      color: "#22C55E",
      isUnlocked: quizScore >= 50 || totalLabsCompleted >= 4
    }
  ];

  return (
    <section id="analytics" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
            <BarChart3 className="w-3.5 h-3.5" />
            Student Telemetry & Progress
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Learning Analytics & Badges
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-time tracking of simulations executed, virtual labs completed, time spent on curriculum, and earned certifications.
          </p>
        </div>

        {/* 4 Analytics Metric Cards with Circular Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Labs Completed */}
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Labs Completed
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white">
                {totalLabsCompleted} / 4
              </div>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {labProgressPercent}% Coverage
              </span>
            </div>

            {/* Circular Progress */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 dark:text-blue-400"
                  strokeDasharray={`${labProgressPercent}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 absolute" />
            </div>
          </div>

          {/* Quiz Score */}
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Assessment Score
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white">
                {quizScore}%
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                Grade: A+ Distinction
              </span>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 dark:text-indigo-400"
                  strokeDasharray="95, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 absolute" />
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Platform Time
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white">
                {formatTime(sessionSeconds)}
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Active Session
              </span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Best Accuracy
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white">
                98.4%
              </div>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                High Proficiency
              </span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Gamification: 5 Unlocked Badges Showcase */}
        <div className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Hardware Honors & Curriculum Badges
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Milestones earned through interactive laboratory simulations and assessments
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {achievements.filter(a => a.isUnlocked).length} of 5 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {achievements.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border text-center transition-all duration-200 relative group flex flex-col items-center justify-between shadow-xs ${
                    badge.isUnlocked
                      ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/20 hover:border-blue-500 hover:scale-102"
                      : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 opacity-60"
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center transition-transform ${
                        badge.isUnlocked ? "scale-105" : "grayscale"
                      }`}
                      style={{
                        backgroundColor: badge.isUnlocked ? `${badge.color}15` : "rgba(0,0,0,0.04)",
                        border: `1px solid ${badge.isUnlocked ? badge.color : "rgba(0,0,0,0.1)"}`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: badge.isUnlocked ? badge.color : "#94A3B8" }} />
                    </div>

                    <div>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-slate-900 dark:text-white">
                        {badge.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {badge.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200 dark:border-white/10 w-full flex items-center justify-center gap-1 text-[10px] font-medium">
                    {badge.isUnlocked ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
