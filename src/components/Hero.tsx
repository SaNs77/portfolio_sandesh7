import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ResumeDownload from './ResumeDownload'
import './Hero.css'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background-gradient"></div>
      <motion.div
        ref={ref}
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="hero-greeting" variants={itemVariants}>
          <span className="greeting-text">Hello, I'm</span>
        </motion.div>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="name-gradient">Sandesh Pokhrel</span>
        </motion.h1>
        
        <motion.div className="hero-subtitle-wrapper" variants={itemVariants}>
          <span className="hero-subtitle">
            Software Developer
          </span>
          <span className="hero-subtitle-accent">•</span>
          <span className="hero-subtitle">
            Cloud-Native Specialist
          </span>
          <span className="hero-subtitle-accent">•</span>
          <span className="hero-subtitle">
            Full Stack Engineer
          </span>
        </motion.div>
        
        <motion.p className="hero-description" variants={itemVariants}>
          Transforming legacy systems into modern, scalable solutions.
          <br />
          <span className="highlight-text">4+ years</span> of experience in SaaS migration, cloud infrastructure, and enterprise development.
        </motion.p>
        
        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(100, 108, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(100, 108, 255, 0.3)",
                "0 15px 40px rgba(100, 108, 255, 0.5)",
                "0 10px 30px rgba(100, 108, 255, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>View My Work</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(100, 108, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>
        
        <motion.div className="hero-resume-download" variants={itemVariants}>
          <ResumeDownload />
        </motion.div>

        <motion.div className="hero-location" variants={itemVariants}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 14C10 11 14 8.5 14 6C14 3.79086 11.3137 2 8 2C4.68629 2 2 3.79086 2 6C2 8.5 6 11 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>Bengaluru, India</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
