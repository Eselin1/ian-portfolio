import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-green-600/10 dark:from-purple-600/10 via-transparent to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-sm uppercase tracking-widest text-green-600 dark:text-purple-400 mb-3"
      >
        Hello, World
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
      >
        I'm Ian Repsher
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10"
      >
        Full Stack Developer
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          className="border border-gray-300 dark:border-zinc-600 hover:bg-green-600 dark:hover:bg-purple-600 hover:border-green-600 dark:hover:border-purple-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors w-[180px]"
        >
          View My Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="border border-gray-300 dark:border-zinc-600 hover:bg-green-600 dark:hover:bg-purple-600 hover:border-green-600 dark:hover:border-purple-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors w-[180px]"
        >
          Get in Touch
        </motion.button>
      </motion.div>
    </section>
  );
}
