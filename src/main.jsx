import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Portfolio from './Portfolio';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
    <Analytics />
  </React.StrictMode>
);
