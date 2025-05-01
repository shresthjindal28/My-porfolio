import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Environment, useTexture, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Fallback icon
const FALLBACK_ICON = 'https://img.icons8.com/ios/50/code--v1.png';

// Helper function to validate icon URLs
function getValidIconUrl(url) {
  if (
    typeof url !== 'string' ||
    url.trim() === '' ||
    !(url.endsWith('.svg') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.startsWith('data:image'))
  ) {
    return FALLBACK_ICON;
  }
  return url;
}

// Category color mapping - enhanced with vibrant colors
const categoryColors = {
  'Frontend': '#38bdf8',    // bright blue
  'Backend': '#a78bfa',     // vibrant purple
  'Programming': '#fb923c', // vibrant orange
  'Database': '#4ade80',    // vibrant green
  'DevOps': '#f472b6',      // vibrant pink
  'Tools': '#818cf8',       // vibrant indigo
  'Design': '#fb7185',      // vibrant rose
  'Graphics': '#2dd4bf',    // vibrant teal
  'Animation': '#e879f9',   // vibrant fuchsia
  'Integration': '#0ea5e9'  // vibrant sky blue
};

// Loading placeholder component
function LoadingPlaceholder() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-slate-900/80 p-5 rounded-xl shadow-lg">
        <div className="w-10 h-10 border-4 border-white/10 border-t-sky-400 rounded-full animate-spin mb-2.5" />
        <div>Loading Skills...</div>
      </div>
    </Html>
  );
}

// Detail card component - more compact and user-friendly
function DetailCard({ skill, isMobile }) {
  // Animation ref for proficiency bar
  const barRef = useRef(null);
  
  // Animate proficiency bar when skill changes
  useEffect(() => {
    if (skill && barRef.current) {
      barRef.current.style.width = '0%';
      setTimeout(() => {
        barRef.current.style.width = `${skill.proficiency}%`;
      }, 50);
    }
  }, [skill]);
  
  return (
    <div
      className={`
        bg-slate-900/95 rounded-xl ${isMobile ? 'p-2.5' : 'p-4'} 
        shadow-xl backdrop-blur-md h-full w-full 
        flex flex-col items-center justify-between transition-all duration-300
        ${skill ? 'opacity-100 scale-100' : 'opacity-90 scale-98'} 
        ${isMobile ? 'text-xs' : 'text-sm'} text-white
      `}
      style={{
        border: skill ? `2px solid ${categoryColors[skill.category] || '#38bdf8'}` : '1px solid rgba(56, 189, 248, 0.3)'
      }}
    >
      {skill ? (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-slate-900/70 rounded-lg p-2 flex items-center justify-center shadow-md"
                 style={{ border: `1px solid ${categoryColors[skill.category] || '#38bdf8'}` }}>
              <img 
                src={getValidIconUrl(skill.icon)} 
                alt={skill.name}
                className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} filter drop-shadow`}
              />
            </div>
            <div>
              <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold leading-tight m-0`}
                  style={{ color: categoryColors[skill.category] || '#38bdf8' }}>
                {skill.name}
              </h3>
              <span className="text-xs text-slate-400 block mt-0.5">
                {skill.category}
              </span>
            </div>
          </div>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} leading-normal flex-1 overflow-y-auto`}>
            <p className="m-0 mb-2.5">{skill.description}</p>
            
            {/* Proficiency indicator with animation */}
            {skill.proficiency && (
              <div className="mt-2">
                <div className="flex justify-between mb-1 text-xs">
                  <span>Proficiency</span>
                  <span style={{ color: categoryColors[skill.category] || '#38bdf8' }}>
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800/80 rounded overflow-hidden">
                  <div 
                    ref={barRef}
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: 0, 
                      backgroundColor: categoryColors[skill.category] || '#38bdf8',
                      boxShadow: `0 0 10px ${categoryColors[skill.category] || '#38bdf8'}`
                    }} 
                  />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-2.5 flex flex-col justify-center h-full">
          <h3 className="text-sky-400 mb-2 text-base">Interactive Skills Map</h3>
          <p className="text-xs leading-relaxed text-slate-400 m-0 mb-2">
            {isMobile 
              ? 'Tap on any skill bubble to see details.' 
              : 'Hover over any skill bubble to see details, or click to pin it.'}
          </p>
          <div className="mt-2 p-2 rounded-md bg-sky-400/10 border border-dashed border-sky-400/30 text-xs">
            <p className="m-0 text-slate-400">
              Use your {isMobile ? 'finger' : 'mouse'} to rotate the model
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple SkillIcon component
function SkillIcon({ skill, isActive, position, onClick, onPointerOver, onPointerOut }) {
  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      zIndexRange={[100, 0]}
      occlude
    >
      <div
        onClick={onClick}
        onMouseOver={onPointerOver}
        onMouseOut={onPointerOut}
        className={`
          ${isActive ? 'w-[70px] h-[70px]' : 'w-[60px] h-[60px]'}
          rounded-full bg-slate-900/85 flex items-center justify-center flex-col
          cursor-pointer transition-all duration-300 ease-in-out
          ${isActive ? 'scale-110' : 'scale-100'}
        `}
        style={{
          boxShadow: isActive 
            ? `0 0 20px ${categoryColors[skill.category] || '#38bdf8'}` 
            : '0 5px 15px rgba(0, 0, 0, 0.3)',
          border: `2px solid ${isActive ? categoryColors[skill.category] || '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
        }}
      >
        <img 
          src={getValidIconUrl(skill.icon)} 
          alt={skill.name}
          className={`w-[70%] h-[70%] object-contain ${isActive ? 'filter drop-shadow' : ''}`}
        />
        {isActive && (
          <div className="text-[9px] text-white mt-0.5 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] text-shadow">
            {skill.name}
          </div>
        )}
      </div>
    </Html>
  );
}

// New simplified 3D model with more bubble-like positioning
function SkillsModel({ skills, onSkillSelect, activeSkill, hoveredSkill, setHoveredSkill, isMobile }) {
  const groupRef = useRef();
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Auto-rotation animation
  useFrame((state) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.08;
    }
  });
  
  // Take first 20 skills or fewer
  const displayedSkills = skills.slice(0, 20);
  
  // Ensure we have valid skills
  if (!displayedSkills.length) {
    return (
      <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#0f172a" />
        <Html center>
          <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
            No skills to display
          </div>
        </Html>
      </mesh>
    );
  }
  
  // Calculate positions on a sphere for consistent placement with better spacing
  const getPositionsOnSphere = (count, radius = isMobile ? 2.2 : 2.5) => {
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < count; i++) {
      // Distribute points more evenly
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) * radius; // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      positions.push([x, y * radius, z]);
    }
    
    return positions;
  };
  
  const positions = getPositionsOnSphere(displayedSkills.length);
  
  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setAutoRotate(false)}
      onPointerOut={() => !activeSkill && setAutoRotate(true)}
    >
      {/* Core icosahedron */}
      <Icosahedron args={[2, 0]}>
        <meshPhysicalMaterial 
          color="#0f172a"
          metalness={0.4}
          roughness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          opacity={0.95}
          transparent
          emissive="#0f172a"
          emissiveIntensity={0.1}
        />
      </Icosahedron>
      
      {/* Edge highlight */}
      <Icosahedron args={[2.05, 0]}>
        <meshBasicMaterial 
          color={hoveredSkill ? 
            categoryColors[hoveredSkill.category] || "#38bdf8" : 
            "#38bdf8"} 
          wireframe 
          opacity={hoveredSkill || activeSkill ? 0.3 : 0.15} 
          transparent
        />
      </Icosahedron>
      
      {/* Skill icons positioned around the sphere */}
      {displayedSkills.map((skill, index) => (
        <SkillIcon
          key={index}
          skill={skill}
          position={positions[index]}
          isActive={skill.name === (activeSkill?.name)}
          onClick={() => onSkillSelect(skill.name === (activeSkill?.name) ? null : skill)}
          onPointerOver={() => {
            setHoveredSkill(skill);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredSkill(null);
            document.body.style.cursor = 'auto';
          }}
        />
      ))}
    </group>
  );
}

// Main component for the 3D skills visualization - improved responsiveness
export default function Skill3D({ skills = [], height = '80vh' }) {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [allowScroll, setAllowScroll] = useState(false);
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  
  // Enhanced responsive design handling with orientation detection
  useEffect(() => {
    const checkResponsiveness = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };
    
    checkResponsiveness();
    window.addEventListener('resize', checkResponsiveness);
    return () => window.removeEventListener('resize', checkResponsiveness);
  }, []);

  // Handle touch events to prevent scrolling conflicts
  useEffect(() => {
    if (!isMobile || !canvasContainerRef.current) return;
    
    const container = canvasContainerRef.current;
    
    // When user starts interacting with the 3D model
    const handleTouchStart = (e) => {
      // Only if we're actually touching the canvas (not details panel)
      if (e.target.tagName.toLowerCase() === 'canvas') {
        setAllowScroll(false);
      }
    };
    
    // When user stops interacting with the 3D model
    const handleTouchEnd = () => {
      // Small delay to ensure the interaction is complete
      setTimeout(() => setAllowScroll(true), 300);
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    // Enable scrolling when component unmounts
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Update skill display based on hover or selection
  const displayedSkill = activeSkill || hoveredSkill;

  // Calculate appropriate height based on device and orientation
  const getContainerStyle = () => {
    if (isMobile) {
      return {
        height: orientation === 'landscape' ? '100vh' : 'auto',
        minHeight: orientation === 'landscape' ? '300px' : '650px', // Increased height for portrait
        maxHeight: orientation === 'landscape' ? '100vh' : '90vh',  // Increased max height
      };
    }
    return { 
      height: 'min(75vh, 650px)'
    };
  };

  return (
    <div
      ref={containerRef}
      className={`
        w-full relative rounded-2xl overflow-hidden bg-transparent 
        flex ${isMobile && orientation === 'portrait' ? 'flex-col' : 'flex-col md:flex-row'} 
        items-center justify-center md:justify-between
        py-2 md:py-4 gap-2 md:gap-4 lg:gap-6
      `}
      style={getContainerStyle()}
    >
      {/* Detail panel - responsive positioning */}
      <div className={`
        ${isMobile 
          ? orientation === 'landscape' 
            ? 'w-[40%] h-[90%] absolute left-2 z-20' 
            : 'w-[90%] h-[180px] z-10 mt-[70%] sm:mt-[60%]' // Adjusted position for detail panel
          : 'w-[35%] lg:w-[25%] h-[80%] max-h-[450px]'
        }
        min-w-[250px] max-w-[350px]
        transition-all duration-300
      `}>
        <DetailCard skill={displayedSkill} isMobile={isMobile} />
      </div>
      
      {/* 3D visualization - responsive sizing */}
      <div 
        ref={canvasContainerRef}
        className={`
          ${isMobile 
            ? orientation === 'landscape' 
              ? 'w-[100%] h-[100%] ml-auto' 
              : 'w-full h-[450px] sm:h-[500px] absolute top-0' // Increased height significantly
            : 'w-[60%] lg:w-[70%] xl:w-[40%] h-full'
          }
          flex items-center justify-center
        `}
        style={{ 
          pointerEvents: allowScroll ? 'none' : 'auto',
          touchAction: allowScroll ? 'auto' : 'none'
        }}
      >
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: isMobile ? 75 : 50,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            alpha: true, 
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: isMobile ? "default" : "high-performance"
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          className="bg-transparent w-full h-full"
        >
          {/* Optimized lighting for mobile */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
          {!isMobile && (
            <>
              <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#e0f2fe" />
              <pointLight position={[0, 0, 5]} intensity={0.5} color="#38bdf8" />
            </>
          )}
          
          <Suspense fallback={<LoadingPlaceholder />}>
            <SkillsModel 
              skills={skills} 
              onSkillSelect={setActiveSkill}
              activeSkill={activeSkill}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              isMobile={isMobile}
            />
            <Environment preset={isMobile ? "apartment" : "city"} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={isMobile ? 0.7 : 0.5}
            enableDamping={true}
            dampingFactor={0.1}
            autoRotate={false}
            makeDefault
          />
        </Canvas>
      </div>
    </div>
  );
}
