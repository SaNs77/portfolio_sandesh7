import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <motion.div
          className="logo"
          onClick={() => scrollToSection('hero')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollToSection('hero')
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Go to home"
          whileHover={{ scale: 1.05, rotateZ: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.95 }}
          animate={{
            textShadow: [
              "0 0 10px rgba(100, 108, 255, 0.5)",
              "0 0 20px rgba(100, 108, 255, 0.8)",
              "0 0 10px rgba(100, 108, 255, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="logo-text"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            SP
          </motion.span>
          <span className="logo-gradient">Portfolio</span>
        </motion.div>
        <ul id="nav-links" className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className="nav-link"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="nav-links"
        >
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </button>
      </nav>
    </motion.header>
  )
}

export default Header
