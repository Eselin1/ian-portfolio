import React from 'react';
import { Link } from 'react-router-dom';
import ProjectsSection from './sections/ProjectsSection';
import Footer from './components/Footer';

export default function Projects() {
  return (
    <div className="min-h-screen font-sans">
      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16 py-12">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
