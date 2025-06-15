import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const getSystemPref = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use system preference as default
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
      if (!dark && !light) { // Only auto-switch if user hasn't manually set preference
        setDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-black dark:bg-black dark:text-white border border-gray-400 rounded hover:scale-105 transition-transform"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}