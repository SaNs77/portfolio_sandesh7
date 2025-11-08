import { useEffect, useState, useRef } from 'react'

export const useScrollPerformance = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
          
          if (scrollDelta > 1) {
            setIsScrolling(true)
            
            // Clear existing timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
            
            // Set scrolling to false after scroll stops
            timeoutRef.current = setTimeout(() => {
              setIsScrolling(false)
            }, 150)
          }
          
          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return isScrolling
}

