import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import StickyHeader from './components/StickyHeader';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ContactForm from './sections/ContactForm';
import useActiveSection from './hooks/useActiveSection';
import BackToTop from './components/BackToTop';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useActiveSection('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-zinc-100 font-sans">
      <Hero />
      <StickyHeader activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16 py-12">
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
