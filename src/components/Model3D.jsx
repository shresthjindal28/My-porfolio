import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Shape3D = ({ position, color, speed = 1, size = 1, type }) => {
  const shapeRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (shapeRef.current) {
      shapeRef.current.rotation.x = time * 0.3 * speed;
      shapeRef.current.rotation.y = time * 0.4 * speed;
      shapeRef.current.position.y = Math.sin(time * speed) * 0.2;
    }
  });

  // Helper to render the correct geometry
  const getShape = () => {
    switch (type) {
      case 'box':
        return (
          <mesh ref={shapeRef}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <boxGeometry args={[size, size, size]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        );
      case 'sphere':
        return (
          <mesh ref={shapeRef}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <sphereGeometry args={[size * 0.6, 32, 32]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} clearcoat={0.8} />
          </mesh>
        );
      case 'torus':
        return (
          <mesh ref={shapeRef}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <torusGeometry args={[size * 0.5, size * 0.2, 16, 32]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.3} />
          </mesh>
        );
      case 'octahedron':
        return (
          <mesh ref={shapeRef}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <octahedronGeometry args={[size * 0.7]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        );
      case 'icosahedron':
        return (
          <mesh ref={shapeRef}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <icosahedronGeometry args={[size * 0.7]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
        );
      default:
        return null;
    }
  };

  // eslint-disable-next-line react/no-unknown-property
  return <group position={position}>{getShape()}</group>;
};

Shape3D.propTypes = {
  position: PropTypes.array,
  color: PropTypes.string,
  speed: PropTypes.number,
  size: PropTypes.number,
  type: PropTypes.string
};

const Model3D = () => {
  const getInitialViewport = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const [viewport, setViewport] = useState(getInitialViewport);

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
    const area = viewport.width * viewport.height;
    const numberOfShapes = Math.floor(viewport.width > 768 ? area / 15000 : area / 20000);
    const gridSize = Math.sqrt(numberOfShapes);
    const spacing = viewport.width > 768 ? 25 / gridSize : 20 / gridSize;

    for (let i = 0; i < numberOfShapes; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      shapes.push({
        position: [
          (col - gridSize / 2) * spacing + (Math.random() - 0.5) * 2,
          (row - gridSize / 2) * spacing + (Math.random() - 0.5) * 2,
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
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.7} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <hemisphereLight intensity={0.5} groundColor="#ff0f00" />
      {generateShapes.map((props, index) => (
        <Shape3D key={index} {...props} />
      ))}
    </Canvas>
  );
};

export default Model3D;
