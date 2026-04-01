import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import circleIcon from './Splash/img/CIRCLE-ICON.svg';
import flowerIcon from './Splash/img/FLOWER-ICON.svg';

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function Splash() {
  const [flowerRotation, setFlowerRotation] = useState(0);
  const [showScaryPortrait, setShowScaryPortrait] = useState(false);
  const [isAnimatingFlower, setIsAnimatingFlower] = useState(false);
  const animationTimersRef = useRef([]);

  useEffect(() => {
    return () => {
      animationTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      animationTimersRef.current = [];
    };
  }, []);

  const handleFlowerClick = () => {
    if (isAnimatingFlower) {
      return;
    }

    setIsAnimatingFlower(true);
    setFlowerRotation(540);

    animationTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    animationTimersRef.current = [];

    const showTimer = window.setTimeout(() => {
      setShowScaryPortrait(true);
    }, 120);

    const hideTimer = window.setTimeout(() => {
      setShowScaryPortrait(false);
      setFlowerRotation(0);
    }, 2200);

    const resetTimer = window.setTimeout(() => {
      setIsAnimatingFlower(false);
    }, 3300);

    animationTimersRef.current = [showTimer, hideTimer, resetTimer];
  };

  return (
    <section className="h-full w-full">
      <div className="h-full w-full bg-white transition-colors duration-300 dark:bg-zinc-800">
        {/* Grid */}
        <div className="grid h-full w-full grid-cols-1 gap-5 p-5 md:gap-6 md:p-6 lg:h-[calc(100vh-7.5rem)] lg:grid-cols-12 lg:grid-rows-[minmax(0,1.65fr)_minmax(0,1fr)]">
        {/* Left hero */}
          <section className="hidden lg:flex order-1 lg:col-start-1 lg:col-span-5 lg:row-start-1 h-full rounded-panel bg-sage border border-black/10 shadow-soft p-6 min-h-[240px] md:min-h-[300px] lg:min-h-[260px] flex-col justify-between">
            <div className="flex items-start justify-end">
              <button
                type="button"
                onClick={handleFlowerClick}
                aria-label="Trigger portrait animation"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <img
                  src={flowerIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-24 w-auto object-contain transition-transform duration-[1100ms] ease-in-out md:h-28"
                  style={{ transform: `rotate(${flowerRotation}deg)` }}
                />
              </button>
            </div>

            <h1
              className="font-jersey10 text-2xl md:text-4xl leading-tight"
              style={{ fontFamily: '"Jersey 10", system-ui, sans-serif' }}
            >
              Full-Stack Developer
              <br />
              Designing and Building
              <br />
              Thoughtful Digital
              <br />
              Products
            </h1>
          </section>

          {/* Middle avatar */}
          <section className="relative order-1 overflow-hidden rounded-panel border border-black/10 shadow-soft min-h-[240px] md:min-h-[300px] lg:col-start-6 lg:col-span-3 lg:row-start-1 lg:flex lg:min-h-[260px]">
            <img
              className="h-full w-full object-cover"
              src="/images/portrait.jpg"
              alt="Portrait illustration"
            />
            <img
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
                showScaryPortrait ? 'opacity-100' : 'opacity-0'
              }`}
              src="/images/scary.jpg"
              alt=""
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-panel border border-white/20 bg-black/40 p-4 text-white backdrop-blur-sm lg:hidden">
              <p
                className="font-jersey25 text-base leading-snug m-0"
                style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
              >
                I’m Ian, a software developer based in New York, NY. I enjoy building products where engineering and design meet. Creating experiences that feel intentional, usable, and human.
              </p>
            </div>
          </section>

          {/* Featured projects */}
          <section className="order-3 lg:col-start-9 lg:col-span-4 lg:row-span-2 h-full rounded-panel bg-sage border border-black/10 shadow-soft p-6 min-h-[240px] md:min-h-[300px] lg:min-h-[260px] flex flex-col">
            <div className="flex items-start justify-between">
              <div className="font-workbench tracking-wide text-sm md:text-base">Featured Projects</div>
              <NavLink
                to="/projects"
                className="h-10 w-10 rounded-full border border-black/15 bg-white/20 hover:bg-white/30 grid place-items-center"
                aria-label="View projects"
              >
                <ArrowIcon />
              </NavLink>
            </div>

            <div className="mt-4 overflow-hidden border border-black bg-black/5">
              <img className="block h-auto w-full" src="/images/featured.JPG" alt="Featured project preview" />
            </div>

            <div className="mt-5 border-b border-black/10 font-pixelify text-sm">
              <NavLink className="flex items-center justify-between py-6 hover:opacity-80" to="/projects">
                <span>E-Commerce Sites</span>
                <span className="opacity-60">—</span>
              </NavLink>
              <NavLink className="flex items-center justify-between border-t border-black/10 py-6 hover:opacity-80" to="/projects">
                <span>Portfolios</span>
                <span className="opacity-60">—</span>
              </NavLink>
              <NavLink className="flex items-center justify-between border-t border-black/10 py-6 hover:opacity-80" to="/projects">
                <span>iOS Applications</span>
                <span className="opacity-60">—</span>
              </NavLink>
            </div>

            <div className="mt-auto pt-6">
              <div className="grid grid-cols-3 gap-3">
                <a
                  className="rounded-panel bg-sage2 border border-black/10 shadow-soft px-4 py-3 flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20"
                  href="https://github.com/Eselin1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <img
                    src="/images/github-logo.png"
                    alt="GitHub"
                    className="h-8 w-auto object-contain invert dark:invert-0"
                  />
                </a>
                <a
                  className="rounded-panel bg-sage2 border border-black/10 shadow-soft px-4 py-3 flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20"
                  href="https://linkedin.com/in/ianrepsher"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="/images/linkedin.png"
                    alt="LinkedIn"
                    className="h-8 w-auto object-contain dark:invert"
                  />
                </a>
                <a
                  className="rounded-panel bg-sage2 border border-black/10 shadow-soft px-4 py-3 flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20"
                  href="mailto:ian@repsher.dev"
                  aria-label="Email Ian"
                >
                  <img
                    src="/images/mail.png"
                    alt="Email"
                    className="h-8 w-auto object-contain invert dark:invert-0"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="hidden order-2 h-full min-h-[165px] flex-col justify-between rounded-panel border border-black/10 bg-sage p-6 shadow-soft lg:col-start-1 lg:col-span-4 lg:row-start-2 lg:flex lg:min-h-[150px]">
            <div className="flex items-start justify-start">
              <img
                src={circleIcon}
                alt=""
                aria-hidden="true"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p
              className="font-jersey25 text-lg leading-snug max-w-md m-0"
              style={{ fontFamily: '"Jersey 25", system-ui, sans-serif' }}
            >
              I’m Ian, a software developer based in New York, NY. I enjoy building products where engineering and design meet. Creating experiences that feel intentional, usable, and human.
            </p>
          </section>

          {/* Contact */}
          <NavLink
            to="/contact"
            className="order-4 lg:col-start-5 lg:col-span-4 lg:row-start-2 h-full rounded-panel bg-deep text-paper border border-black/10 shadow-soft p-6 min-h-[165px] lg:min-h-[150px] flex flex-col justify-between transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-paper/60"
            aria-label="Go to contact page"
          >
            <div className="flex items-start justify-between">
              <div className="font-pixelify text-xs tracking-wide opacity-90">Have some questions?</div>
              <div
                className="h-10 w-10 rounded-full border border-paper/20 bg-paper/10 grid place-items-center"
                aria-hidden="true"
              >
                <ArrowIcon />
              </div>
            </div>

            <h2 className="font-pixelify text-4xl md:text-5xl tracking-wide m-0">Contact me</h2>
          </NavLink>

        </div>
      </div>
    </section>
  );
}
