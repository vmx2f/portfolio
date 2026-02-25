'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export const ACCENT_COLORS = {
  purple: '#7066A8',
  shinnypurple: '#B1AFFF',
  lightpurple: '#987D9A',
  pink: '#CB80AB',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#991F36',
  lightblue: '#8EACCD',
  skyblue: '#7EACB5'
} as const;

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedAccent: keyof typeof ACCENT_COLORS;
  setAccent: (accentName: keyof typeof ACCENT_COLORS) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContextClass = createContext<ThemeContextType | null>(null);
const ACCENT_STORAGE_KEY = 'accent';
const DEFAULT_ACCENT: keyof typeof ACCENT_COLORS = 'purple';

const resolveAccentName = (storedAccent: string | null): keyof typeof ACCENT_COLORS => {
  if (!storedAccent) {
    return DEFAULT_ACCENT;
  }

  if (storedAccent in ACCENT_COLORS) {
    return storedAccent as keyof typeof ACCENT_COLORS;
  }

  const foundAccent = Object.entries(ACCENT_COLORS).find(([, color]) => color === storedAccent);
  if (!foundAccent) {
    return DEFAULT_ACCENT;
  }

  return foundAccent[0] as keyof typeof ACCENT_COLORS;
};

export const ThemeContext = ({ children }: ThemeProviderProps) => {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [selectedAccent, setSelectedAccent] = useState<keyof typeof ACCENT_COLORS>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_ACCENT;
    }

    return resolveAccentName(localStorage.getItem(ACCENT_STORAGE_KEY));
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-accent-color', ACCENT_COLORS[selectedAccent]);
  }, [selectedAccent]);

  const setAccent = useCallback((accentName: keyof typeof ACCENT_COLORS) => {
    document.documentElement.style.setProperty('--dynamic-accent-color', ACCENT_COLORS[accentName]);
    localStorage.setItem(ACCENT_STORAGE_KEY, accentName);
    setSelectedAccent(accentName);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({
      isDarkMode: resolvedTheme === 'dark',
      toggleDarkMode,
      selectedAccent,
      setAccent,
    }),
    [resolvedTheme, selectedAccent, setAccent, toggleDarkMode]
  );

  return (
    <ThemeContextClass.Provider value={value}>
      {children}
    </ThemeContextClass.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContextClass);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
