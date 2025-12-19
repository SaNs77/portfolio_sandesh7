import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollPerformance } from '../hooks/useScrollPerformance'
import { useIsMobile } from '../hooks/useIsMobile'
import './NeuralNetwork.css'
import { Line } from "@react-three/drei";

function NeuralNode({ position, isScrolling }: { position: [number, number, number], index: number, isScrolling: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (meshRef.current && !isScrolling) {
      // Only animate when not scrolling
      console.log(state)
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#646cff"
        emissive="#646cff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function NeuralConnection({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ];

  return (
    <Line
      points={points}
      color="#646cff"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}

function NeuralNetworkScene({ isScrolling }: { isScrolling: boolean }) {
  const { nodes, connections } = useMemo(() => {
    const nodeArray: [number, number, number][] = []
    const connectionArray: Array<{ start: [number, number, number], end: [number, number, number] }> = []
    
    // Further reduced nodes for better performance
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 3; i++) { // Reduced from 4 to 3
        const x = (layer - 1) * 2
        const y = (i - 1) * 0.8
        const z = (Math.random() - 0.5) * 2
        nodeArray.push([x, y, z])
      }
    }
    
    // Create connections between layers (further reduced)
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const start = nodeArray[layer * 3 + i]
          const end = nodeArray[(layer + 1) * 3 + j]
          if (Math.random() > 0.75) { // Further reduced connections
            connectionArray.push({ start, end })
          }
        }
      }
    }
    
    return { nodes: nodeArray, connections: connectionArray }
  }, [])

  return (
    <>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node} index={i} isScrolling={isScrolling} />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection key={i} start={conn.start} end={conn.end} />
      ))}
    </>
  )
}

const NeuralNetwork = () => {
  const isScrolling = useScrollPerformance()
  const isMobile = useIsMobile()
  
  return (
    <div className={`neural-network ${isScrolling ? 'scrolling' : ''} ${isMobile ? 'mobile' : ''}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }} 
        frameloop={isScrolling ? 'never' : 'always'}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <NeuralNetworkScene isScrolling={isScrolling} />
      </Canvas>
    </div>
  )
}

export default NeuralNetwork

