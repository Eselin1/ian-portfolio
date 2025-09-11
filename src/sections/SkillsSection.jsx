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
    <section id="skills" className="py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold mb-8">
          Skills
        </motion.h2>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 transition-transform"
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
