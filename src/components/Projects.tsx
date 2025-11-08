import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import './Projects.css'

interface Project {
  title: string
  description: string
  technologies: string[]
  features: string[]
  category: string
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const isMobile = useIsMobile()

  const projects: Project[] = [
    {
      title: 'Automatic HTML Code Generator from Mockups',
      description: 'A machine learning-based tool that converts hand-drawn web page designs into HTML code using computer vision and deep learning techniques.',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'MySQL'],
      features: [
        'ML model training for image recognition',
        'Automated HTML code generation',
        'Mockup image processing'
      ],
      category: 'Machine Learning'
    },
    {
      title: 'ATM Simulator',
      description: 'A comprehensive web application simulating real-world ATM operations with secure transaction handling and database integration.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      features: [
        'User authentication',
        'Transaction processing',
        'Database integration'
      ],
      category: 'Web Application'
    },
    {
      title: 'Online Hotel Room Booking Website',
      description: 'A dynamic and user-friendly website for hotel room booking with real-time availability checking and reservation management.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'SQL'],
      features: [
        'Room availability system',
        'Booking management',
        'User-friendly interface'
      ],
      category: 'E-Commerce'
    }
  ]

  return (
    <section id="projects" className="projects">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => {
            const x = useMotionValue(0)
            const y = useMotionValue(0)
            const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
            const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

            return (
              <motion.div
                key={index}
                className="project-card glass-card holographic-3d"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={!isMobile ? { 
                  y: -15,
                  scale: 1.03,
                  z: 100
                } : {}}
                onHoverStart={() => !isMobile && setHoveredProject(index)}
                onHoverEnd={() => !isMobile && setHoveredProject(null)}
                style={!isMobile ? { 
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  perspective: 1000
                } : {}}
                onMouseMove={!isMobile ? (e) => {
                  // Throttle mouse move for better performance
                  const rect = e.currentTarget.getBoundingClientRect()
                  const centerX = rect.left + rect.width / 2
                  const centerY = rect.top + rect.height / 2
                  const newX = (e.clientX - centerX) / rect.width
                  const newY = (e.clientY - centerY) / rect.height
                  // Use requestAnimationFrame for smoother updates
                  requestAnimationFrame(() => {
                    x.set(newX)
                    y.set(newY)
                  })
                } : undefined}
                onMouseLeave={!isMobile ? () => {
                  x.set(0)
                  y.set(0)
                } : undefined}
                onTouchStart={() => isMobile && setHoveredProject(index)}
                onTouchEnd={() => isMobile && setHoveredProject(null)}
              >
                <div className="project-header">
                  <div className="project-category">{project.category}</div>
                  <motion.div 
                    className="project-number"
                    animate={hoveredProject === index ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    } : {}}
                    transition={{ duration: 1, repeat: hoveredProject === index ? Infinity : 0, repeatDelay: 0.5 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={hoveredProject === index ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag"
                      whileHover={{ 
                        scale: 1.2,
                        rotateZ: [0, -10, 10, 0]
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={hoveredProject === index ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: techIndex * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                {hoveredProject === index && (
                  <motion.div
                    className="project-hologram-effect"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
