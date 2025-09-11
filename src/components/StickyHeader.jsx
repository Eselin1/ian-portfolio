import React from 'react';

export default function StickyHeader({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-50/80 dark:bg-zinc-900/70 backdrop-blur border-b border-gray-200 dark:border-zinc-700">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-semibold text-gray-800 dark:text-gray-200">Ian Repsher</span>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-white bg-purple-600'
                  : 'text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
