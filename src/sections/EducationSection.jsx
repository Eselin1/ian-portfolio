import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function EducationSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-12 text-center">
          Education
        </motion.h2>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Master of Science</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science: Cybersecurity</p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Georgia Institute of Technology</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Expected 2027</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Bachelor of Science</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science: Software Engineering</p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Southern New Hampshire University</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Summer 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

