import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ContactForm from './sections/ContactForm';
import useActiveSection from './hooks/useActiveSection';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useActiveSection('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
