import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus, Octahedron, Icosahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';

const Shape3D = ({ position, color, speed = 1, size = 1, type }) => {
  const shapeRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    shapeRef.current.rotation.x = time * 0.3 * speed;
    shapeRef.current.rotation.y = time * 0.4 * speed;
    shapeRef.current.position.y = Math.sin(time * speed) * 0.2;
  });

  const ShapeComponent = {
    'box': <Box args={[size, size, size]} ref={shapeRef}>
      <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={1} />
    </Box>,
    'sphere': <Sphere args={[size * 0.6, 32, 32]} ref={shapeRef}>
      <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} clearcoat={0.8} />
    </Sphere>,
    'torus': <Torus args={[size * 0.5, size * 0.2, 16, 32]} ref={shapeRef}>
      <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.3} />
    </Torus>,
    'octahedron': <Octahedron args={[size * 0.7]} ref={shapeRef}>
      <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={1} />
    </Octahedron>,
    'icosahedron': <Icosahedron args={[size * 0.7]} ref={shapeRef}>
      <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} />
    </Icosahedron>
  }[type];

  return <group position={position}>{ShapeComponent}</group>;
};

const Model3D = () => {
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateShapes = useMemo(() => {
    const shapes = [];
    const types = ['box', 'sphere', 'torus', 'octahedron', 'icosahedron'];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96f7d2', '#f7d794', '#786fa6', '#f8a5c2', '#63cdda'];
    
    // Adjust number of shapes based on screen size with higher density for desktop
    const area = viewport.width * viewport.height;
    const numberOfShapes = Math.floor(viewport.width > 768 ? area / 15000 : area / 20000);
    
    const gridSize = Math.sqrt(numberOfShapes);
    const spacing = viewport.width > 768 ? 25 / gridSize : 20 / gridSize; // Increased spacing for desktop

    for (let i = 0; i < numberOfShapes; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      
      shapes.push({
        position: [
          (col - gridSize/2) * spacing + (Math.random() - 0.5) * 2,
          (row - gridSize/2) * spacing + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 10
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.3 + Math.random() * 0.5,
        speed: 0.2 + Math.random() * 0.8,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    return shapes;
  }, [viewport]);

  const cameraPosition = useMemo(() => {
    // Adjust camera position based on screen size
    const zPosition = viewport.width < 768 ? 15 : 20;
    return [0, 0, zPosition];
  }, [viewport.width]);

  return (
    <Canvas 
      camera={{ position: cameraPosition, fov: viewport.width < 768 ? 75 : 60 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
      <hemisphereLight intensity={0.5} groundColor="#ff0f00" />
      {generateShapes.map((props, index) => (
        <Shape3D key={index} {...props} />
      ))}
    </Canvas>
  );
};

export default Model3D;
