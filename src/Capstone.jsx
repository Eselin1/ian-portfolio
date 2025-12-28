import React, { useEffect, useState } from 'react';

const placeholders = [
  {
    id: 'artifact-1',
    title: 'RPSMF (Rock-Paper-Scissors-Middle Finger) iOS Game',
    category: 'Software Design and Engineering',
    summary:
      'SwiftUI iOS game with extended RPS mechanics. Enhanced with comprehensive accessibility, expanded testing (6 → 56 tests), and a full MVVM refactor with modular views plus UML documentation, improving maintainability and production readiness.',
    links: {
      original: 'https://github.com/Eselin1/RPSMF',
      enhanced: 'https://github.com/Eselin1/RPSMF/tree/Enhancement1',
      narrative: '#'
    },
    narrativeUrl: '/capstone/ianRepsherENHANCEMENT1.pdf',
    outcomes: [
      'Professional communication (Outcome 2)',
      'Design evaluation (Outcome 3)',
      'Innovative tools and techniques (Outcome 4)',
      'Security mindset (Outcome 5)'
    ]
  },
  {
    id: 'artifact-2',
    title: 'RPSMF Game Engine (Algorithms & Data Structures)',
    category: 'Algorithms and Data Structures',
    summary:
      'Swift game engine enhanced with eight custom data structures (AVL tree, hash table, DAG, priority queue, trie, LRU cache, ELO system, benchmarking framework) plus 155 new tests. Adds performance analysis, Big O documentation, and algorithmic trade-off evaluation.',
    links: {
      original: 'https://github.com/Eselin1/RPSMF',
      enhanced: 'https://github.com/Eselin1/RPSMF/tree/Enhancement2',
      narrative: '#'
    },
    narrativeUrl: '/capstone/ianRepsherENHANCEMENT2.pdf',
    outcomes: [
      'Professional communication (Outcome 2)',
      'Algorithmic principles (Outcome 3)',
      'Well-founded techniques (Outcome 4)'
    ]
  },
  {
    id: 'artifact-3',
    title: 'RPSMF iOS App + PostgreSQL Backend Integration',
    category: 'Databases',
    summary:
      'Converted the standalone iOS game into a full-stack system with a PostgreSQL schema (8 tables), Node/Express REST API, JWT auth, and an iOS networking layer. Added profiles, leaderboards, persistence, and secure session handling.',
    links: {
      original: 'https://github.com/Eselin1/RPSMF',
      enhanced: 'https://github.com/Eselin1/RPSMF/tree/Enhancement3',
      narrative: '#'
    },
    narrativeUrl: '/capstone/Enhancement%203%20Narrative.pdf',
    outcomes: [
      'Well-founded techniques (Outcome 4)',
      'Security mindset (Outcome 5)',
      'Algorithmic principles (Outcome 3)'
    ]
  }
];

export default function Capstone() {
  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [activeNarrative, setActiveNarrative] = useState(null);

  useEffect(() => {
    if (!activeNarrative) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveNarrative(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNarrative]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-zinc-100 font-sans">
      <header className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-10">
        <p className="text-sm uppercase tracking-widest text-green-700 dark:text-orange-400 mb-4">
          CS 499 Capstone
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Capstone ePortfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
          This page consolidates the required capstone materials: professional self-assessment,
          code review, enhanced artifacts with narratives, and course outcome alignment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleScroll('self-assessment')}
            className="px-5 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-green-600 dark:hover:bg-orange-600 hover:text-white hover:border-transparent transition-colors"
          >
            Self-Assessment
          </button>
          <button
            type="button"
            onClick={() => handleScroll('code-review')}
            className="px-5 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-green-600 dark:hover:bg-orange-600 hover:text-white hover:border-transparent transition-colors"
          >
            Code Review
          </button>
          <button
            type="button"
            onClick={() => handleScroll('artifacts')}
            className="px-5 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-green-600 dark:hover:bg-orange-600 hover:text-white hover:border-transparent transition-colors"
          >
            Artifacts
          </button>
          <button
            type="button"
            onClick={() => handleScroll('outcomes')}
            className="px-5 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-green-600 dark:hover:bg-orange-600 hover:text-white hover:border-transparent transition-colors"
          >
            Outcomes
          </button>
          <a
            href="#/"
            className="px-5 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Back to Portfolio
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16 pb-20">
        <section id="self-assessment" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Professional Self-Assessment</h2>
          <div className="bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Completing the Computer Science program and building this ePortfolio helped me
              clarify my professional focus as a software engineer with strong iOS foundations and
              growing full-stack depth. While my capstone project centers on a native iOS game, my
              professional experience broadened my skills in backend services, API design, and
              production systems, which I now bring back into my mobile work.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              In my role at ECG, I collaborated directly with clients to understand their needs and
              translate subscription requirements into usable features. I also partnered with
              teammates to identify and repair gaps in our software, which strengthened my ability
              to deliver in team environments and communicate clearly with both technical and
              non-technical stakeholders.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              My coursework and professional work reinforced core CS fundamentals. The algorithms
              and data structures enhancement demonstrates deliberate choices around performance
              and trade-offs, while the software engineering and database enhancements show clean
              architecture, testing discipline, and full-stack integration. Security is a consistent
              priority in my work, from authenticated APIs and input validation in the RPSMF backend
              to secure handling in production systems and this portfolio site.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Together, the three artifacts present a cohesive growth story: a mobile-first product
              built with production-quality engineering practices, extended with advanced algorithms
              and data structures, and expanded into a secure, full-stack application with a
              relational database. They show how I apply computer science principles to ship
              reliable, maintainable software.
            </p>
          </div>
        </section>

        <section id="code-review" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Informal Code Review Video</h2>
          <div className="bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Add your code review video link or embed. Include a brief description of the existing
              functionality, code analysis targets, and planned enhancements aligned to the five
              course outcomes.
            </p>
            <div className="aspect-video w-full bg-gray-200 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
              <iframe
                title="Capstone Code Review Video"
                src="https://www.youtube.com/embed/RrEMytS4czA"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              href="https://youtu.be/RrEMytS4czA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open code review video on YouTube
            </a>
          </div>
        </section>

        <section id="artifacts" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Artifacts and Enhancements</h2>
          <div className="grid gap-6">
            {placeholders.map((artifact) => (
              <div
                key={artifact.id}
                className="border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{artifact.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{artifact.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={artifact.links.original}
                      className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Original
                    </a>
                    <a
                      href={artifact.links.enhanced}
                      className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Enhanced
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveNarrative(artifact)}
                      disabled={!artifact.narrativeUrl}
                      className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Narrative
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{artifact.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {artifact.outcomes.map((outcome) => (
                    <span
                      key={outcome}
                      className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="outcomes" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Course Outcomes Alignment</h2>
          <div className="bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                Outcome 1 (collaboration and decision support): reflected in the narratives through
                documentation, structured enhancement planning, and stakeholder-oriented code review.
              </li>
              <li>
                Outcome 2 (professional communication): artifact narratives, UML documentation, and
                comprehensive testing summaries from Enhancements 1 and 2.
              </li>
              <li>
                Outcome 3 (algorithmic principles): data structure and performance work in
                Enhancement 2 plus ELO rating logic in Enhancement 3.
              </li>
              <li>
                Outcome 4 (innovative tools and techniques): MVVM refactor, accessibility upgrades,
                and full-stack integration across Enhancements 1 and 3.
              </li>
              <li>
                Outcome 5 (security mindset): JWT auth, bcrypt hashing, input validation, and
                defensive state handling in Enhancements 1 and 3.
              </li>
            </ul>
          </div>
        </section>
      </main>

      {activeNarrative && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveNarrative(null)}
        >
          <div
            className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-zinc-700">
              <div>
                <h3 className="text-lg font-semibold">{activeNarrative.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Narrative PDF</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveNarrative(null)}
                aria-label="Close modal"
                className="inline-flex items-center justify-center w-9 h-9 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="h-[70vh] bg-gray-100 dark:bg-zinc-800">
              <iframe
                title={`${activeNarrative.title} Narrative`}
                src={activeNarrative.narrativeUrl}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
