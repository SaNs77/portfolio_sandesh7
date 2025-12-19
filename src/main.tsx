import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

// Show loading screen initially
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <LoadingScreen />
    <App />
  </React.StrictMode>,
)

