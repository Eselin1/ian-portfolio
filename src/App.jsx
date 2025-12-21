import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Portfolio from './Portfolio';
import ThemeToggle from './ThemeToggle';
import Capstone from './Capstone';

function AppLayout() {
  const [temperature, setTemperature] = useState(null);
  const [isOnHero, setIsOnHero] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    if (!isHome) return undefined;
    const handleScroll = () => {
      // Check if we're on the hero section (top of page)
      setIsOnHero(window.scrollY < window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);
  
  return (
    <>
      {isHome && isOnHero && temperature !== null && (
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium">
            {temperature}°F
          </div>
        </div>
      )}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Portfolio onTemperatureChange={setTemperature} />} />
        <Route path="/capstone" element={<Capstone />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
