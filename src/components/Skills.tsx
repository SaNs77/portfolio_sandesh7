import { motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import './Skills.css'

interface SkillCategory {
  title: string
  skills: string[]
  icon: string
  level: number
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: '💻',
      level: 95,
      skills: ['Java', 'PL/SQL', 'TypeScript', 'JavaScript', 'SQL', 'Python']
    },
    {
      title: 'Databases',
      icon: '🗄️',
      level: 90,
      skills: ['Oracle', 'PostgreSQL', 'MySQL']
    },
    {
      title: 'Frontend',
      icon: '🎨',
      level: 88,
      skills: ['React', 'HTML', 'CSS', 'Storybook']
    },
    {
      title: 'Backend',
      icon: '⚙️',
      level: 92,
      skills: ['Node.js', 'REST APIs', 'Express']
    },
    {
      title: 'DevOps & Cloud',
      icon: '☁️',
      level: 85,
      skills: ['AWS CDK', 'Liquibase', 'Jenkins', 'Git', 'WinSCP', 'Docker']
    },
    {
      title: 'Testing & Tools',
      icon: '🧪',
      level: 87,
      skills: ['Jest', 'Playwright', 'SonarQube', 'Agile/Scrum', 'SaaS Migration', 'PRO*C']
    }
  ]

  return (
    <section id="skills" className="skills">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category glass-card holographic"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                z: 50
              }}
              style={{ perspective: 1000 }}
            >
              <div className="skill-header">
                <span className="skill-icon">{category.icon}</span>
                <div>
                  <h3>{category.title}</h3>
                  <div className="skill-level-bar">
                    <motion.div
                      className="skill-level-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${category.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                    <span className="skill-level-text">{category.level}%</span>
                  </div>
                </div>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className={`skill-tag ${hoveredSkill === skill ? 'active' : ''}`}
                    whileHover={{ 
                      scale: 1.15,
                      rotateZ: [0, -5, 5, 0],
                      zIndex: 10
                    }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {skill}
                    {hoveredSkill === skill && (
                      <motion.span
                        className="skill-glow"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: [0, 1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
