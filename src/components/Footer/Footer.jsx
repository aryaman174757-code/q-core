import React from "react";
import { Cpu, Atom, Heart, Shield, BookOpen, GraduationCap, Users } from "lucide-react";
import { INSTITUTION_INFO } from "../../data/academicContent";

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/10 bg-[#050B18]/90 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C4DFF]/20 border border-[#00E5FF]/40 flex items-center justify-center glow-cyan">
                <Cpu className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <span className="font-['Orbitron'] font-black text-2xl tracking-wider bg-gradient-to-r from-[#00E5FF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                Q-CORE
              </span>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              An interactive next-generation engineering education platform exploring the paradigm shift between classical silicon microprocessors and cryogenic quantum computers.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-[#94A3B8] space-y-1">
              <div className="text-white font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#00E5FF]" />
                Academic Reference Curriculum:
              </div>
              <div>{INSTITUTION_INFO.college}</div>
              <div>{INSTITUTION_INFO.campus}</div>
              <div className="text-[#00E5FF]">{INSTITUTION_INFO.subject}</div>
            </div>
          </div>

          {/* Student Team Credits (Exact from Slide 1) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-['Orbitron'] text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#7C4DFF]" />
              Presentation Authors (SE Computer B)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {INSTITUTION_INFO.students.map((st) => (
                <div key={st.roll} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white">{st.name}</div>
                  <div className="text-[10px] text-[#00E5FF]">Roll: {st.roll}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              Second Year B.Tech • Division: B • Dept. of Computer Engineering
            </p>
          </div>

          {/* Quick Syllabus Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Orbitron'] text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8]">
              {[
                { id: "hero", label: "Overview" },
                { id: "timeline", label: "Timeline" },
                { id: "classical", label: "Classical CPU" },
                { id: "quantum", label: "Quantum QPU" },
                { id: "labs", label: "Virtual Labs" },
                { id: "comparison", label: "Comparison" },
                { id: "benchmarks", label: "Benchmarks" },
                { id: "quiz", label: "Certification" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left hover:text-[#00E5FF] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div>
            © 2026 Q-CORE. Developed for educational demonstration at Dr. D. Y. Patil College of Engineering and Innovation.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#00E5FF]">60 FPS WebGL / Three.js</span>
            <span className="text-[#7C4DFF]">React 19 + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
