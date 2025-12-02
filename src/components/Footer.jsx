import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-3 mb-4">
          <a
            href="https://github.com/Eselin1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.019c0 4.43 2.865 8.187 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.109-1.462-1.109-1.462-.907-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.954 0-1.094.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.027A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.297 2.748-1.027 2.748-1.027.546 1.376.202 2.393.1 2.646.64.7 1.028 1.594 1.028 2.688 0 3.85-2.338 4.698-4.566 4.947.36.311.679.923.679 1.86 0 1.343-.012 2.425-.012 2.755 0 .267.18.578.688.48A10.026 10.026 0 0 0 22 12.02C22 6.486 17.523 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/ianrepsher"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.448-2.136 2.944v5.662H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.366-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13zM7.114 20.452H3.559V9h3.555v11.452z"/>
            </svg>
          </a>
          <a
            href="mailto:ian@repsher.dev"
            aria-label="Email"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75zm2.318-.75a.75.75 0 0 0-.568 1.238l6.182 7.236a1.5 1.5 0 0 0 2.256 0l6.182-7.236a.75.75 0 0 0-.568-1.238H4.568z"/>
            </svg>
          </a>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gray-600 dark:text-zinc-400">
          © 2025 Ian Repsher.
        </motion.p>
      </div>
    </footer>
  );
}
