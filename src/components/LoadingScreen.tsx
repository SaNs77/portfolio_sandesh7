import { useEffect, useState } from 'react'
import './LoadingScreen.css'

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <span className="logo-sp">SP</span>
        </div>
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Loading Portfolio...</p>
      </div>
    </div>
  )
}

export default LoadingScreen

