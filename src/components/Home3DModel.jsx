import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { motion } from 'framer-motion';

// Define multiple geometry types
const geometries = [
  { type: 'icosahedron', args: [1, 0] },
  { type: 'torusKnot', args: [0.9, 0.3, 100, 16] },
  { type: 'torus', args: [0.7, 0.3, 16, 100] },
  { type: 'sphere', args: [1, 32, 32] },
  { type: 'ring', args: [0.5, 1, 32] },
];

// Simple error boundary component
import PropTypes from 'prop-types';

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
        <motion.div 
          className="flex items-center justify-center w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-500 opacity-70 text-lg font-medium">3D Model couldn&#39;t load</p>
        </motion.div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

// Loading indicator component
const LoadingIndicator = () => (
  <motion.div 
    className="absolute inset-0 flex items-center justify-center z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    style={{ pointerEvents: 'none' }}
  >
    <div className="relative w-16 h-16 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 border-4 border-t-transparent border-r-purple-300 border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: -180 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="bg-black bg-opacity-10 absolute inset-4 rounded-full"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

// Enhanced rotating shape component
const RotatingShape = () => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [geometryIndex, setGeometryIndex] = useState(0);
  const time = useRef(0);
  
  // Make spring animation smoother with less dramatic changes
  const { scale, shine, distort } = useSpring({
    scale: hovered ? 1.1 : 1,
    shine: hovered ? 1 : 0.7,
    distort: hovered ? 0.15 : 0.1,
    from: { scale: 0.1, shine: 0.4, distort: 0 },
    reset: false, 
    config: { tension: 120, friction: 20 },
    key: geometryIndex,
  });

  // Change to sequential cycling through geometries
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGeometryIndex((prevIndex) => (prevIndex + 1) % geometries.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // Improved procedural noise function with better performance
  const noise = (x, y, z, t) => {
    return Math.sin(x * 5 + t) * Math.cos(y * 3 + t) * Math.sin(z * 7 + t);
  };

  // More efficient animation with time-based deformation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.05;
      
      time.current += delta * 0.5;
      
      // Only update positions if the geometry has those attributes
      const positions = meshRef.current.geometry.attributes?.position;
      if (positions && meshRef.current.geometry.originalPositions) {
        const count = positions.count;
        
        // Apply distortion - limit iterations for better performance
        const step = Math.max(1, Math.floor(count / 200)); // Process fewer vertices on mobile
        for (let i = 0; i < count; i += step) {
          const originalX = meshRef.current.geometry.originalPositions[i * 3];
          const originalY = meshRef.current.geometry.originalPositions[i * 3 + 1];
          const originalZ = meshRef.current.geometry.originalPositions[i * 3 + 2];
          
          const noiseValue = noise(originalX, originalY, originalZ, time.current);
          
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
    
    try {
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
      
      if (geometry && geometry.attributes.position) {
        const positions = geometry.attributes.position.array;
        geometry.originalPositions = Array.from(positions);
      }
    } catch (error) {
      console.error("Error creating geometry:", error);
      geometry = new THREE.SphereGeometry(1, 16, 16);
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
  const [isLoaded, setIsLoaded] = useState(false);
  
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

  // Make sure the Canvas creation and loading state work properly
  const handleCanvasCreated = () => {
    try {
      // Short delay to ensure everything is properly loaded
      setTimeout(() => setIsLoaded(true), 800);
    } catch (error) {
      console.error("Error during canvas creation:", error);
      setIsLoaded(true); // Set as loaded anyway to avoid infinite loading
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }}
      className="w-full h-full relative"
    >
      <div 
        ref={canvasContainerRef}
        className="w-full h-full relative"
        style={{ 
          pointerEvents: allowScroll ? 'none' : 'auto',
          touchAction: allowScroll ? 'auto' : 'none'
        }}
      >
        <ErrorBoundary>
          {!isLoaded && <LoadingIndicator />}
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ 
              powerPreference: 'high-performance', 
              antialias: true,
              alpha: true, // Enable transparency
              clearColor: 'transparent', // Set transparent background
            }}
            dpr={Math.min(1.5, window.devicePixelRatio)} // Lower DPR for better performance
            onCreated={handleCanvasCreated}
          >
            {/* Create a more efficient lighting setup */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <ambientLight intensity={0.5} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            {/* eslint-disable-next-line react/no-unknown-property,react/jsx-props-no-spreading */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight 
              /* eslint-disable-next-line react/no-unknown-property */
              position={[-5, 5, 5]}
              /* eslint-disable-next-line react/no-unknown-property */
              angle={0.15}
              /* eslint-disable-next-line react/no-unknown-property */
              penumbra={1}
              /* eslint-disable-next-line react/no-unknown-property */
              intensity={1.2}
              /* eslint-disable-next-line react/no-unknown-property */
              castShadow={false} // Disable shadows for better performance
            />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight position={[5, -5, -5]} color="#ff00ff" intensity={0.4} />
            
            {/* Optimize stars based on device capability */}
            <Stars 
              radius={100} 
              depth={50} 
              count={isMobile ? 1500 : 3500} 
              factor={4} 
              saturation={0} 
              fade 
              speed={0.5} // Slow down for better performance
            />
            
            <Suspense fallback={
              <mesh>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <sphereGeometry args={[0.5, 8, 8]} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <meshBasicMaterial color="#c490ff" wireframe />
              </mesh>
            }>
              <Environment preset="studio" background={false} intensity={0.8} /> 
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
    </motion.div>
  );
};

export default Home3DModel;
