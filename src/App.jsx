import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Splash from './Splash';
import Capstone from './Capstone';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import TopNav from './components/TopNav';

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black transition-colors duration-300 dark:bg-zinc-800 dark:text-zinc-100">
      <TopNav />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/capstone" element={<Capstone />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
