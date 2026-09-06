import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initVisitorTelemetry } from './lib/telemetry'

// Initialize comprehensive visitor analytics & telemetry tracking
initVisitorTelemetry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

