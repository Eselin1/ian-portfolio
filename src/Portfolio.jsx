import React from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-300">Ian Repsher</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Full-Stack Developer</p>
            </div>
          </div>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Ian Repsher
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl mt-4 text-gray-700 dark:text-gray-400"
        >
          Full-Stack Developer | VoIP | Angular | React
        </motion.p>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Basic Exploration Game",
              tech: ["JavaScript", "React"],
              desc: "A simple game exploring interaction logic and UI states."
            },
            {
              title: "Portfolio Websites",
              tech: ["HTML", "CSS", "React"],
              desc: "Responsive web designs showcasing frontend skills."
            },
            {
              title: "LinkedIn Webscraper",
              tech: ["Python", "BeautifulSoup"],
              desc: "Tool to extract professional data for analysis."
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 py-12 bg-gray-200 dark:bg-gray-950">
        <h2 className="text-3xl font-semibold mb-6 text-center">Experience</h2>
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 max-w-3xl mx-auto rounded-2xl shadow-xl">
          <div className="p-6">
            <h3 className="text-xl font-bold">Software Developer – ECG, Inc.</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">May 2023 – June 2025</p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
              <li>Built Angular UIs and Java backend services for VoIP app Alpaca</li>
              <li>Integrated REST APIs, WebSockets, and event-driven architecture</li>
              <li>Tested deployments using TeamCity and AWS environments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Skills & Education</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
              <p className="text-gray-700 dark:text-gray-400">JavaScript, TypeScript, Java, Python, Swift, C++</p>
              <p className="text-gray-700 dark:text-gray-400">React, Angular, Spring Boot, Node.js, CSS</p>
              <p className="text-gray-700 dark:text-gray-400">MongoDB, MySQL, Docker, Kubernetes, CI/CD</p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <p className="text-gray-700 dark:text-gray-400">B.S. in Computer Science – SNHU (2025)</p>
              <p className="text-gray-700 dark:text-gray-400">M.S. in Computer Science – GA Tech (2027)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-12 bg-gray-200 dark:bg-gray-950 text-center">
        <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-4">📧 iarepsher@gmail.com</p>
        <p className="text-gray-700 dark:text-gray-400 mb-4">📍 New York, NY</p>
        <a href="https://linkedin.com/in/ianrepsher" className="text-blue-500 dark:text-blue-400 hover:underline">LinkedIn</a>
      </section>
    </main>
  );
}
