import { useState, useEffect, useCallback } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer a smooth English voice if available
        const englishVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB")) || voices[0];
        setVoice(englishVoice);
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const speak = useCallback((text, lang = "en-US") => {
    if (!isSupported || typeof window === "undefined") return;
    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner voice speech
    const cleanText = text
      .replace(/[*#_`~[\]]/g, "")
      .replace(/\|0⟩/g, "state zero")
      .replace(/\|1⟩/g, "state one")
      .replace(/\|ψ⟩/g, "quantum state psi")
      .replace(/\(O\(N\)\)/g, "Order N");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    if (voice) utterance.voice = voice;
    utterance.lang = lang;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voice]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}
