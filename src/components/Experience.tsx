import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import './Experience.css'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
  technologies: string[]
}

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const experiences: ExperienceItem[] = [
    {
      title: 'Software Developer',
      company: 'Ellucian Banner Student',
      period: '2020 - Present',
      description: [
        'Designed, developed, and maintained PL/SQL packages, procedures, and triggers to support student lifecycle processes',
        'Customized Oracle Forms and Reports for Banner Student processes',
        'Automated batch processing using UNIX shell scripting',
        'Implemented Banner APIs and BAPIs for internal workflows and third-party integrations',
        'Performed SQL query tuning and data validation'
      ],
      technologies: ['PL/SQL', 'Oracle', 'UNIX', 'Git', 'Jenkins', 'Liquibase']
    },
    {
      title: 'Software Developer',
      company: 'Global Acceleration Team (Banner SaaS Migration)',
      period: '2021 - Present',
      description: [
        'Contributed to migration of Banner databases from Oracle to PostgreSQL',
        'Identified and resolved SaaS blockers including Oracle-specific PL/SQL functions',
        'Modified and maintained PRO*C programs for Banner batch processing',
        'Containerized services and integrated cloud infrastructure using AWS CDK'
      ],
      technologies: ['PostgreSQL', 'AWS CDK', 'Docker', 'PRO*C', 'SaaS Migration']
    },
    {
      title: 'Software Developer',
      company: 'Credit Recognition Project',
      period: '2022 - Present',
      description: [
        'Built responsive front-end components using React and TypeScript with Storybook',
        'Created scalable backend services and RESTful APIs using Node.js and PostgreSQL',
        'Provisioned cloud infrastructure using AWS CDK including Lambda and API Gateway',
        'Implemented unit tests with Jest and end-to-end automation with Playwright'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS CDK', 'Jest', 'Playwright']
    }
  ]

  return (
    <section id="experience" className="experience">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Professional Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setExpandedIndex(index)}
              onHoverEnd={() => setExpandedIndex(null)}
            >
              <div className="timeline-marker">
                <motion.div
                  className="timeline-dot"
                  animate={expandedIndex === index ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 0.5, repeat: expandedIndex === index ? Infinity : 0 }}
                />
                {index < experiences.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>
              <motion.div
                className="experience-card glass-card holographic-exp"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  rotateY: 2
                }}
                animate={expandedIndex === index ? {
                  boxShadow: [
                    "0 8px 32px rgba(0, 0, 0, 0.3)",
                    "0 12px 48px rgba(100, 108, 255, 0.4)",
                    "0 8px 32px rgba(0, 0, 0, 0.3)"
                  ]
                } : {}}
                transition={{ duration: 1, repeat: expandedIndex === index ? Infinity : 0 }}
              >
                <div className="experience-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <motion.span
                    className="period"
                    animate={expandedIndex === index ? { 
                      scale: [1, 1.1, 1],
                      color: ["rgba(255, 255, 255, 0.6)", "#646cff", "rgba(255, 255, 255, 0.6)"]
                    } : {}}
                    transition={{ duration: 1, repeat: expandedIndex === index ? Infinity : 0 }}
                  >
                    {exp.period}
                  </motion.span>
                </div>
                <motion.ul
                  className="experience-description"
                  initial={false}
                  animate={expandedIndex === index ? { 
                    transition: { staggerChildren: 0.1 }
                  } : {}}
                >
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={expandedIndex === index ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="experience-technologies">
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="tech-badge"
                      whileHover={{ 
                        scale: 1.15,
                        rotateZ: [0, -5, 5, 0]
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
