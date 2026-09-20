import React, { useState, useEffect } from "react";
import { Cpu, Atom, Volume2, VolumeX, Sparkles, Award, BarChart3, Menu, X, Globe } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Navbar({ activeSection, onNavigate, onOpenAITutor, hindiMode, setHindiMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "presentation", label: "PPT Deck", highlight: true },
    { id: "timeline", label: "History" },
    { id: "classical", label: "Classical CPU" },
    { id: "quantum", label: "Quantum QPU" },
    { id: "labs", label: "Virtual Labs" },
    { id: "comparison", label: "Comparison" },
    { id: "benchmarks", label: "Performance" },
    { id: "applications", label: "Applications" },
    { id: "quiz", label: "Quiz & Cert" },
    { id: "analytics", label: "Dashboard" }
  ];

  const handleNavClick = (id) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = sound.toggleSound();
    setSoundOn(next);
    if (next) sound.playClick();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050B18]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C4DFF]/20 border border-[#00E5FF]/40 flex items-center justify-center group-hover:border-[#00E5FF] transition-all glow-cyan">
            <Cpu className="w-5 h-5 text-[#00E5FF] absolute transition-transform group-hover:scale-0 duration-300" />
            <Atom className="w-5 h-5 text-[#7C4DFF] absolute transition-transform scale-0 group-hover:scale-100 duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Orbitron'] font-black text-xl tracking-wider bg-gradient-to-r from-[#00E5FF] via-white to-[#7C4DFF] bg-clip-text text-transparent">
                Q-CORE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-['Space_Grotesk'] hidden sm:block">
              DYPCOEI • Computer Architecture
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0F172A]/70 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? item.highlight
                    ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    : "bg-white/15 text-[#00E5FF] font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Hindi Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setHindiMode(!hindiMode);
            }}
            title={hindiMode ? "Hindi / Hinglish Mode Active" : "English Mode Active"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              hindiMode
                ? "bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]"
                : "bg-white/5 border-white/10 text-[#94A3B8] hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hindiMode ? "हिंदी" : "EN"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Mute Sound Effects" : "Enable Sound Effects"}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:border-[#00E5FF]/40 transition-all"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#00E5FF]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={() => {
              sound.playQuantumBeep();
              onOpenAITutor();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C4DFF]/30 to-[#00E5FF]/30 border border-[#7C4DFF]/60 hover:border-[#00E5FF] text-white text-xs font-semibold transition-all glow-purple hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050B18]/95 border-b border-white/10 px-4 py-4 space-y-2 backdrop-blur-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all ${
                activeSection === item.id
                  ? "bg-[#00E5FF]/20 text-[#00E5FF] font-semibold border border-[#00E5FF]/30"
                  : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
