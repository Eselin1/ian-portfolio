import React, { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    const el = document.getElementById('home') || document.body;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={scrollTop}
      className={`fixed right-4 sm:right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } bg-green-600 dark:bg-purple-600 hover:bg-green-700 dark:hover:bg-purple-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center`}
    >
      ↑
    </button>
  );
}
