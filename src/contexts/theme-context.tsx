'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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

const ThemeContextClass = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => { },
  selectedAccent: 'purple',
  setAccent: () => { },
});

export const ThemeContext = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<keyof typeof ACCENT_COLORS>('purple');

  // Initialize theme and accent from localStorage or system preference
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    // Apply theme
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsDarkMode(initialTheme);

    // Check for saved accent color
    const savedAccent = localStorage.getItem('accent');
    let accentName: keyof typeof ACCENT_COLORS = 'purple';
    
    if (savedAccent) {
      // Find the accent name that matches the saved color
      const foundAccent = Object.entries(ACCENT_COLORS).find(
        ([_, color]) => color === savedAccent
      );
      if (foundAccent) {
        accentName = foundAccent[0] as keyof typeof ACCENT_COLORS;
      }
    }
    
    // Apply accent color
    document.documentElement.style.setProperty('--dynamic-accent-color', ACCENT_COLORS[accentName]);
    setSelectedAccent(accentName);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const setAccent = (accentName: keyof typeof ACCENT_COLORS) => {
    const hexColor = ACCENT_COLORS[accentName];
    document.documentElement.style.setProperty('--dynamic-accent-color', hexColor);
    localStorage.setItem('accent', hexColor);
    setSelectedAccent(accentName);
  };

  return (
    <ThemeContextClass.Provider value={{ isDarkMode, toggleDarkMode, selectedAccent, setAccent }}>
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

export const ThemeContexts = () => {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme');
      const accent = localStorage.getItem('accent');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      const accentColor = accent ? accent : '${ACCENT_COLORS['purple']}';
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};
