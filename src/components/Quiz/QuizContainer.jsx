import React, { useState } from "react";
import { Award, Layers, CheckCircle2, ChevronRight, Sparkles, HelpCircle } from "lucide-react";
import Level1_MCQ from "./Level1_MCQ";
import Level2_Match from "./Level2_Match";
import Level3_InteractiveBuild from "./Level3_InteractiveBuild";
import CertificateModal from "./CertificateModal";
import { sound } from "../../utils/audioEffects";

export default function QuizContainer({ onQuizComplete }) {
  const [activeLevel, setActiveLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const levels = [
    { level: 1, title: "Level 1: Academic MCQs", subtitle: "Core Curriculum Concepts", type: "Easy" },
    { level: 2, title: "Level 2: Architecture Match", subtitle: "Component & Role Linking", type: "Medium" },
    { level: 3, title: "Level 3: Master Builder", subtitle: "CPU Cycle & Quantum Bell State", type: "Hard" }
  ];

  const handleLevelComplete = (result) => {
    sound.playSuccess();
    setCompletedLevels((prev) => ({ ...prev, [result.level]: result }));
    setTotalScore((prev) => prev + result.score);

    if (result.level < 3) {
      setActiveLevel(result.level + 1);
    } else {
      setShowCertificate(true);
      if (onQuizComplete) onQuizComplete(100);
    }
  };

  return (
    <section id="quiz" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
            <Award className="w-3.5 h-3.5" />
            3-Tier Assessment System
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Academic Mastery Challenge
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Progress through Easy, Medium, and Hard engineering evaluations. Complete Level 3 to claim your verified course completion certificate.
          </p>
        </div>

        {/* Level Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {levels.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
            const isDone = completedLevels[lvl.level];

            return (
              <button
                key={lvl.level}
                onClick={() => {
                  sound.playClick();
                  setActiveLevel(lvl.level);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group shadow-xs ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-blue-600 ring-2 ring-blue-500/20 scale-[1.02]"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-white/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                      {lvl.type}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Passed
                      </span>
                    )}
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lvl.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{lvl.subtitle}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-white/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Level Interactive Body */}
        <div className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 shadow-sm">
          {activeLevel === 1 && <Level1_MCQ onComplete={handleLevelComplete} />}
          {activeLevel === 2 && <Level2_Match onComplete={handleLevelComplete} />}
          {activeLevel === 3 && <Level3_InteractiveBuild onComplete={handleLevelComplete} />}
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <CertificateModal
            score={totalScore || 100}
            accuracy={96}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </div>
    </section>
  );
}
