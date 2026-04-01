import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import useActiveSection from './hooks/useActiveSection';
import BackToTop from './components/BackToTop';
import TopNav from './components/TopNav';

export default function Portfolio({ onTemperatureChange }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection] = useActiveSection('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen font-sans">
      <Hero onTemperatureChange={onTemperatureChange} />
      <TopNav />
      <Footer />
      <BackToTop activeSection={activeSection} />
    </div>
  );
}
