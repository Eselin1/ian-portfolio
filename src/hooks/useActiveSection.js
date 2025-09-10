import { useEffect, useState } from 'react';

export default function useActiveSection(initial = 'home') {
  const [activeSection, setActiveSection] = useState(initial);

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

  return [activeSection, setActiveSection];
}

