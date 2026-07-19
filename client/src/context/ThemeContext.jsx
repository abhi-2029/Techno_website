/**
 * CARD Technocrats & Engineers LLP - Global React Context State Provider
 * 
 * Senior Developer Notes:
 * - Houses central state machines (such as auth context or color theme).
 * - Avoids props drilling by wrapping parent layout routing trees.
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Local state container managing interactive view variables
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const setDarkMode = useCallback(() => setIsDark(true), []);
  const setLightMode = useCallback(() => setIsDark(false), []);

  const value = useMemo(
    () => ({ isDark, toggleTheme, setDarkMode, setLightMode }),
    [isDark, toggleTheme, setDarkMode, setLightMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
