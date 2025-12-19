import { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import Chatbot from './components/Chatbot'

// Lazy load heavy 3D components for better initial load performance
const ParticleBackground = lazy(() => import('./components/ParticleBackground'))
const NeuralNetwork = lazy(() => import('./components/NeuralNetwork'))

function App() {
  return (
    <ErrorBoundary>
      <a href="#hero" className="skip-to-main">
        Skip to main content
      </a>
      <div className="App">
        <Suspense fallback={null}>
          <ParticleBackground />
          <NeuralNetwork />
        </Suspense>
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ErrorBoundary>
  )
}

export default App

