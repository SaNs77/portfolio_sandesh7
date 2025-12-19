import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import getEmailJSConfig from '../config/emailjs.config'
import './Contact.css'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Reset status when user types
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Get EmailJS configuration from centralized config
      const emailConfig = getEmailJSConfig()
      
      if (!emailConfig) {
        throw new Error(
          'EmailJS is not configured. ' +
          'Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file. ' +
          'Quick setup: 1) Sign up at https://www.emailjs.com/ (free), ' +
          '2) Create service & template, 3) Add credentials to .env file. ' +
          'See QUICK_SETUP.md for detailed steps (takes 5 minutes).'
        )
      }

      const { serviceId, templateId, publicKey } = emailConfig

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'sandeshpokharel47@gmail.com',
          reply_to: formData.email,
        },
        publicKey
      )

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error: any) {
      // Error handling
      // Only log errors in development
      if (import.meta.env.MODE === 'development') {
        console.error('EmailJS Error:', error)
      }
      setSubmitStatus('error')
      setErrorMessage(
        error.text || 
        error.message ||
        'Failed to send message. Please try again or contact me directly at sandeshpokharel47@gmail.com'
      )
      setIsSubmitting(false)
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'sandeshpokharel47@gmail.com', link: 'mailto:sandeshpokharel47@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 9902312853', link: 'tel:+919902312853' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/sandesh-pokhrel-19978b1a5', link: 'https://linkedin.com/in/sandesh-pokhrel-19978b1a5' },
    { icon: '📍', label: 'Location', value: 'Bengaluru, India', link: null }
  ]

  return (
    <section id="contact" className="contact">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2>Get In Touch</h2>
        <p className="contact-intro">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          Let's build something amazing together!
        </p>
        <div className="contact-content">
          <motion.form
            className="contact-form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            noValidate
            aria-label="Contact form"
          >
            <h3>Send a Message</h3>
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {submitStatus === 'success' && 'Message sent successfully'}
              {submitStatus === 'error' && `Error: ${errorMessage || 'Failed to send message'}`}
              {isSubmitting && 'Sending message...'}
            </div>
            {submitStatus === 'success' && (
              <motion.div
                className="form-message success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="polite"
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                className="form-message error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="assertive"
              >
                ✗ {errorMessage || 'Something went wrong. Please try again or contact me directly.'}
              </motion.div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Your message here..."
                disabled={isSubmitting}
              />
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { 
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(100, 108, 255, 0.5)"
              } : {}}
              whileTap={{ scale: 0.95 }}
              animate={!isSubmitting ? {
                boxShadow: [
                  "0 10px 30px rgba(100, 108, 255, 0.3)",
                  "0 15px 40px rgba(100, 108, 255, 0.5)",
                  "0 10px 30px rgba(100, 108, 255, 0.3)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: !isSubmitting ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {isSubmitting ? (
                <span>
                  <span className="spinner"></span>
                  Sending...
                </span>
              ) : (
                <motion.span
                  animate={!isSubmitting ? { opacity: [1, 0.7, 1] } : {}}
                  transition={{ duration: 1.5, repeat: !isSubmitting ? Infinity : 0 }}
                >
                  Send Message
                </motion.span>
              )}
            </motion.button>
          </motion.form>
          <motion.div
            className="contact-info glass-card"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Contact Information</h3>
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link || undefined}
                  className="contact-item"
                  target={info.link?.startsWith('http') ? '_blank' : undefined}
                  rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="contact-icon">{info.icon}</span>
                  <div className="contact-text">
                    <div className="contact-label">{info.label}</div>
                    <div className="contact-value">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
