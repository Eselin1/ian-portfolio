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
      className={`fixed bottom-6 right-6 z-40 transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg`}
    >
      ↑
    </button>
  );
}

