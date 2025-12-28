import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StellariumSky from '../components/StellariumSky';
import DaySky from '../components/DaySky';

export default function Hero({ onTemperatureChange }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayMode, setDisplayMode] = useState(false); // What's currently shown
  const [transitionStage, setTransitionStage] = useState(0); // 0 = no transition, 1-36 = gradient stages
  const [transitionDirection, setTransitionDirection] = useState(null); // 'toDark' or 'toLight'
  const [dayTooltipData, setDayTooltipData] = useState(null);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const newMode = document.documentElement.classList.contains('dark');
      
      if (newMode !== isDarkMode) {
        // Start transition sequence
        setTransitionDirection(newMode ? 'toDark' : 'toLight');
        
        // 36 gradient stages at 90ms each (3.24s total)
        const stageDelay = 90;
        const totalStages = 36;
        
        // Run gradient animation immediately
        for (let i = 1; i <= totalStages; i++) {
          setTimeout(() => setTransitionStage(i), i * stageDelay);
        }
        
        // Switch display mode halfway through gradient (new sky starts fading in)
        setTimeout(() => {
          setDisplayMode(newMode);
        }, (totalStages / 2) * stageDelay);
        
        // Update isDarkMode and reset after gradient completes
        setTimeout(() => {
          setIsDarkMode(newMode);
          setTransitionStage(0);
          setTransitionDirection(null);
        }, totalStages * stageDelay + 100);
      }
    };
    
    const initialMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(initialMode);
    setDisplayMode(initialMode);
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, [isDarkMode]);

  const getBackground = () => {
    // If not transitioning, use final state
    if (!transitionDirection) {
      return isDarkMode 
        ? 'linear-gradient(to bottom, rgb(9, 9, 11), rgb(9, 9, 11), rgb(9, 9, 11))'
        : 'linear-gradient(to bottom, rgb(219, 234, 254), rgb(239, 246, 255), rgb(255, 255, 255))';
    }
    
    // During transition, if stage hasn't started yet, show starting color
    if (transitionStage === 0) {
      return transitionDirection === 'toDark'
        ? 'linear-gradient(to bottom, rgb(219, 234, 254), rgb(239, 246, 255), rgb(255, 255, 255))' // Start from light
        : 'linear-gradient(to bottom, rgb(9, 9, 11), rgb(9, 9, 11), rgb(9, 9, 11))'; // Start from dark
    }
    
    // Transition stages - 36 stages for buttery smooth animation
    if (transitionDirection === 'toDark') {
      // Day → Night (Sunset sequence)
      const sunsetStages = [
        'rgb(255, 252, 245), rgb(255, 248, 238), rgb(255, 245, 232)',
        'rgb(255, 245, 228), rgb(255, 242, 220), rgb(255, 238, 215)',
        'rgb(255, 238, 210), rgb(255, 235, 202), rgb(255, 230, 195)',
        'rgb(255, 230, 190), rgb(255, 225, 182), rgb(255, 220, 175)',
        'rgb(255, 220, 170), rgb(255, 215, 162), rgb(255, 210, 155)',
        'rgb(255, 208, 150), rgb(255, 203, 142), rgb(255, 198, 135)',
        'rgb(255, 195, 130), rgb(255, 190, 122), rgb(255, 185, 115)',
        'rgb(255, 182, 110), rgb(255, 178, 102), rgb(255, 174, 95)',
        'rgb(255, 170, 90), rgb(255, 165, 85), rgb(255, 162, 80)',
        'rgb(255, 158, 75), rgb(255, 154, 70), rgb(255, 150, 66)',
        'rgb(255, 146, 62), rgb(255, 142, 58), rgb(255, 138, 55)',
        'rgb(255, 134, 52), rgb(255, 128, 50), rgb(255, 124, 48)',
        'rgb(255, 118, 48), rgb(255, 112, 48), rgb(255, 106, 50)',
        'rgb(255, 102, 52), rgb(254, 96, 54), rgb(252, 92, 56)',
        'rgb(250, 88, 58), rgb(248, 84, 60), rgb(245, 80, 62)',
        'rgb(242, 76, 64), rgb(240, 72, 66), rgb(236, 68, 68)',
        'rgb(233, 64, 70), rgb(230, 60, 72), rgb(226, 57, 74)',
        'rgb(223, 54, 76), rgb(220, 50, 78), rgb(216, 48, 80)',
        'rgb(212, 45, 82), rgb(208, 42, 85), rgb(205, 40, 88)',
        'rgb(202, 38, 90), rgb(198, 35, 93), rgb(194, 33, 96)',
        'rgb(190, 31, 99), rgb(186, 30, 103), rgb(182, 30, 108)',
        'rgb(178, 31, 112), rgb(174, 32, 117), rgb(170, 34, 122)',
        'rgb(166, 36, 127), rgb(162, 38, 132), rgb(158, 40, 136)',
        'rgb(154, 42, 140), rgb(150, 43, 145), rgb(145, 44, 150)',
        'rgb(140, 45, 155), rgb(136, 46, 160), rgb(132, 46, 165)',
        'rgb(126, 46, 170), rgb(122, 45, 174), rgb(118, 44, 178)',
        'rgb(112, 43, 180), rgb(108, 42, 178), rgb(102, 40, 174)',
        'rgb(96, 38, 168), rgb(90, 35, 162), rgb(84, 32, 156)',
        'rgb(78, 30, 148), rgb(72, 27, 140), rgb(68, 25, 132)',
        'rgb(62, 22, 122), rgb(58, 20, 114), rgb(52, 18, 105)',
        'rgb(48, 16, 96), rgb(44, 14, 88), rgb(40, 13, 80)',
        'rgb(36, 12, 72), rgb(32, 11, 64), rgb(28, 10, 58)',
        'rgb(25, 9, 52), rgb(22, 8, 46), rgb(20, 8, 42)',
        'rgb(18, 7, 38), rgb(15, 7, 34), rgb(13, 6, 30)',
        'rgb(12, 6, 26), rgb(10, 6, 22), rgb(9, 7, 18)',
        'rgb(9, 8, 14), rgb(9, 8, 12), rgb(9, 9, 11)'
      ];
      const index = Math.min(transitionStage - 1, sunsetStages.length - 1);
      return `linear-gradient(to bottom, ${sunsetStages[index]})`;
    } else {
      // Night → Day (Sunrise sequence)
      const sunriseStages = [
        'rgb(9, 8, 14), rgb(9, 7, 16), rgb(9, 6, 18)',
        'rgb(9, 5, 20), rgb(10, 6, 22), rgb(12, 6, 26)',
        'rgb(13, 6, 30), rgb(15, 7, 34), rgb(18, 7, 38)',
        'rgb(20, 8, 42), rgb(22, 8, 46), rgb(25, 9, 52)',
        'rgb(28, 10, 58), rgb(32, 11, 64), rgb(36, 12, 72)',
        'rgb(40, 13, 80), rgb(44, 14, 88), rgb(48, 16, 96)',
        'rgb(52, 18, 105), rgb(58, 20, 114), rgb(62, 22, 122)',
        'rgb(68, 25, 132), rgb(72, 27, 140), rgb(78, 30, 148)',
        'rgb(84, 32, 156), rgb(90, 35, 162), rgb(96, 38, 168)',
        'rgb(102, 40, 174), rgb(108, 42, 178), rgb(112, 43, 180)',
        'rgb(118, 44, 178), rgb(122, 45, 174), rgb(126, 46, 170)',
        'rgb(132, 46, 165), rgb(136, 46, 160), rgb(140, 45, 155)',
        'rgb(145, 44, 150), rgb(150, 43, 145), rgb(154, 42, 140)',
        'rgb(158, 40, 136), rgb(162, 38, 132), rgb(166, 36, 127)',
        'rgb(172, 40, 125), rgb(178, 48, 125), rgb(185, 58, 125)',
        'rgb(192, 68, 125), rgb(200, 78, 125), rgb(208, 88, 128)',
        'rgb(216, 98, 132), rgb(224, 108, 136), rgb(232, 118, 140)',
        'rgb(240, 128, 144), rgb(246, 138, 148), rgb(252, 148, 152)',
        'rgb(255, 155, 152), rgb(255, 162, 154), rgb(255, 169, 156)',
        'rgb(255, 176, 158), rgb(255, 183, 162), rgb(255, 190, 166)',
        'rgb(255, 196, 170), rgb(255, 202, 175), rgb(255, 208, 180)',
        'rgb(255, 214, 186), rgb(255, 220, 192), rgb(255, 225, 197)',
        'rgb(255, 230, 202), rgb(255, 235, 208), rgb(255, 238, 213)',
        'rgb(255, 241, 218), rgb(255, 244, 223), rgb(255, 246, 228)',
        'rgb(255, 248, 232), rgb(254, 250, 236), rgb(253, 251, 240)',
        'rgb(252, 252, 243), rgb(251, 252, 245), rgb(250, 252, 247)',
        'rgb(248, 251, 249), rgb(246, 250, 250), rgb(244, 249, 251)',
        'rgb(242, 248, 252), rgb(240, 247, 253), rgb(238, 246, 254)',
        'rgb(236, 245, 254), rgb(234, 244, 254), rgb(232, 243, 254)',
        'rgb(230, 242, 254), rgb(228, 241, 254), rgb(226, 240, 254)',
        'rgb(224, 239, 254), rgb(223, 238, 254), rgb(222, 237, 254)',
        'rgb(221, 236, 254), rgb(220, 236, 254), rgb(220, 235, 254)',
        'rgb(220, 235, 254), rgb(220, 235, 255), rgb(220, 236, 255)',
        'rgb(222, 237, 255), rgb(225, 239, 255), rgb(228, 241, 255)',
        'rgb(232, 243, 255), rgb(236, 245, 255), rgb(239, 246, 255)',
        'rgb(219, 234, 254), rgb(239, 246, 255), rgb(255, 255, 255)'
      ];
      const index = Math.min(transitionStage - 1, sunriseStages.length - 1);
      return `linear-gradient(to bottom, ${sunriseStages[index]})`;
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen overflow-hidden"
      style={{
        background: getBackground(),
        transition: 'background 90ms ease-in-out'
      }}
    >
      {/* Sky layers with overlapping transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          {displayMode ? (
            <motion.div
              key="night"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.62, // Half of gradient duration (36 * 90ms / 2)
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <StellariumSky />
            </motion.div>
          ) : (
            <motion.div
              key="day"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.62, // Half of gradient duration
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <DaySky onTooltipChange={setDayTooltipData} onTemperatureChange={onTemperatureChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle color overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 bg-gradient-to-b from-green-600/5 dark:from-orange-600/5 via-transparent to-transparent pointer-events-none"
      />

      {/* Day sky tooltip overlay */}
      {!displayMode && dayTooltipData && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${Math.max(110, Math.min(dayTooltipData.x, window.innerWidth - 110))}px`,
            top: `${dayTooltipData.y - 100}px`,
            transform: 'translate(-50%, 0)'
          }}
        >
          <div className="bg-black/85 text-white px-3 py-2 rounded-md text-sm">
            <div className="mb-1">Time: {dayTooltipData.time}</div>
            <div className="mb-1">Phase: {dayTooltipData.phase}</div>
            <div>{dayTooltipData.countdown}</div>
          </div>
        </div>
      )}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 text-sm uppercase tracking-widest text-green-600 dark:text-orange-400 mb-3 transition-colors duration-[5500ms] pointer-events-none"
      >
        Hello, World
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white transition-colors duration-[5500ms] pointer-events-none"
      >
        I'm Ian Repsher
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 transition-colors duration-[5500ms] pointer-events-none"
      >
        Full Stack Developer
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative z-10 flex gap-4 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          className="border border-gray-400 dark:border-zinc-600 hover:bg-red-600 dark:hover:bg-orange-600 hover:border-red-600 dark:hover:border-orange-600 hover:text-white text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 w-[180px]"
        >
          View My Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="border border-gray-400 dark:border-zinc-600 hover:bg-red-600 dark:hover:bg-orange-600 hover:border-red-600 dark:hover:border-orange-600 hover:text-white text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 w-[180px]"
        >
          Get in Touch
        </motion.button>
      </motion.div>
    </section>
  );
}
