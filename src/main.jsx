// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App'; // No .jsx extension

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);