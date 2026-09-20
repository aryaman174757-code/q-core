import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Volume2, VolumeX, Globe, X, Send, BookOpen, Lightbulb, HelpCircle, Check, ArrowRight } from "lucide-react";
import { useSpeech } from "../../hooks/useSpeech";
import { sound } from "../../utils/audioEffects";
import { INSTITUTION_INFO } from "../../data/academicContent";

export default function AITutorOrb({
  isOpen,
  onToggle,
  activeSection = "hero",
  hindiMode = false,
  onToggleHindi
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Greetings! I am Q-TUTOR, your AI quantum architecture assistant. How can I assist your study of Classical vs Quantum Microprocessors today?",
      textHindi: "नमस्ते! मैं Q-TUTOR हूँ, आपका AI क्वांटम आर्किटेक्चर असिस्टेंट। क्लासिकल और क्वांटम माइक्रोप्रोसेसर को समझने में मैं आपकी क्या मदद कर सकता हूँ?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isELI5, setIsELI5] = useState(false);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const chatEndRef = useRef(null);

  const { speak, stop, isSpeaking } = useSpeech();

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Pre-configured intelligent knowledge answers based on the PPT curriculum
  const knowledgeBase = {
    difference: {
      en: "According to Slide 8 of the college syllabus: A classical microprocessor works with binary bits (0 or 1) in definite states, executing sequentially at room temperature. A quantum microprocessor uses qubits (0, 1, or both in superposition) with massive inherent parallelism, operating near absolute zero (15 mK).",
      hi: "स्लाइड 8 के अनुसार: क्लासिकल माइक्रोप्रोसेसर बाइनरी बिट्स (0 या 1) पर काम करता है और रूम टेम्परेचर पर सीक्वेंशियल काम करता है। जबकि क्वांटम माइक्रोप्रोसेसर क्यूबिट्स (0, 1, या दोनों एक साथ सुपरपोज़िशन में) का उपयोग करता है और एब्सोल्यूट ज़ीरो (15 mK) के पास काम करता है।"
    },
    cycle: {
      en: "Slide 2 specifies the 4 continuous phases: 1) Fetch: gets instruction from memory, 2) Decode: Control Unit decodes opcode, 3) Execute: ALU calculates result, 4) Store: writes to register or RAM.",
      hi: "स्लाइड 2 के अनुसार 4 चरण होते हैं: 1) Fetch: मेमोरी से निर्देश लाना, 2) Decode: कण्ट्रोल यूनिट इसे डिकोड करती है, 3) Execute: ALU गणना करता है, 4) Store: परिणाम रजिस्टर या रैम में सहेजा जाता है।"
    },
    cooling: {
      en: "Slide 8 & Lab 4: Superconducting qubits need ~15 mK (-273.135°C) to maintain Cooper pair superconductivity and eliminate thermal energy (kT) that causes fatal qubit decoherence and bit flips.",
      hi: "स्लाइड 8 और लैब 4: सुपरकंडक्टिंग क्यूबिट्स को लगभग 15 mK (-273.135°C) की अत्यधिक ठंड की आवश्यकता होती है ताकि थर्मल शोर (गर्मी) क्यूबिट्स के सुपरपोज़िशन को नष्ट न कर दे।"
    },
    bloch: {
      en: "The Bloch Sphere is a geometric 3D representation of a 2-level quantum state |ψ⟩ = α|0⟩ + β|1⟩. The North Pole is state |0⟩, the South Pole is |1⟩, and the equator represents equal superpositions like |+⟩.",
      hi: "ब्लॉच स्फीयर क्यूबिट की सुपरपोज़िशन स्थिति का 3D विज़ुअलाइज़ेशन है। उत्तरी ध्रुव |0⟩ है, दक्षिणी ध्रुव |1⟩ है, और भूमध्य रेखा (इक्वेटर) 50-50 सुपरपोज़िशन दर्शाती है।"
    },
    eli5_superposition: {
      en: "Imagine a coin: a classical bit is like a coin resting flat on a table—it is definitely Heads (1) or Tails (0). A qubit in superposition is like a coin spinning rapidly on the table—it behaves as both Heads and Tails simultaneously until your hand slaps it down (measurement)!",
      hi: "सिक्के का उदाहरण लीजिए: एक सामान्य बिट मेज़ पर रखे सिक्के जैसा है—या तो हेड्स (1) या टेल्स (0)। लेकिन सुपरपोज़िशन में क्यूबिट तेज़ी से घूमते हुए सिक्के जैसा है—जब तक आप हाथ रखकर इसे रोकते नहीं (मेज़रमेंट), यह एक साथ हेड्स और टेल्स दोनों है!"
    }
  };

  const explainCurrentSection = () => {
    sound.playQuantumBeep();
    let textEn = "";
    let textHi = "";

    if (activeSection === "classical") {
      textEn = "You are viewing the Classical Microprocessor module. It highlights the Fetch-Decode-Execute-Store cycle (Slide 2), the 5 advantages and disadvantages (Slide 4), and the 8 application domains (Slide 3).";
      textHi = "आप क्लासिकल माइक्रोप्रोसेसर मॉड्यूल देख रहे हैं। यह फेच-डिकोड-एक्ज़ीक्यूट चक्र (स्लाइड 2) और इसके 8 उपयोग क्षेत्रों को समझाता है।";
    } else if (activeSection === "quantum") {
      textEn = "You are exploring the Quantum Microprocessor module. Notice the 7-step flowchart from Slide 5: Input Data → Qubits → Superposition & Entanglement → Gates (H, X, CNOT) → Processing → Measurement → Output.";
      textHi = "आप क्वांटम माइक्रोप्रोसेसर मॉड्यूल में हैं। इसमें स्लाइड 5 का 7-चरणीय फ्लोचार्ट दिखाया गया है: डेटा इनपुट से लेकर क्वांटम गेट्स और मेज़रमेंट तक।";
    } else if (activeSection === "labs") {
      textEn = "Welcome to the Virtual Labs! Try Lab 01 to input custom registers in the ALU, or Lab 02 to rotate the 3D Bloch sphere, and Lab 04 to see how qubits decohere when heated above 1.2 K.";
      textHi = "वर्चुअल लैब में आपका स्वागत है! लैब 01 में ALU रजिस्टर्स चलाएँ और लैब 02 में 3D ब्लॉच स्फीयर का परीक्षण करें।";
    } else {
      textEn = `Q-CORE is presenting the ${activeSection.toUpperCase()} section. Everything is grounded in the DY Patil College of Engineering and Innovation Computer Architecture syllabus.`;
      textHi = `Q-CORE वर्तमान में ${activeSection.toUpperCase()} प्रस्तुत कर रहा है। सभी सामग्री डी. वाई. पाटिल कॉलेज के पाठ्यक्रम से प्रमाणित है।`;
    }

    const newMsg = { id: Date.now(), sender: "ai", text: textEn, textHindi: textHi };
    setMessages(prev => [...prev, newMsg]);
    if (hindiMode) speak(textHi, "hi-IN");
    else speak(textEn, "en-US");
  };

  const handleSimpleExplanation = () => {
    sound.playQuantumBeep();
    const newMsg = {
      id: Date.now(),
      sender: "ai",
      text: knowledgeBase.eli5_superposition.en,
      textHindi: knowledgeBase.eli5_superposition.hi
    };
    setMessages(prev => [...prev, newMsg]);
    if (hindiMode) speak(newMsg.textHindi, "hi-IN");
    else speak(newMsg.text);
  };

  const generateDynamicMCQ = () => {
    sound.playQuantumBeep();
    const question = {
      q: "According to Slide 8, what temperature do superconducting quantum processors require?",
      qHi: "स्लाइड 8 के अनुसार, सुपरकंडक्टिंग क्वांटम प्रोसेसर को किस तापमान की आवश्यकता होती है?",
      options: [
        "Room temperature (~300 K)",
        "Near absolute zero (~15 mK)",
        "Boiling water (373 K)",
        "Sub-zero freezer (-20°C)"
      ],
      correct: 1
    };
    setActiveQuizQuestion(question);
    setQuizSelectedOption(null);
  };

  const handleSend = (query) => {
    const textToSend = query || inputText;
    if (!textToSend.trim()) return;

    sound.playClick();
    const userMsg = { id: Date.now(), sender: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      sound.playQuantumBeep();
      const lower = textToSend.toLowerCase();
      let replyEn = knowledgeBase.difference.en;
      let replyHi = knowledgeBase.difference.hi;

      if (lower.includes("fetch") || lower.includes("cycle") || lower.includes("decode")) {
        replyEn = knowledgeBase.cycle.en;
        replyHi = knowledgeBase.cycle.hi;
      } else if (lower.includes("cool") || lower.includes("temperature") || lower.includes("kelvin")) {
        replyEn = knowledgeBase.cooling.en;
        replyHi = knowledgeBase.cooling.hi;
      } else if (lower.includes("bloch") || lower.includes("sphere")) {
        replyEn = knowledgeBase.bloch.en;
        replyHi = knowledgeBase.bloch.hi;
      } else if (lower.includes("simple") || lower.includes("easy") || lower.includes("eli5")) {
        replyEn = knowledgeBase.eli5_superposition.en;
        replyHi = knowledgeBase.eli5_superposition.hi;
      }

      const aiMsg = { id: Date.now() + 1, sender: "ai", text: replyEn, textHindi: replyHi };
      setMessages(prev => [...prev, aiMsg]);
      if (hindiMode) speak(replyHi, "hi-IN");
      else speak(replyEn);
    }, 400);
  };

  return (
    <>
      {/* Floating Glowing AI Orb Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            sound.playQuantumBeep();
            onToggle();
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#7C4DFF] via-[#00E5FF] to-[#38BDF8] p-0.5 shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:scale-110 active:scale-95 transition-all group"
          title="Open Q-TUTOR AI Assistant"
        >
          <div className="w-full h-full rounded-full bg-[#050B18] flex items-center justify-center relative overflow-hidden">
            <Sparkles className="w-6 h-6 text-[#00E5FF] group-hover:text-white transition-colors animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#050B18]" />
          </div>
        </button>
      </div>

      {/* Slide-out AI Tutor Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[620px] rounded-3xl glass-panel border border-[#00E5FF]/40 shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden bg-[#050B18]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C4DFF]/20 border border-[#00E5FF]/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="font-['Orbitron'] text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Q-TUTOR</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono">
                      AI Active
                    </span>
                  </h4>
                  <p className="text-[10px] text-[#94A3B8] font-mono">
                    DYPCOEI Academic Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Voice Narration Toggle */}
                <button
                  onClick={() => {
                    if (isSpeaking) stop();
                    else speak(messages[messages.length - 1]?.text);
                  }}
                  className={`p-1.5 rounded-lg border text-xs transition-all ${
                    isSpeaking ? "bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] animate-pulse" : "bg-white/5 border-white/10 text-[#94A3B8]"
                  }`}
                  title="Toggle Voice Narration"
                >
                  {isSpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Hindi Mode Toggle */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleHindi();
                  }}
                  className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all ${
                    hindiMode ? "bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]" : "bg-white/5 border-white/10 text-[#94A3B8]"
                  }`}
                >
                  {hindiMode ? "हिंदी" : "EN"}
                </button>

                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Action Smart Prompts */}
            <div className="px-3 py-2 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <button
                onClick={explainCurrentSection}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#00E5FF] hover:bg-white/10 shrink-0 flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                Explain Section
              </button>
              <button
                onClick={handleSimpleExplanation}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#7C4DFF] hover:bg-white/10 shrink-0 flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                Simple Analogies
              </button>
              <button
                onClick={generateDynamicMCQ}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#22C55E] hover:bg-white/10 shrink-0 flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                Quick Quiz
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-[#050B18] font-semibold rounded-tr-none"
                        : "bg-[#0F172A] border border-white/10 text-white rounded-tl-none space-y-1.5"
                    }`}
                  >
                    <p>{hindiMode && m.textHindi ? m.textHindi : m.text}</p>
                    {m.sender === "ai" && (
                      <div className="flex items-center justify-between text-[10px] text-[#94A3B8] pt-1 border-t border-white/5">
                        <span>Q-TUTOR • Verified</span>
                        <button
                          onClick={() => speak(hindiMode && m.textHindi ? m.textHindi : m.text, hindiMode ? "hi-IN" : "en-US")}
                          className="hover:text-[#00E5FF] flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          Listen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Dynamic Interactive MCQ Card */}
              {activeQuizQuestion && (
                <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-[#22C55E]/40 space-y-2.5">
                  <span className="text-[10px] font-['Orbitron'] font-bold text-[#22C55E] uppercase block">
                    Dynamic Practice Question:
                  </span>
                  <p className="text-white font-semibold">
                    {hindiMode ? activeQuizQuestion.qHi : activeQuizQuestion.q}
                  </p>

                  <div className="space-y-1.5">
                    {activeQuizQuestion.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === activeQuizQuestion.correct;
                      const isSelected = quizSelectedOption === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setQuizSelectedOption(optIdx);
                            if (isCorrect) sound.playSuccess();
                            else sound.playError();
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs font-mono transition-all border ${
                            quizSelectedOption !== null
                              ? isCorrect
                                ? "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E] font-bold"
                                : isSelected
                                ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]"
                                : "bg-white/5 border-white/5 text-gray-400"
                              : "bg-white/5 border-white/10 hover:border-[#00E5FF] text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-[#050B18] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={hindiMode ? "क्वांटम या क्लासिकल के बारे में पूछें..." : "Ask doubt (e.g. why 15 mK?)..."}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none font-mono"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-[#00E5FF] text-black hover:bg-[#38BDF8] transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
