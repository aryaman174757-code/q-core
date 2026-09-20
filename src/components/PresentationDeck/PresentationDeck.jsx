import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  Pause,
  Grid,
  Monitor,
  FileText,
  ExternalLink,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState("deck"); // 'deck' | 'grid'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 9;

  const slidesMeta = [
    {
      num: 1,
      title: "Title & Author Team",
      desc: "Dr. D. Y. Patil College of Engineering and Innovation • Topic: quantum vs classical microprocessor • Authors: Neha Borkar, Mayuri Mundkar, Janvhi Patil, Vedika Karlekar"
    },
    {
      num: 2,
      title: "Working of a Classical Microprocessor",
      desc: "Binary bits (0 and 1) & the continuous fetch–decode–execute–store cycle."
    },
    {
      num: 3,
      title: "Applications of Classical Microprocessor",
      desc: "Computers, Embedded Systems, Automobiles, Industrial Automation, Medical, Communications, Consumer, Robotics."
    },
    {
      num: 4,
      title: "Advantages & Disadvantages of Classical Microprocessor",
      desc: "Simple, Low cost, Reliable vs Limited speed, Power draw, Cannot perform quantum computations."
    },
    {
      num: 5,
      title: "Working of Quantum Microprocessor",
      desc: "7-Step Flowchart: Input Data → Qubits → Superposition & Entanglement → Quantum Gates → Processing → Measurement → Output."
    },
    {
      num: 6,
      title: "Applications of Quantum Microprocessor",
      desc: "AI & ML, Cryptography & Cybersecurity, Drug & Medical, Weather & Climate, Optimization."
    },
    {
      num: 7,
      title: "Advantages & Disadvantages of Quantum Microprocessor",
      desc: "High processing power, Complex problem speedup vs High cost, Cryogenics, High error sensitivity."
    },
    {
      num: 8,
      title: "Aspect Comparison Matrix",
      desc: "7-Point Technical Comparison: Basic Unit, State Principle, Processing Style, Speed, Error Rate, Operating Conditions, Maturity."
    },
    {
      num: 9,
      title: "Concluding Acknowledgments",
      desc: "Department of Engineering Science & Humanities • Thank You."
    }
  ];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => {
    sound.playClick();
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const prevSlide = () => {
    sound.playClick();
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  const selectSlide = (num) => {
    sound.playClick();
    setCurrentSlide(num);
  };

  return (
    <section id="presentation" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-['Orbitron'] font-semibold tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Original College Presentation Section
            </div>
            <h2 className="font-['Orbitron'] font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Classroom Presentation Deck
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl leading-relaxed">
              The exact slides as submitted and evaluated for <strong className="text-white">Computer Architecture and Organization</strong> at Dr. D. Y. Patil College of Engineering and Innovation.
            </p>
          </div>

          {/* Controls: Deck vs Grid & Downloads */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("deck");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === "deck"
                    ? "bg-[#00E5FF] text-black shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Presentation Mode</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("grid");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-[#00E5FF] text-black shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Slides Grid</span>
              </button>
            </div>

            {/* Direct Download Buttons */}
            <a
              href={`${import.meta.env.BASE_URL}downloads/Quantum_vs_Classical_Microprocessor_DYPCOEI.pptx`}
              download="Quantum_vs_Classical_Microprocessor_DYPCOEI.pptx"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 hover:border-[#00E5FF] text-white text-xs font-mono font-bold transition-all hover:bg-white/10"
              title="Download Original PowerPoint Presentation"
            >
              <Download className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Download .PPTX</span>
            </a>

            <a
              href={`${import.meta.env.BASE_URL}downloads/Quantum_vs_Classical_Microprocessor_DYPCOEI.pdf`}
              download="Quantum_vs_Classical_Microprocessor_DYPCOEI.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 hover:border-[#7C4DFF] text-white text-xs font-mono font-bold transition-all hover:bg-white/10"
              title="Download Original PDF Presentation"
            >
              <FileText className="w-3.5 h-3.5 text-[#7C4DFF]" />
              <span>Download .PDF</span>
            </a>
          </div>
        </div>

        {/* 1. Presentation Mode (16:9 Cinematic Screen with exact slide) */}
        {viewMode === "deck" && (
          <div className="space-y-6">
            <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/15 space-y-4">
              {/* Slide Screen Container (16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center group">
                <img
                  src={`${import.meta.env.BASE_URL}slides/slide-${currentSlide}.png`}
                  alt={`Slide ${currentSlide}: ${slidesMeta[currentSlide - 1]?.title}`}
                  className="w-full h-full object-contain select-none"
                />

                {/* Left / Right Hover Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all glow-cyan"
                  title="Previous Slide (or Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all glow-cyan"
                  title="Next Slide (or Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-xs font-mono text-[#00E5FF]">
                  Slide {currentSlide} of {totalSlides}
                </div>

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-xs font-mono text-white/80">
                  {slidesMeta[currentSlide - 1]?.title}
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono font-bold hover:bg-white/10"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextSlide}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00E5FF] text-black text-xs font-mono font-bold hover:bg-[#38BDF8]"
                  >
                    Next Slide →
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      isPlaying
                        ? "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]"
                        : "bg-white/5 border-white/10 text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? "Pause Slideshow" : "Auto-Play (4s)"}</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-[#94A3B8]">
                  Tip: Use keyboard ← → arrow keys to navigate slides
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="space-y-2">
              <span className="text-xs font-['Orbitron'] font-bold text-[#00E5FF] uppercase tracking-wider block">
                Slide Thumbnails:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {slidesMeta.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => selectSlide(s.num)}
                    className={`aspect-[16/9] rounded-xl overflow-hidden border transition-all relative group ${
                      currentSlide === s.num
                        ? "border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}slides/slide-${s.num}.png`}
                      alt={`Thumbnail ${s.num}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/80 px-1 rounded text-[9px] font-mono text-white font-bold">
                      {s.num}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid View: All 9 Slides As-Is */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slidesMeta.map((slide) => (
              <div
                key={slide.num}
                className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-black overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}slides/slide-${slide.num}.png`}
                      alt={slide.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => {
                        sound.playClick();
                        setCurrentSlide(slide.num);
                        setViewMode("deck");
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono font-bold text-[#00E5FF] border border-white/10">
                      Slide 0{slide.num}
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-['Orbitron'] text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {slide.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentSlide(slide.num);
                      setViewMode("deck");
                    }}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#00E5FF] hover:text-black border border-white/10 text-xs font-mono font-bold transition-all text-center"
                  >
                    View in Presentation Deck
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
