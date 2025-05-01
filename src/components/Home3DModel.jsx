import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three'; // Import react-spring

// Define available geometries with more shapes
const geometries = [
  { type: 'icosahedron', args: [1.5, 1] },
  { type: 'box', args: [2, 2, 2] },
  { type: 'sphere', args: [1.5, 32, 16] },
  { type: 'torusKnot', args: [1, 0.3, 100, 16] },
  { type: 'cone', args: [1.5, 2.5, 32] },
  { type: 'cylinder', args: [1, 1, 2.5, 32] },
  { type: 'dodecahedron', args: [1.5, 0] },
  { type: 'torus', args: [1.5, 0.5, 16, 100] },
];

// Simple rotating shape component
const RotatingShape = () => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [geometryIndex, setGeometryIndex] = useState(0);

  // Spring animation for scale transition
  const { scale } = useSpring({
    scale: 1, // Target scale
    from: { scale: 0.1 }, // Initial scale when geometry changes
    reset: true, // Reset animation when geometryIndex changes
    config: { tension: 200, friction: 20 }, // Animation physics
    key: geometryIndex, // Re-trigger animation when key changes
  });

  // Automatically change geometry every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGeometryIndex((prevIndex) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * geometries.length);
        } while (nextIndex === prevIndex); // Ensure the shape actually changes
        return nextIndex;
      });
    }, 4000); // Change every 4000ms (4 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  const currentGeometry = useMemo(() => {
    const { type, args } = geometries[geometryIndex];
    switch (type) {
      case 'box':
        return <boxGeometry args={args} />;
      case 'sphere':
        return <sphereGeometry args={args} />;
      case 'torusKnot':
        return <torusKnotGeometry args={args} />;
      case 'cone':
        return <coneGeometry args={args} />;
      case 'cylinder':
        return <cylinderGeometry args={args} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={args} />;
      case 'torus':
        return <torusGeometry args={args} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={args} />;
    }
  }, [geometryIndex]);

  return (
    // Use animated mesh component 'a.mesh'
    <a.mesh
      ref={meshRef}
      scale={scale} // Apply animated scale
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      key={geometryIndex} // Use geometryIndex as key for mesh re-creation if needed
    >
      {currentGeometry}
      {/* Use animated material 'a.meshStandardMaterial' if you want to animate color/opacity too */}
      <meshStandardMaterial
        color={hovered ? '#facc15' : '#a78bfa'}
        wireframe={true}
        transparent // Needed if you animate opacity later
        opacity={1} // Can be animated with spring as well
      />
    </a.mesh>
  );
};

// Main 3D Model component including the Canvas setup
const Home3DModel = () => {
  // Add mobile detection
  const [isMobile, setIsMobile] = useState(false);
  // Add state to control pointer events
  const [allowScroll, setAllowScroll] = useState(false);
  const canvasContainerRef = useRef(null);
  
  // Check if device is mobile on component mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle touch events to allow scrolling
  useEffect(() => {
    if (!isMobile || !canvasContainerRef.current) return;
    
    const container = canvasContainerRef.current;
    
    // Handle touch start - disable page scrolling when interacting with canvas
    const handleTouchStart = () => {
      setAllowScroll(false);
    };
    
    // Handle touch end - re-enable page scrolling
    const handleTouchEnd = () => {
      // Small delay to ensure the touch interaction is complete
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
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ powerPreference: 'high-performance', antialias: false }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <RotatingShape />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.2}
          // Use makeDefault to avoid conflicts with other controls
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default Home3DModel;
