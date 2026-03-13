import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { VideoConfigProvider } from './VideoConfig';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoConfigProvider>
      <App />
    </VideoConfigProvider>
  </StrictMode>,
);
