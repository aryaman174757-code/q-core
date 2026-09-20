import React, { useState } from "react";
import { QUIZ_LEVELS } from "../../data/quizData";
import { sound } from "../../utils/audioEffects";
import { CheckCircle2, RotateCcw, ArrowRight, Layers } from "lucide-react";

export default function Level2_Match({ onComplete }) {
  const pairsData = QUIZ_LEVELS[1].pairs;

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({}); // componentId -> definitionId
  const [wrongAttempt, setWrongAttempt] = useState(null);

  // Scrambled list of definitions
  const [definitions] = useState(() =>
    [...pairsData]
      .map((p) => ({ id: p.id, match: p.match }))
      .sort(() => Math.random() - 0.5)
  );

  const handleComponentClick = (id) => {
    if (matchedPairs[id]) return; // already solved
    sound.playClick();
    setSelectedComponent(id);
    setWrongAttempt(null);
  };

  const handleDefinitionClick = (defId) => {
    if (!selectedComponent) return;

    // Check if correct match
    if (selectedComponent === defId) {
      sound.playSuccess();
      const updated = { ...matchedPairs, [selectedComponent]: defId };
      setMatchedPairs(updated);
      setSelectedComponent(null);
      setWrongAttempt(null);

      // Check if all pairs matched
      if (Object.keys(updated).length === pairsData.length) {
        setTimeout(() => {
          onComplete({
            level: 2,
            score: pairsData.length,
            total: pairsData.length,
            accuracy: 100
          });
        }, 800);
      }
    } else {
      sound.playError();
      setWrongAttempt(defId);
      setTimeout(() => setWrongAttempt(null), 800);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedComponent(null);
    setMatchedPairs({});
    setWrongAttempt(null);
  };

  const isAllComplete = Object.keys(matchedPairs).length === pairsData.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
        <span className="text-[#7C4DFF] font-bold">
          Matched: {Object.keys(matchedPairs).length} of {pairsData.length} pairs
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[#94A3B8] hover:text-white"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Pairs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Components Column */}
        <div className="space-y-3">
          <span className="text-xs font-['Orbitron'] font-bold text-[#00E5FF] uppercase tracking-wider block">
            1. Select Microprocessor Component:
          </span>
          {pairsData.map((item) => {
            const isMatched = !!matchedPairs[item.id];
            const isSelected = selectedComponent === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleComponentClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-['Space_Grotesk'] font-bold transition-all flex items-center justify-between ${
                  isMatched
                    ? "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E] opacity-70"
                    : isSelected
                    ? "bg-[#00E5FF] text-black shadow-lg scale-105"
                    : "bg-white/5 border-white/10 text-white hover:border-[#00E5FF]"
                }`}
              >
                <span>{item.component}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
              </button>
            );
          })}
        </div>

        {/* Right: Function & Role Column */}
        <div className="space-y-3">
          <span className="text-xs font-['Orbitron'] font-bold text-[#7C4DFF] uppercase tracking-wider block">
            2. Match to Physical Role:
          </span>
          {definitions.map((item) => {
            // check if any component matched this definition
            const isMatched = Object.values(matchedPairs).includes(item.id);
            const isWrong = wrongAttempt === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleDefinitionClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                  isMatched
                    ? "bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E] opacity-70"
                    : isWrong
                    ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] animate-shake"
                    : selectedComponent
                    ? "bg-white/5 border-white/20 text-white hover:border-[#7C4DFF] hover:bg-white/10"
                    : "bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>{item.match}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAllComplete && (
        <div className="p-4 rounded-xl bg-[#22C55E]/20 border border-[#22C55E] text-center space-y-2">
          <span className="font-['Orbitron'] font-bold text-[#22C55E] block">
            ✓ Level 2 Perfect Match Complete!
          </span>
          <p className="text-xs text-white">
            All classical and quantum hardware functional pairings accurately identified.
          </p>
        </div>
      )}
    </div>
  );
}
