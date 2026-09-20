import React, { useState, useEffect } from "react";
import { Cpu, Atom, Volume2, VolumeX, Sparkles, Award, BarChart3, Menu, X, Globe, Sun, Moon } from "lucide-react";
import { sound } from "../../utils/audioEffects";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ activeSection, onNavigate, onOpenAITutor, hindiMode, setHindiMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Overview" },
    { id: "presentation", label: "Slides Deck", highlight: true },
    { id: "timeline", label: "Timeline" },
    { id: "classical", label: "Classical CPU" },
    { id: "quantum", label: "Quantum QPU" },
    { id: "labs", label: "Virtual Labs" },
    { id: "comparison", label: "Comparison" },
    { id: "benchmarks", label: "Benchmarks" },
    { id: "applications", label: "Use Cases" },
    { id: "quiz", label: "Certification" },
    { id: "analytics", label: "Progress" }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Professional Brand Mark */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center transition-all duration-200 group-hover:border-blue-500 shadow-sm">
            <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400 absolute transition-transform group-hover:scale-0 duration-200" />
            <Atom className="w-4 h-4 text-indigo-600 dark:text-indigo-400 absolute transition-transform scale-0 group-hover:scale-100 duration-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Q-CORE
              </span>
              <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                RESEARCH
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              DYPCOEI • Computer Architecture
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150 ${
                  isActive
                    ? item.highlight
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs border border-slate-200/80 dark:border-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark / Bright Mode Switcher */}
          <button
            onClick={() => {
              sound.playClick();
              toggleTheme();
            }}
            title={isDark ? "Switch to Bright / Light Mode" : "Switch to Dark Mode"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 bg-slate-100 hover:bg-slate-200/80 border-slate-300/80 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 shadow-xs"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-medium hidden sm:inline">Bright</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[11px] font-medium hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Hindi / English Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setHindiMode(!hindiMode);
            }}
            title={hindiMode ? "Hindi / Hinglish Mode Active" : "English Mode Active"}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 shadow-xs ${
              hindiMode
                ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400"
                : "bg-slate-100 hover:bg-slate-200/80 border-slate-300/80 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">{hindiMode ? "हिंदी" : "EN"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? "Mute Audio Effects" : "Enable Audio Effects"}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-150 shadow-xs"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => {
              sound.playQuantumBeep();
              onOpenAITutor();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all duration-150 hover:shadow active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span className="text-[11px] font-semibold hidden sm:inline">AI Tutor</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-[#090D16]/95 border-b border-slate-200 dark:border-white/10 px-4 py-4 space-y-1.5 backdrop-blur-2xl shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2 text-xs rounded-lg transition-all ${
                activeSection === item.id
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
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

