import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Role from './role.jsx'
import RegisterProfessional from './registerProfessional.jsx'
import RegisterPatient from './registerPatient.jsx'
import Learn from './Learn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/role" element={<Role />} />
        <Route path="/register-professional" element={<RegisterProfessional />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/health-checkup" element={<Learn />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
