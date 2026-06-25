import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* ── Self-hosted fonts (no Google Fonts needed) ── */
import '@fontsource/rubik/hebrew-400.css';
import '@fontsource/rubik/hebrew-500.css';
import '@fontsource/rubik/hebrew-600.css';
import '@fontsource/rubik/hebrew-700.css';
import '@fontsource/rubik/hebrew-800.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import '@fontsource/rubik/800.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';

import './styles/globals.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
