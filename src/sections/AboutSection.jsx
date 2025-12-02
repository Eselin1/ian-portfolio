import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const skillLogos = [
  { name: 'JavaScript', logo: '/images/js.png', color: 'text-yellow-500' },
  { name: 'HTML', logo: '/images/html.png', color: 'text-orange-500' },
  { name: 'CSS', logo: '/images/css.png', color: 'text-blue-500' },
  { name: 'React', logo: '/images/react.png', color: 'text-blue-400' },
  { name: 'Node.js', logo: '/images/node.png', color: 'text-green-400' },
  { name: 'Express', logo: '/images/express.png', color: 'text-gray-500' },
  { name: 'Python', logo: '/images/py.png', color: 'text-blue-600' },
  { name: 'MongoDB', logo: '/images/mongo.png', color: 'text-green-600' },
  { name: 'Git', logo: '/images/git.png', color: 'text-orange-500' },
  { name: 'Swift', logo: '/images/swift.png', color: 'text-orange-500' },
  { name: 'Angular', logo: '/images/angular.png', color: 'text-red-600' },
  { name: 'NPM', logo: '/images/npm.png', color: 'text-red-500' }
];

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="about" className="py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold inline-block relative">
            <span className="relative z-10">About</span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 left-5 h-4 bg-green-600 dark:bg-purple-600 rounded z-0"
            />
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="relative flex items-center justify-center min-h-[800px]"
        >
          {/* Desktop: Circular Tech Icons */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full flex items-center justify-center" style={{ marginLeft: '-40px' }}>
              <div className="relative w-[800px] h-[800px]">
              {skillLogos.map((skill, index) => {
                const angle = (index * 360) / skillLogos.length;
                const radius = 380;
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                
                // Clockwise animation with faster timing
                const clockwiseDelay = index * 0.05;
                
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0
                    }}
                    transition={{ 
                      delay: clockwiseDelay, 
                      type: "spring",
                      stiffness: 120,
                      damping: 12
                    }}
                    whileHover={{ scale: 1.2 }}
                    viewport={{ once: true, amount: 0.2, margin: "200px 0px 0px 0px" }}
                    className="absolute group pointer-events-auto w-20 h-20"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    }}
                    title={skill.name}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-full h-full object-contain transition-all duration-300"
                      style={{ imageRendering: 'auto' }}
                      onError={(e) => console.error(`Failed to load: ${skill.name} - ${skill.logo}`)}
                    />
                  </motion.div>
                );
              })}
              </div>
            </div>
          </div>

          {/* Mobile: Side Stack */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 flex flex-col justify-center gap-4 pl-4 pointer-events-none">
            {skillLogos.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="pointer-events-auto w-12 h-12"
                title={skill.name}
              >
                <img 
                  src={skill.logo} 
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                  onError={(e) => console.error(`Failed to load: ${skill.name} - ${skill.logo}`)}
                />
              </motion.div>
            ))}
          </div>

          {/* Centered Description */}
          <motion.div 
            variants={itemVariants} 
            className="relative z-10 max-w-xl mx-auto px-4 md:px-4"
          >
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src="/images/avatar.svg" 
                  alt="Ian Repsher" 
                  className="w-32 h-32 drop-shadow-lg dark:brightness-0 dark:invert"
                />
              </div>
              
              <p className="text-lg leading-relaxed">
                Driven by curiosity — I'm a software engineer who builds with intention and learns fast. Frontend is where I thrive: crafting responsive UIs, obsessing over animations, and turning designs into production-ready interfaces. Whether it's Angular or React, I make things feel fast and look clean.
              </p>
              
              <p className="text-lg leading-relaxed">
                On the flipside, I can build a backend with scalable APIs, integrate WebSockets and RESTful services, and make systems work under pressure. With 2 years shipping enterprise VoIP applications, I'm just as comfortable architecting Spring Boot services as I am wrangling databases or automating deployments.
              </p>
              
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-6 border border-gray-300 dark:border-zinc-600 hover:bg-green-600 dark:hover:bg-purple-600 hover:border-green-600 dark:hover:border-purple-600 hover:text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}