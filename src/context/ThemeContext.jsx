import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("qcore_theme_mode");
      if (saved) return saved === "dark";
      // Explicitly default to Bright (Light) Mode as requested
      return false;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("qcore_theme_mode", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("qcore_theme_mode", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
