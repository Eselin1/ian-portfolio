import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectGallery from '../components/ProjectGallery';
import RPSMFGame from '../components/RPSMFGame';

const projects = [
  {
    id: 'pitchform',
    title: 'PitchForm',
    category: 'Training & fitness',
    monogram: 'PF',
    summary: 'A training plan that moves with your week.',
    description: 'A soccer strength and conditioning progressive web app with weekly scheduling, workout logging, and per-set progression. Local-first storage keeps training history on the device, with optional WHOOP integration.',
    tech: ['React', 'TypeScript', 'Vite', 'PWA'],
    githubUrl: 'https://github.com/Eselin1/PitchForm'
  },
  {
    id: 'vineandcloth',
    title: 'Vine & Cloth',
    category: 'E-commerce theme',
    monogram: 'V&C',
    summary: 'An editorial storefront for personal style.',
    description: 'A custom Shopify Online Store 2.0 theme built on Dawn. Reusable editorial sections, personal styling pages, and service inquiry forms pair a distinctive visual identity with Shopify’s product, collection, and cart experiences.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS']
  },
  {
    id: 'papersculptures',
    title: 'Paper Sculptures Look Like Statues',
    category: 'Booking & administration',
    monogram: 'PS',
    summary: 'From first inquiry to an organized booking workflow.',
    description: 'A custom site with a waitlist and booking form, reference file uploads, and an admin dashboard. Submission management includes status tracking, internal notes, and CSV exports, backed by Cloudflare Pages Functions, D1, and R2.',
    tech: ['JavaScript', 'Cloudflare Pages', 'D1', 'R2']
  },
  {
    id: 'dee-repsher',
    title: 'Dee Repsher Portfolio',
    category: 'Professional portfolio',
    monogram: 'DR',
    summary: 'A clear home for consulting expertise.',
    description: 'A professional portfolio for SaaS implementation and life sciences consulting, with a dedicated CV page and a contact form connected to a shared Cloudflare Worker.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers'],
    screenshots: [
      { src: '/projects/dee-repsher.png', label: 'Home' },
      { src: '/projects/dee-repsher-cv.png', label: 'CV' },
      { src: '/projects/dee-repsher-contact.png', label: 'Contact' }
    ],
    liveUrl: 'https://drepsher.com'
  },
  {
    id: 'driveaxlegear',
    title: 'DriveAxleGear',
    category: 'Retail website',
    monogram: 'DAG',
    summary: 'A storefront connected to an existing eBay shop.',
    description: 'A retail website that brings an eBay store’s listings into a dedicated shopping page, with a responsive branded homepage and a separate contact page.',
    tech: ['HTML', 'CSS', 'JavaScript', 'eBay'],
    screenshots: [
      { src: '/projects/driveaxlegear.png', label: 'Home' },
      { src: '/projects/driveaxlegear-shop.png', label: 'Shop' },
      { src: '/projects/driveaxlegear-contact.png', label: 'Contact' }
    ],
    liveUrl: 'https://driveaxlegear.com'
  },
  {
    id: 'rpsmf',
    title: 'Rock Paper Scissors Middle Finger',
    description: 'Extended RPS game with unique mechanics: Middle Finger beats Paper for instant win, loses to Rock/Scissors, and both throwing it resets scores. Built for iOS with Swift.',
    tech: ['Swift', 'SwiftUI', 'Game Logic', 'iOS'],
    hasDemo: true,
    demoComponent: RPSMFGame,
    liveUrl: null,
    githubUrl: null,
    appStoreUrl: null,
    caseStudyUrl: null
  },
  {
    id: 'alpaca',
    title: 'Enterprise VoIP Application',
    description: 'Full-stack telecommunications platform serving enterprise clients. Features real-time WebSocket communication, administrative dashboards, and scalable microservices architecture.',
    tech: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'WebSockets'],
    hasDemo: false,
    logo: '/projects/ecg-logo.jpeg',
    liveUrl: null,
    githubUrl: null,
    caseStudyUrl: null
  }
];

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState(null); // Default to hidden
  const [showRules, setShowRules] = useState(false);
  const demoRefs = useRef({});

  const handleDemoToggle = (projectId) => {
    const isCurrentlyExpanded = expandedProject === projectId;
    setExpandedProject(isCurrentlyExpanded ? null : projectId);
    
    // On mobile/tablet (< 1024px), scroll to demo after expanding
    if (!isCurrentlyExpanded && window.innerWidth < 1024) {
      // Small delay to allow the demo to render first
      setTimeout(() => {
        demoRefs.current[projectId]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 100);
    }
  };

  return (
    <section id="projects" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-pixelify text-3xl md:text-5xl inline-block relative">
            <span className="relative z-10">Projects</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-1 left-1/2 h-4 -translate-x-1/2 bg-sage rounded z-0"
            />
          </h2>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const DemoComponent = project.demoComponent;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-start`}>
                  {/* Demo/Visual Side */}
                  <div 
                    ref={(el) => demoRefs.current[project.id] = el}
                    className={`${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}
                  >
                    {project.hasDemo && isExpanded ? (
                      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden h-[400px] border border-gray-300 dark:border-zinc-600">
                        <DemoComponent isExpanding={isExpanded} showRules={showRules} />
                      </div>
                    ) : project.id === 'rpsmf' ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden h-[400px] relative border border-gray-300 dark:border-zinc-600">
                          <div className="grid grid-cols-2 gap-0 h-full">
                            {[
                              { emoji: '🪨', name: 'Rock', bg: 'bg-yellow-500' },
                              { emoji: '📄', name: 'Paper', bg: 'bg-blue-600' },
                              { emoji: '✂️', name: 'Scissors', bg: 'bg-green-600' },
                              { emoji: '🖕', name: 'Middle Finger', bg: 'bg-red-600' }
                            ].map((gesture, i) => (
                              <div
                                key={i}
                                className={`${gesture.bg} flex items-center justify-center`}
                              >
                                <div className={`text-8xl ${gesture.rotateClass || ''}`}>{gesture.emoji}</div>
                              </div>
                            ))}
                          </div>
                          {/* Rules modal for preview state */}
                          <AnimatePresence>
                            {showRules && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 bg-white dark:bg-zinc-900 z-50 rounded-xl flex items-center justify-center p-8"
                              >
                                <div className="max-w-2xl">
                                  <h3
                                    className="mb-4 text-center font-jersey10 text-4xl md:text-5xl"
                                    style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                                  >
                                    Game Rules
                                  </h3>
                                  <ul
                                    className="space-y-3 font-jersey25 text-base"
                                    style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                                  >
                                    <li><strong>Classic RPS:</strong> Rock beats Scissors, Scissors beats Paper, Paper beats Rock</li>
                                    <li><strong>Middle Finger Power:</strong> Instantly wins the set if thrown against Paper</li>
                                    <li><strong>Middle Finger Weakness:</strong> Loses to Rock and Scissors</li>
                                    <li><strong>Scissors Cuts Finger:</strong> If Middle Finger loses to Scissors, that finger is cut off for the rest of the set</li>
                                    <li><strong>Double Middle Finger:</strong> Both throw Middle Finger? Score resets and target wins increases by 1!</li>
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : project.screenshots ? (
                        <ProjectGallery title={project.title} images={project.screenshots} />
                      ) : project.logo ? (
                        <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-2xl bg-[#253030] p-10 shadow-xl">
                          <img src={project.logo} alt="ECG" width="200" height="200" className="h-40 w-40 object-contain" />
                          <p className="font-jersey25 text-xl text-white">Enterprise VoIP Application</p>
                        </div>
                      ) : project.monogram ? (
                        <div className="bg-sage/20 dark:bg-sage/10 rounded-2xl min-h-[280px] md:min-h-[360px] border border-sage/40 p-8 md:p-10 flex flex-col justify-between">
                          <p className="text-sm uppercase tracking-widest text-gray-700 dark:text-gray-300">{project.category}</p>
                          <div aria-hidden="true" className="font-pixelify text-6xl md:text-8xl text-gray-900 dark:text-white my-8">{project.monogram}</div>
                          <p className="font-jersey25 text-2xl text-gray-800 dark:text-gray-200 max-w-sm">{project.summary}</p>
                        </div>
                      ) : (
                        <div key="placeholder" className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl h-[400px] flex items-center justify-center shadow-xl">
                          <div className="text-center p-8">
                            <div className="text-6xl mb-4">🚀</div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Live Production App</p>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Description Side */}
                  <div className={`flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3
                      className="font-jersey10 text-3xl mb-4 text-gray-900 dark:text-white"
                      style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                    >
                      {project.title}
                    </h3>
                    
                    <p
                      className="font-jersey25 text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                      style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-jersey25"
                          style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.hasDemo && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDemoToggle(project.id)}
                            className="px-6 py-3 border border-gray-300 dark:border-zinc-600 hover:bg-sage hover:border-sage hover:text-white rounded-lg font-jersey10 text-xl transition-colors shadow-lg w-[180px]"
                            style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                          >
                            {isExpanded ? '■ Stop Demo' : '▶ Try Live Demo'}
                          </motion.button>
                          {project.id === 'rpsmf' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowRules(!showRules)}
                              className="px-6 py-3 border border-gray-300 dark:border-zinc-600 hover:bg-sage hover:border-sage hover:text-white rounded-lg font-jersey10 text-xl transition-colors shadow-lg"
                              style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                            >
                              {showRules ? 'Hide Rules' : 'Show Rules'}
                            </motion.button>
                          )}
                        </>
                      )}
                      {project.appStoreUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-jersey10 text-xl transition-colors shadow-lg"
                          style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                        >
                          📱 View on App Store
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-jersey10 text-xl transition-colors shadow-lg"
                          style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                        >
                          {project.screenshots ? 'Live preview ↗' : 'View Live'}
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 border-2 border-gray-300 dark:border-zinc-600 hover:border-gray-400 dark:hover:border-zinc-500 text-gray-800 dark:text-gray-200 rounded-lg font-jersey10 text-xl transition-colors"
                          style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
                        >
                          💻 View Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
