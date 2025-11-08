import { motion } from 'framer-motion'
import { useState } from 'react'
import './ResumeDownload.css'

const ResumeDownload = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement('a')
    link.href = '/SandeshPokhrelResume.pdf'
    link.download = 'SandeshPokhrelResume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  return (
    <motion.button
      className={`resume-download-btn ${isDownloading ? 'downloading' : ''}`}
      onClick={handleDownload}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="btn-content">
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          animate={isHovered ? { y: [0, -3, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <path
            d="M10 2.5V12.5M10 12.5L6.25 8.75M10 12.5L13.75 8.75M3.75 15H16.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
      </div>
      <div className="btn-glow"></div>
      {isDownloading && (
        <motion.div
          className="download-progress"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </motion.button>
  )
}

export default ResumeDownload

