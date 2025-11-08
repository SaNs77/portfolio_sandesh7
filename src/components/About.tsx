import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    { number: '4+', label: 'Years Experience', color: '#646cff' },
    { number: '10+', label: 'Technologies', color: '#ff6b9d' },
    { number: '100%', label: 'Dedicated', color: '#646cff' }
  ]

  return (
    <section id="about" className="about">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="about-container"
      >
        <h2>About Me</h2>
        <div className="about-content">
          <motion.div
            className="about-card glass-card holographic-about"
            whileHover={{ 
              scale: 1.02,
              rotateY: 2
            }}
            initial={{ rotateX: -5 }}
            animate={inView ? { rotateX: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="about-text">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                I'm a <span className="highlight">Software Developer</span> with <span className="highlight">4+ years of experience</span> at Ellucian, 
                specializing in <span className="highlight">Banner ERP</span>, <span className="highlight">SaaS migration</span>, and 
                <span className="highlight"> cloud-native development</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                My expertise lies in modernizing legacy systems, resolving SaaS blockers, and delivering scalable, 
                upgrade-safe code across enterprise platforms. I'm passionate about transforming complex problems 
                into elegant, maintainable solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                With strong backgrounds in <span className="highlight">PL/SQL</span>, <span className="highlight">PostgreSQL</span>, 
                <span className="highlight"> React</span>, <span className="highlight">Node.js</span>, and <span className="highlight">AWS CDK</span>, 
                I bring a comprehensive approach to full-stack development and cloud infrastructure.
              </motion.p>
            </div>
            <div className="about-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                >
                  <motion.div
                    className="stat-number"
                    animate={hoveredStat === index ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color === '#646cff' ? '#ff6b9d' : '#646cff'} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    className="stat-label"
                    animate={hoveredStat === index ? { color: stat.color } : {}}
                  >
                    {stat.label}
                  </motion.div>
                  {hoveredStat === index && (
                    <motion.div
                      className="stat-glow"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ background: `radial-gradient(circle, ${stat.color}40 0%, transparent 70%)` }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
