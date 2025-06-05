import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import logo from "../images/logo.svg"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <img src={logo} alt="" />
    <App />
  </StrictMode>,
)
