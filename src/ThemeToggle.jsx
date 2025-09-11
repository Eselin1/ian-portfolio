import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const getSystemPref = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [dark, setDark] = useState(getSystemPref);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed left-4 sm:left-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 w-12 h-12 rounded-full bg-gray-50/80 dark:bg-zinc-900/70 backdrop-blur border border-gray-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{ rotate: dark ? 180 : 0, scale: dark ? 0.95 : 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {dark ? (
          // Moon icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-300"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
            />
          </svg>
        ) : (
          // Sun icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-yellow-500"
          >
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
