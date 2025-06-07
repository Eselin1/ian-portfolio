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
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 bg-gray-200 text-black dark:bg-gray-800 dark:text-white px-4 py-2 rounded shadow"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
