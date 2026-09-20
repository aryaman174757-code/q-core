import React, { useState } from "react";
import { QUIZ_LEVELS } from "../../data/quizData";
import { sound } from "../../utils/audioEffects";
import { CheckCircle2, AlertCircle, ArrowRight, HelpCircle } from "lucide-react";

export default function Level1_MCQ({ onComplete }) {
  const levelData = QUIZ_LEVELS[0];
  const questions = levelData.questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return; // prevent multiple clicks
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sound.playError();
    }

    setAnswersLog((prev) => [...prev, { qId: currentQ.id, isCorrect }]);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Completed Level 1
      const finalScore = score + (selectedOption === currentQ.correct ? 0 : 0);
      onComplete({
        level: 1,
        score,
        total: questions.length,
        accuracy: Math.round((score / questions.length) * 100)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress & Score Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
        <span className="text-[#00E5FF] font-bold">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span className="text-white">
          Score: <strong className="text-[#22C55E]">{score}</strong> / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-[#050B18]/90 border border-white/15 space-y-5">
        <h4 className="font-['Orbitron'] text-base sm:text-lg font-bold text-white leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === currentQ.correct;

            let btnStyle = "bg-white/5 border-white/10 hover:border-[#00E5FF] text-white";
            if (selectedOption !== null) {
              if (isCorrect) {
                btnStyle = "bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E] font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]";
              } else if (isSelected) {
                btnStyle = "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] font-bold";
              } else {
                btnStyle = "bg-white/5 border-white/5 text-gray-500 opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(i)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-['Space_Grotesk'] transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {selectedOption !== null && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                )}
                {selectedOption !== null && isSelected && !isCorrect && (
                  <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* PPT Explanation Box */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-[#00E5FF] block">
              Curriculum Grounding:
            </span>
            <p className="text-xs text-[#94A3B8]">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question Button */}
        {selectedOption !== null && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-[#050B18] font-bold text-xs font-['Orbitron'] flex items-center gap-2 shadow-lg glow-cyan"
            >
              <span>{currentIdx < questions.length - 1 ? "Next Question" : "Complete Level 1"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
