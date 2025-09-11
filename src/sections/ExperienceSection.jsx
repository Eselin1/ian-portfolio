import React from 'react';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold mb-8">
          Experience
        </motion.h2>

        <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Software Developer</h3>
              <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">ECG, Inc.</p>
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">May 2023 – June 2025</span>
          </div>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-500 mr-3 mt-1">▸</span>
              Built responsive Angular UIs and Java backend services for enterprise VoIP application "Alpaca"
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-3 mt-1">▸</span>
              Integrated REST APIs, WebSockets, and event-driven architecture for real-time communication
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-3 mt-1">▸</span>
              Implemented CI/CD pipelines using TeamCity and managed deployments in AWS environments
            </li>
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
