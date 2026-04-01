import React from 'react';
import { NavLink } from 'react-router-dom';

import ThemeToggle from '../ThemeToggle';

export default function TopNav() {
  const linkBase =
    'px-4 py-2 rounded-full text-xs tracking-wideish font-pixelify transition-colors duration-200';
  const active = 'bg-sage2/70 text-ink border border-black/10 shadow-soft dark:text-zinc-100';
  const inactive = 'bg-white/10 hover:bg-white/20 text-ink border border-black/10 dark:text-zinc-100';

  return (
    <header className="sticky top-0 z-40">
      <div className="w-full px-5 pt-5 md:px-6 md:pt-6">
        <div className="w-full rounded-panel bg-sage border border-black/10 shadow-soft px-5 py-4 flex items-center justify-between">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'} font-workbench tracking-wideish text-lg dark:text-zinc-100`
            }
            aria-label="Home"
          >
            IAN REPSHER
          </NavLink>

          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-3">
              <NavLink
                to="/projects"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                PROJECTS
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                CONTACT
              </NavLink>
              {/* <NavLink
                to="/capstone"
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                CAPSTONE
              </NavLink> */}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden mt-3 flex gap-2 w-full">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex-1 text-center`
            }
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex-1 text-center`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive} flex-1 text-center`
            }
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </header>
  );
}
