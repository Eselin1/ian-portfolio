import React from 'react';
import { motion } from 'framer-motion';
import skills from '../data/skills';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-12 text-center">
          Technical Skills
        </motion.h2>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 transition-transform"
            >
              <h3 className="text-xl font-bold mb-4 capitalize text-center">{category === 'devops' ? 'DevOps' : category}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillList.map((skill, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.1 }} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200 cursor-default">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

