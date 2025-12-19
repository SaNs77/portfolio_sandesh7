import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Chatbot.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm an AI assistant for Sandesh Pokhrel's portfolio. I can help you learn about his projects, skills, experience, and more. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Fallback response system when no API key is configured
  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you learn about Sandesh Pokhrel's portfolio. You can ask me about his skills, projects, experience, or how to contact him!"
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return "Sandesh specializes in SaaS migration, cloud-native development, and full-stack development. He works with technologies like React, TypeScript, and builds enterprise solutions. Check out the Skills section for more details!"
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return "Sandesh has worked on several projects including an Automatic HTML Code Generator using ML, ATM Simulator, and Hotel Room Booking systems. Visit the Projects section to see all his work!"
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('year') || lowerMessage.includes('background')) {
      return "Sandesh has 4+ years of experience in SaaS migration, cloud-native development, and enterprise solutions. He specializes in transforming legacy systems into modern, scalable solutions. Check the Experience section for details!"
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return "You can contact Sandesh at sandeshpokharel47@gmail.com or through LinkedIn at linkedin.com/in/sandesh-pokhrel-19978b1a5. He's based in Bengaluru, India. Use the Contact form on this page!"
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('city')) {
      return "Sandesh is located in Bengaluru, India. He's open to remote opportunities and collaborations!"
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who')) {
      return "Sandesh Pokhrel is a Software Developer with 4+ years of experience. He specializes in SaaS migration, cloud-native development, and full-stack engineering. He transforms legacy systems into modern, scalable solutions. Explore the About section to learn more!"
    }
    
    // Default response
    return "I can help you learn about Sandesh's skills, projects, experience, and how to contact him. Try asking about his experience, projects, or skills! For full AI capabilities, configure the VITE_GEMINI_API_KEY (free tier available)."
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      
      // Debug: Check if API key is loaded (only in development)
      if (import.meta.env.MODE === 'development') {
        console.log('API Key loaded:', apiKey ? 'Yes (hidden)' : 'No - using fallback mode')
      }
      
      // System prompt with portfolio context
      const systemContext = `You are an AI assistant for Sandesh Pokhrel's portfolio website. Sandesh is a Software Developer with 4+ years of experience specializing in:
- SaaS migration and cloud-native development
- Full stack development (React, TypeScript, etc.)
- Enterprise solutions
- Transforming legacy systems into modern, scalable solutions

Location: Bengaluru, India
Email: sandeshpokharel47@gmail.com
LinkedIn: linkedin.com/in/sandesh-pokhrel-19978b1a5

Your role is to:
1. Answer questions about Sandesh's skills, experience, and projects
2. Help visitors navigate the portfolio
3. Provide information about contacting Sandesh
4. Be friendly, professional, and concise
5. If asked about something not in the portfolio, politely redirect to relevant sections

Keep responses brief (2-3 sentences max) and helpful.`

      if (!apiKey) {
        // Free fallback: Use a simple rule-based response system
        const fallbackResponse = getFallbackResponse(userMessage.content)
        const assistantMessage: Message = {
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
        return
      }

      // Use Google Gemini API (Free tier available)
      // Build conversation history with system context
      const conversationHistory = messages
        .slice(-5) // Keep last 5 messages for context
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))

      // Build the full prompt with system context
      const fullPrompt = `${systemContext}\n\n${conversationHistory.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.parts[0].text}`).join('\n')}\n\nUser: ${userMessage.content}\nAssistant:`

      // First, try to list available models to see what's accessible
      let availableModels: string[] = []
      try {
        const listResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
        )
        if (listResponse.ok) {
          const listData = await listResponse.json()
          availableModels = (listData.models || []).map((m: any) => m.name?.replace('models/', '') || '')
          console.log('Available models:', availableModels)
        }
      } catch (err) {
        console.log('Could not list models, will try common ones')
      }

      // Try different model names and API versions until one works
      const modelsToTry = [
        { version: 'v1', model: 'gemini-1.5-flash' },
        { version: 'v1', model: 'gemini-1.5-pro' },
        { version: 'v1', model: 'gemini-pro' },
        { version: 'v1', model: 'gemini-1.0-pro' },
        { version: 'v1beta', model: 'gemini-1.5-flash' },
        { version: 'v1beta', model: 'gemini-1.5-pro' },
        { version: 'v1beta', model: 'gemini-pro' },
      ]

      // If we found available models, prioritize those
      if (availableModels.length > 0) {
        const prioritizedModels = availableModels
          .filter(m => m.includes('gemini'))
          .map(model => {
            // Determine version from model name or try both
            return [
              { version: 'v1', model },
              { version: 'v1beta', model }
            ]
          })
          .flat()
        
        modelsToTry.unshift(...prioritizedModels)
      }

      let lastError: any = null
      let response: Response | null = null
      let responseData: any = null

      for (const { version, model } of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`
          console.log(`Trying: ${url}`)
          
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: fullPrompt }]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 150,
              }
            })
          })

          if (response.ok) {
            responseData = await response.json()
            console.log(`✅ Successfully using model: ${model} (${version})`)
            break // Success, exit loop
          } else {
            const errorData = await response.json().catch(() => ({}))
            lastError = errorData
            console.log(`❌ Model ${model} (${version}) failed:`, errorData.error?.message || 'Unknown error')
            // Continue to next model
          }
        } catch (err: any) {
          lastError = err
          console.log(`❌ Exception with ${model} (${version}):`, err.message)
          // Continue to next model
        }
      }

      if (!response || !response.ok || !responseData) {
        const errorMessage = lastError?.error?.message || lastError?.message || 'Failed to get response from AI. No available models found. Please check your API key permissions in Google Cloud Console and ensure the Generative Language API is enabled.'
        console.error('All Gemini models failed. Last error:', lastError)
        throw new Error(errorMessage)
      }

      const data = responseData
      
      // Handle different response formats
      let responseText = "I'm sorry, I couldn't process that request."
      
      if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0]
        if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
          responseText = candidate.content.parts[0].text
        }
      } else if (data.text) {
        responseText = data.text
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('Chatbot error:', error)
      let errorMessage = "I'm sorry, I encountered an error. Please try again or contact Sandesh directly at sandeshpokharel47@gmail.com"
      
      // Provide more helpful error messages
      if (error?.message) {
        const errorMsg = error.message.toLowerCase()
        if (errorMsg.includes('api_key') || errorMsg.includes('invalid api key') || errorMsg.includes('403')) {
          errorMessage = "API key error. Please check your VITE_GEMINI_API_KEY in the .env file. Make sure you've restarted the dev server after adding it."
        } else if (errorMsg.includes('quota') || errorMsg.includes('429') || errorMsg.includes('rate limit')) {
          errorMessage = "Rate limit reached. The free tier allows 60 requests per minute. Please try again in a moment."
        } else if (errorMsg.includes('400') || errorMsg.includes('invalid')) {
          errorMessage = "Invalid request format. Please try rephrasing your question."
        } else {
          errorMessage = `Error: ${error.message}. Please try again or contact Sandesh at sandeshpokharel47@gmail.com`
        }
      }
      
      const errorResponse: Message = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chatbot"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </motion.svg>
        {!isOpen && (
          <motion.span
            className="chatbot-notification"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3>AI Assistant</h3>
                  <p>Ask me anything about this portfolio</p>
                </div>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="message-content">
                    {message.content}
                  </div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="message assistant loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-content">
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-container">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="chatbot-input"
                aria-label="Chat input"
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="chatbot-send-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

