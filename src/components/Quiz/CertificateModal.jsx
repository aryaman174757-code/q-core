import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Award, Printer, X, Download, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { INSTITUTION_INFO } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";

export default function CertificateModal({ score = 100, accuracy = 100, timeSpent = "4m 12s", onClose }) {
  const [studentName, setStudentName] = useState("Engineering Student");

  useEffect(() => {
    // Blast festive celebratory confetti
    sound.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00E5FF", "#7C4DFF", "#22C55E", "#F59E0B", "#FFFFFF"]
      });
    } catch (e) {}
  }, []);

  const getRank = (acc) => {
    if (acc >= 90) return "Q-CORE Grandmaster & Quantum Physicist";
    if (acc >= 75) return "Silicon Architect & Senior Micro-Engineer";
    return "Quantum Computing Apprentice";
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B18]/90 backdrop-blur-2xl overflow-y-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/20 max-w-3xl w-full relative space-y-6 shadow-[0_0_60px_rgba(0,229,255,0.3)] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Congratulatory Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-['Orbitron'] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Curriculum Certification Eligible
          </div>
          <h3 className="font-['Orbitron'] font-black text-2xl sm:text-3xl text-white">
            Congratulations on Completing Q-CORE!
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            You have successfully mastered the principles of Classical and Quantum Microprocessors.
          </p>
        </div>

        {/* Student Name Input */}
        <div className="max-w-md mx-auto space-y-1.5 text-center">
          <label className="text-xs font-mono text-[#00E5FF] font-bold">
            Enter Your Full Name for Certificate:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full text-center bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white font-['Space_Grotesk'] text-lg font-bold focus:border-[#00E5FF] focus:outline-none"
            placeholder="Your Name"
          />
        </div>

        {/* Performance Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-[#94A3B8] font-mono block">Overall Score</span>
            <span className="font-['Orbitron'] font-bold text-lg text-[#00E5FF]">{score} pts</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-[#94A3B8] font-mono block">Accuracy</span>
            <span className="font-['Orbitron'] font-bold text-lg text-[#22C55E]">{accuracy}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-[#94A3B8] font-mono block">Duration</span>
            <span className="font-['Orbitron'] font-bold text-lg text-[#F59E0B]">{timeSpent}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-[#94A3B8] font-mono block">Achieved Rank</span>
            <span className="font-['Space_Grotesk'] font-bold text-xs text-[#7C4DFF] block truncate">
              {getRank(accuracy).split("&")[0]}
            </span>
          </div>
        </div>

        {/* Formal Printable Diploma Certificate Container */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-10 rounded-2xl border-4 border-[#00E5FF]/40 bg-[#0B1220] relative text-center space-y-5 overflow-hidden shadow-inner"
        >
          {/* Subtle Watermark Corner Brackets */}
          <div className="absolute top-2 left-2 text-[#00E5FF]/30 font-mono text-xs">╔═══════</div>
          <div className="absolute top-2 right-2 text-[#00E5FF]/30 font-mono text-xs">═══════╗</div>
          <div className="absolute bottom-2 left-2 text-[#00E5FF]/30 font-mono text-xs">╚═══════</div>
          <div className="absolute bottom-2 right-2 text-[#00E5FF]/30 font-mono text-xs">═══════╝</div>

          <div className="space-y-1">
            <h5 className="font-['Orbitron'] text-xs font-black tracking-widest text-[#00E5FF] uppercase">
              {INSTITUTION_INFO.college}
            </h5>
            <p className="text-[11px] text-[#94A3B8] font-mono">
              {INSTITUTION_INFO.department} • {INSTITUTION_INFO.campus}
            </p>
          </div>

          <div className="py-2">
            <span className="text-xs uppercase font-mono text-white/60 tracking-widest block">
              Certificate of Educational Mastery
            </span>
            <h2 className="font-['Orbitron'] font-black text-2xl sm:text-3xl text-white tracking-wide mt-2">
              {studentName}
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
            Has successfully demonstrated comprehensive academic understanding and practical simulation skills in{" "}
            <strong className="text-white">Computer Architecture & Organization</strong>, covering both{" "}
            <strong className="text-[#00E5FF]">Classical Von Neumann Microprocessors</strong> and{" "}
            <strong className="text-[#7C4DFF]">Superconducting Quantum Processors (QPU)</strong>.
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
            <div className="text-left">
              <span className="block text-white font-bold">Honors Rank:</span>
              <span className="text-[#00E5FF]">{getRank(accuracy)}</span>
            </div>
            <div className="text-right">
              <span className="block text-white font-bold">Verification:</span>
              <span>Q-CORE-DYPCOEI-2026-CERT</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-bold text-xs font-['Orbitron'] flex items-center gap-2 shadow-lg glow-cyan hover:opacity-90"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
