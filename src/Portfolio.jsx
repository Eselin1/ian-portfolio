import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Loading Component
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
    />
    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
  </motion.div>
);

// Header Component
const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    // { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Ian Repsher
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                className="w-full h-0.5 bg-current"
              />
              <motion.div
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="w-full h-0.5 bg-current"
              />
              <motion.div
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                className="w-full h-0.5 bg-current"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

// Blog Component
// const BlogSection = () => {
//   const [selectedPost, setSelectedPost] = useState(null);
  
//   const blogPosts = [
//     {
//       id: 1,
//       title: "Building Scalable VoIP Applications with Angular and Java",
//       excerpt: "Deep dive into the architecture decisions and challenges faced while building enterprise-grade VoIP software.",
//       date: "2024-12-15",
//       readTime: "8 min read",
//       tags: ["Angular", "Java", "VoIP", "Architecture"],
//       content: "This is where the full blog post content would go. In a real implementation, you'd fetch this from a CMS or markdown files.",
//       featured: true
//     },
//     {
//       id: 2,
//       title: "Modern React Patterns for Better Performance",
//       excerpt: "Exploring advanced React patterns including compound components, render props, and custom hooks.",
//       date: "2024-11-20",
//       readTime: "6 min read",
//       tags: ["React", "JavaScript", "Performance"],
//       content: "Full content about React patterns and optimization techniques.",
//       featured: false
//     },
//     {
//       id: 3,
//       title: "DevOps Best Practices for Small Teams",
//       excerpt: "How to implement CI/CD pipelines and infrastructure automation without overwhelming your team.",
//       date: "2024-10-10",
//       readTime: "10 min read",
//       tags: ["DevOps", "CI/CD", "AWS", "TeamCity"],
//       content: "Comprehensive guide to DevOps practices for smaller development teams.",
//       featured: false
//     }
//   ];

//   return (
//     <section id="blog" className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-4xl font-bold mb-12 text-center"
//         >
//           Blog & Insights
//         </motion.h2>
        
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {blogPosts.map((post) => (
//             <motion.article
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
//                 post.featured ? 'ring-2 ring-blue-500' : ''
//               }`}
//               onClick={() => setSelectedPost(post)}
//             >
//               <div className="p-6">
//                 {post.featured && (
//                   <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mb-3">
//                     Featured
//                   </span>
//                 )}
//                 <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
//                   <span>{new Date(post.date).toLocaleDateString()}</span>
//                   <span>{post.readTime}</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>

//         {/* Blog Post Modal */}
//         <AnimatePresence>
//           {selectedPost && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//               onClick={() => setSelectedPost(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
//                     <button
//                       onClick={() => setSelectedPost(null)}
//                       className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                   <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
//                     <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
//                     <span>{selectedPost.readTime}</span>
//                   </div>
//                   <div className="prose dark:prose-invert max-w-none">
//                     <p>{selectedPost.content}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// };

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Let's Connect
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-xl mb-8 opacity-90">
              I'm always interested in new opportunities and collaborations
            </p>
            
            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:iarepsher@gmail.com"
                className="flex items-center gap-3 text-lg"
              >
                📧 iarepsher@gmail.com
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://linkedin.com/in/ianrepsher"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg"
              >
                💼 LinkedIn Profile
              </motion.a>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-lg"
              >
                📍 New York, NY
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
                  placeholder="Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
                  placeholder="Email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70 resize-none"
                  placeholder="Something cool and interesting... I hope."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-3 rounded-lg text-center ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 text-green-100'
                      : 'bg-red-500/20 text-red-100'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Message sent successfully! I\'ll get back to you soon.'
                    : 'Something went wrong. Please try again or email me directly.'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Enhanced Projects Section with Links and Demos
const ProjectsSection = () => {
  const projects = [
    {
      title: "VoIP Application (Alpaca)",
      tech: ["Angular", "Java", "WebSockets", "REST APIs"],
      desc: "Enterprise VoIP application with real-time communication features and event-driven architecture.",
      category: "Professional",
      demoUrl: null, // Private/Enterprise project
      githubUrl: null, // Private repo
      caseStudyUrl: "#", // Could link to detailed case study
      status: "Live in Production"
    },
    {
      title: "Interactive Exploration Game",
      tech: ["JavaScript", "React", "State Management"],
      desc: "Interactive game showcasing complex UI state management and user interaction patterns.",
      category: "Personal",
      demoUrl: "https://game-demo.com",
      githubUrl: "https://github.com/username/exploration-game",
      caseStudyUrl: null,
      status: "Demo Available"
    },
    {
      title: "Professional Portfolio Sites",
      tech: ["React", "Tailwind", "Framer Motion", "Vite"],
      desc: "Modern, responsive portfolio websites with smooth animations.",
      category: "Professional",
      demoUrl: "https://ianrepsher.com",
      githubUrl: "https://github.com/username/portfolio",
      caseStudyUrl: null,
      status: "Live"
    },
    {
      title: "LinkedIn Data Scraper",
      tech: ["Python", "BeautifulSoup", "Data Analysis"],
      desc: "Automated tool for extracting and analyzing professional networking data.",
      category: "Personal",
      demoUrl: null, // CLI tool
      githubUrl: "https://github.com/username/linkedin-scraper",
      caseStudyUrl: null,
      status: "Open Source"
    }
  ];

  return (
    <section id="projects" className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      🚀 Live Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      💻 Code
                    </motion.a>
                  )}
                  {project.caseStudyUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.caseStudyUrl}
                      className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      📖 Case Study
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
export default function EnhancedPortfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center text-center py-24 px-4 min-h-screen pt-32">
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
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            Angular
          </span>
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
            React
          </span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
            VoIP
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </section>

      <ProjectsSection />

            {/* Skills Section */}
      <section id="skills" className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
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
            {Object.entries({
              frontend: ["JavaScript", "TypeScript", "React", "Angular", "CSS", "Tailwind"],
              backend: ["Java", "Spring Boot", "Node.js", "Python", "REST APIs", "WebSockets"],
              database: ["MongoDB", "MySQL", "Data Modeling"],
              devops: ["Docker", "Kubernetes", "CI/CD", "TeamCity", "AWS"],
              other: ["Swift", "C++", "Git", "Agile/Scrum"]
            }).map(([category, skillList], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 transition-transform"
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-center">
                  {category === 'devops' ? 'DevOps' : category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillList.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* <BlogSection /> */}

      {/* Experience Section */}
      <section id="experience" className="px-6 py-16">
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
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Master of Science</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Georgia Institute of Technology</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Expected 2027</p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Bachelor of Science</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Computer Science</p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Southern New Hampshire University</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">2025</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactForm />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © 2025 Ian Repsher. Built with React, Tailwind CSS.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}