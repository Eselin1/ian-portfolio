import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Portfolio from './Portfolio';
import { Analytics } from '@vercel/analytics/react';
import ThemeToggle from './ThemeToggle';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
    <ThemeToggle />
    <Analytics />
  </React.StrictMode>
);
