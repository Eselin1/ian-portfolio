import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const getSystemPref = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return getSystemPref();
  };

  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-black dark:bg-black dark:text-white border border-gray-400 rounded"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
