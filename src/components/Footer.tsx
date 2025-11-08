import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sandesh-pokhrel-19978b1a5', icon: '💼' },
    { name: 'Email', url: 'mailto:sandeshpokharel47@gmail.com', icon: '📧' },
    { name: 'Phone', url: 'tel:+919902312853', icon: '📱' }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>&copy; {currentYear} Sandesh Pokhrel. All rights reserved.</p>
          <p className="footer-tagline">Built with React, TypeScript & Three.js</p>
        </motion.div>
        <div className="footer-links">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="footer-link"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="footer-icon">{link.icon}</span>
              <span className="footer-link-text">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
