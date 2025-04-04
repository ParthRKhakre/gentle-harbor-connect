
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DataInitializer from './components/DataInitializer.tsx';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataInitializer />
    <App />
  </React.StrictMode>
);
