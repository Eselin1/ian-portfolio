import { useEffect, useRef, useState } from 'react';

export default function useActiveSection(initial = 'home') {
  const [activeSection, setActiveSection] = useState(initial);

  const retryTimerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const sectionIds = ['home', 'projects', 'experience', 'skills', 'education', 'contact'];

    const setupObserver = () => {
      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((x) => x.el);

      if (elements.length === 0) {
        // Sections may not be in DOM yet (e.g., initial loading spinner). Retry shortly.
        retryTimerRef.current = window.setTimeout(setupObserver, 250);
        return;
      }

      // Use IntersectionObserver to determine the most visible section.
      // Root margin biases the center of the viewport to account for sticky header.
      const options = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      };

      const visibility = new Map();

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Pick the section with the highest ratio above a tiny threshold
        let bestId = activeSection;
        let bestRatio = 0;
        sectionIds.forEach((id) => {
          const r = visibility.get(id) || 0;
          if (r > bestRatio + 0.001) {
            bestRatio = r;
            bestId = id;
          }
        });

        if (bestRatio > 0 || window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
          const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
          setActiveSection(atBottom ? 'contact' : bestId);
        }
      }, options);

      elements.forEach(({ el }) => observerRef.current.observe(el));
      elements.forEach(({ id }) => visibility.set(id, 0));
    };

    setupObserver();

    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [activeSection, setActiveSection];
}
