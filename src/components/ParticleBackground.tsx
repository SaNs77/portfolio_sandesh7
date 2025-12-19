import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollPerformance } from '../hooks/useScrollPerformance'
import { useIsMobile } from '../hooks/useIsMobile'
import './ParticleBackground.css'

function ParticleField({ isScrolling }: { isScrolling: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = []
    // Further reduced to 400 for maximum scroll performance
    for (let i = 0; i < 400; i++) {
      const factor = 20 + Math.random() * 100
      const x = Math.cos((i / 100) * Math.PI * 2) * factor
      const y = Math.sin((i / 100) * Math.PI * 2) * factor
      const z = (Math.random() - 0.5) * 50
      
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state, delta) => {
    if (ref.current && !isScrolling) {
      console.log('state', state)
      // Only animate when not scrolling
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 25
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#646cff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function QuantumParticles({ isScrolling }: { isScrolling: boolean }) {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = []
    // Further reduced to 100 for maximum scroll performance
    for (let i = 0; i < 100; i++) {
      const radius = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state, delta) => {
    if (ref.current && !isScrolling) {
      console.log('state', state)
      // Only animate when not scrolling
      ref.current.rotation.x += delta * 0.08
      ref.current.rotation.y += delta * 0.12
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#ff6b9d"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

const ParticleBackground = () => {
  const isScrolling = useScrollPerformance()
  const isMobile = useIsMobile()
  
  return (
    <div className={`particle-background ${isScrolling ? 'scrolling' : ''} ${isMobile ? 'mobile' : ''}`}>
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        frameloop={isScrolling ? 'never' : 'always'}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.5} />
        <ParticleField isScrolling={isScrolling} />
        {!isMobile && <QuantumParticles isScrolling={isScrolling} />}
      </Canvas>
    </div>
  )
}

export default ParticleBackground
