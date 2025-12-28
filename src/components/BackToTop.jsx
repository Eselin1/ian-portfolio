import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const lightSectionColors = {
  home: { base: '#dc2626', hover: '#b91c1c' }, // red
  about: { base: '#dc2626', hover: '#b91c1c' },
  projects: { base: '#16a34a', hover: '#15803d' }, // green
  contact: { base: '#2563eb', hover: '#1d4ed8' }, // blue
  experience: { base: '#16a34a', hover: '#15803d' },
  default: { base: '#dc2626', hover: '#b91c1c' }
};

export default function BackToTop({ activeSection = 'home' }) {
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    const updateMode = () => setIsDarkMode(root.classList.contains('dark'));
    updateMode();
    const observer = new MutationObserver(updateMode);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const scrollTop = () => {
    const el = document.getElementById('home') || document.body;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const { base, hover } = lightSectionColors[activeSection] || lightSectionColors.default;
  const lightColor = base;
  const lightHoverColor = hover;
  const darkColor = '#ea580c'; // orange-600
  const darkHoverColor = '#c2410c'; // orange-700
  const buttonColor = isDarkMode ? darkColor : lightColor;
  const buttonHoverColor = isDarkMode ? darkHoverColor : lightHoverColor;

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      initial={false}
      animate={{ backgroundColor: buttonColor, borderColor: buttonColor }}
      whileHover={{ backgroundColor: buttonHoverColor }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className={`fixed right-4 sm:right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 border-2 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {!isDarkMode && (
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ backgroundColor: lightColor }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-x-2 top-2 h-0.5 rounded-full opacity-70"
        />
      )}
      <span className="relative z-10">↑</span>
    </motion.button>
  );
}
