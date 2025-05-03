import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';

// Define multiple geometry types
const geometries = [
  { type: 'icosahedron', args: [1, 0] },
  { type: 'torusKnot', args: [0.9, 0.3, 100, 16] },
  { type: 'torus', args: [0.7, 0.3, 16, 100] },
  { type: 'sphere', args: [1, 32, 32] },
  { type: 'ring', args: [0.5, 1, 32] },
];

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.error("3D rendering error:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-purple-500 opacity-50">3D Model couldn't load</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// NoiseShape component with more complex and irregular patterns
const RotatingShape = () => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [geometryIndex, setGeometryIndex] = useState(0);
  const time = useRef(0);
  
  // Make spring animation smoother with less dramatic changes
  const { scale, shine, distort } = useSpring({
    scale: 1,
    shine: hovered ? 1 : 0.7,
    distort: hovered ? 0.15 : 0.1, // Reduce the difference between hover/non-hover states
    from: { scale: 0.1, shine: 0.4, distort: 0 },
    reset: false, // Don't reset on hover changes, only on geometry changes
    config: { tension: 120, friction: 20 }, // Smoother transition
    key: geometryIndex, // Only reset when geometry changes
  });

  // Change to sequential cycling through geometries
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGeometryIndex((prevIndex) => (prevIndex + 1) % geometries.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // Procedural noise function that doesn't require external textures
  const noise = (x, y, z, t) => {
    return Math.sin(x * 5 + t) * Math.cos(y * 3 + t) * Math.sin(z * 7 + t);
  };

  // More complex animation with time-based deformation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.05;
      
      time.current += delta * 0.5;
      
      if (meshRef.current.geometry.attributes.position) {
        const positions = meshRef.current.geometry.attributes.position;
        const count = positions.count;
        
        // Apply distortion to all geometry types, not just 'box'
        for (let i = 0; i < count; i++) {
          const originalX = meshRef.current.geometry.originalPositions[i * 3];
          const originalY = meshRef.current.geometry.originalPositions[i * 3 + 1];
          const originalZ = meshRef.current.geometry.originalPositions[i * 3 + 2];
          
          const noiseValue = noise(originalX, originalY, originalZ, time.current);
          
          // Use a gentler distortion for hover state to prevent glitching
          const distortAmount = distort.get() * 0.1;
          positions.setX(i, originalX + noiseValue * distortAmount);
          positions.setY(i, originalY + noiseValue * distortAmount);
          positions.setZ(i, originalZ + noiseValue * distortAmount);
        }
        positions.needsUpdate = true;
      }
    }
  });

  const currentGeometry = useMemo(() => {
    let geometry;
    
    switch(geometries[geometryIndex].type) {
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(...geometries[geometryIndex].args);
        break;
      case 'torusKnot':
        geometry = new THREE.TorusKnotGeometry(...geometries[geometryIndex].args);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(...geometries[geometryIndex].args);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(...geometries[geometryIndex].args);
        break;
      case 'ring':
        geometry = new THREE.RingGeometry(...geometries[geometryIndex].args);
        break;
      default:
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    }
    
    if (geometry) {
      const positions = geometry.attributes.position.array;
      geometry.originalPositions = [...positions];
    }
    
    return geometry;
  }, [geometryIndex]);

  return (
    <a.mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      key={geometryIndex}
      geometry={currentGeometry}
    >
      <a.meshPhysicalMaterial
        color={hovered ? '#ffcd00' : '#c490ff'}
        clearcoat={shine.to(s => s * 1.2)}
        clearcoatRoughness={0.05}
        metalness={shine.to(s => s * 0.8)}
        roughness={shine.to(s => 0.05 + (0.1 * (1 - s)))}
        transmission={0.2}
        transparent={true}
        opacity={0.95}
        envMapIntensity={shine.to(s => s * 3)}
        reflectivity={shine.to(s => s * 1.5)}
        iridescence={0.3}
        iridescenceIOR={1.5}
        sheen={0.5}
        sheenRoughness={0.2}
        sheenColor={"#ff88ff"}
      />
    </a.mesh>
  );
};

// Main 3D Model component
const Home3DModel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const canvasContainerRef = useRef(null);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !canvasContainerRef.current) return;
    
    const container = canvasContainerRef.current;
    
    const handleTouchStart = () => {
      setAllowScroll(false);
    };
    
    const handleTouchEnd = () => {
      setTimeout(() => setAllowScroll(true), 300);
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <div 
      ref={canvasContainerRef}
      className="w-full h-full"
      style={{ 
        pointerEvents: allowScroll ? 'none' : 'auto',
        touchAction: allowScroll ? 'auto' : 'none'
      }}
    >
      <ErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            powerPreference: 'high-performance', 
            antialias: true,
            alpha: true,
          }}
          dpr={Math.min(2, window.devicePixelRatio)}
        >
          <color attach="background" args={['#010307']} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight 
            position={[-5, 5, 5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1.5} 
            castShadow 
          />
          <pointLight position={[5, -5, -5]} color="#ff00ff" intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Suspense fallback={null}>
            <Environment preset="studio" background={false} /> 
            <RotatingShape />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            rotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.2}
            makeDefault
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Home3DModel;
