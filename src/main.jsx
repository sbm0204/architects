import { createRoot } from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react'
import Router from './routes/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
