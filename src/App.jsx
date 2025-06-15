import React from 'react';
import Portfolio from './Portfolio';
import ThemeToggle from './ThemeToggle';
import DevOpsDashboard from './DevOpsDashboard';

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Portfolio />
      <DevOpsDashboard />
    </>
  );
}