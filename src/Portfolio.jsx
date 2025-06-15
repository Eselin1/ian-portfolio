import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Portfolio() {
  const projects = [
    {
      title: "VoIP Application (Alpaca)",
      tech: ["Angular", "Java", "WebSockets", "REST APIs"],
      desc: "Enterprise VoIP application with real-time communication features and event-driven architecture.",
      category: "Professional"
    },
    {
      title: "Interactive Exploration Game",
      tech: ["JavaScript", "React", "State Management"],
      desc: "Interactive game showcasing complex UI state management and user interaction patterns.",
      category: "Personal"
    },
    {
      title: "Professional Portfolio Sites",
      tech: ["React", "Tailwind", "Framer Motion", "Vite"],
      desc: "Modern, responsive portfolio websites with dark mode and smooth animations.",
      category: "Professional"
    },
    {
      title: "LinkedIn Data Scraper",
      tech: ["Python", "BeautifulSoup", "Data Analysis"],
      desc: "Automated tool for extracting and analyzing professional networking data.",
      category: "Personal"
    }
  ];

  const skills = {
    frontend: ["JavaScript", "TypeScript", "React", "Angular", "CSS", "Tailwind"],
    backend: ["Java", "Spring Boot", "Node.js", "Python", "REST APIs", "WebSockets"],
    database: ["MongoDB", "MySQL", "Data Modeling"],
    devops: ["Docker", "Kubernetes", "CI/CD", "TeamCity", "AWS"],
    other: ["Swift", "C++", "Git", "Agile/Scrum"]
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Ian Repsher
          </h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-700 dark:text-gray-400 mb-8"
        >
          Full-Stack Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            Angular Expert
          </span>
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
            React Developer
          </span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
            VoIP Specialist
          </span>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            {projects.map((project, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'Professional' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Professional Experience
          </motion.h2>
          
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Software Developer</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">ECG, Inc.</p>
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                May 2023 – June 2025
              </span>
            </div>
            
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">▸</span>
                Built responsive Angular UIs and robust Java backend services for enterprise VoIP application "Alpaca"
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">▸</span>
                Integrated REST APIs, WebSockets, and event-driven architecture for real-time communication
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">▸</span>
                Implemented CI/CD pipelines using TeamCity and managed deployments in AWS environments
              </li>
            </ul>
          </motion.article>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Technical Skills
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-center">
                  {category === 'devops' ? 'DevOps' : category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillList.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Education
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Master of Science</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Georgia Institute of Technology</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Expected 2027</p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Bachelor of Science</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Southern New Hampshire University</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">2025</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
          >
            Let's Connect
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 opacity-90"
          >
            I'm always interested in new opportunities and collaborations
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a
              href="mailto:iarepsher@gmail.com"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              📧 iarepsher@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ianrepsher"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              LinkedIn Profile
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 opacity-75"
          >
            📍 New York, NY
          </motion.p>
        </div>
      </section>
    </main>
  );
}