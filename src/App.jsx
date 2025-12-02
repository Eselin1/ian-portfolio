import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import ThemeToggle from './ThemeToggle';

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [isOnHero, setIsOnHero] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on the hero section (top of page)
      setIsOnHero(window.scrollY < window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {isOnHero && temperature !== null && (
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium">
            {temperature}°F
          </div>
        </div>
      )}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Portfolio onTemperatureChange={setTemperature} />
    </>
  );
}
