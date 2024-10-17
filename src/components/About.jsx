import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three'; // Ensure THREE is imported properly

const About = () => {
  return (
    <div
      name="About"
      id="2"
      className="h-[80vh] lg:h-[100vh] max-w-screen-lg ml-4 md:mx-auto flex items-center justify-center md:justify-between relative"
    >
      <div className="absolute tracking-widest flex flex-col md:flex-wrap md:flex-1 md:relative text-white">
        <h1 className="text-3xl sm:text-6xl font-bold mb-4">
          Hello I'm <br /> Shresth jindal
        </h1>
        <p>
          I'm a web developer proficient in the MERN stack and passionate about
          creating immersive 3D animation using Three.js, Spline, Venta.js. I
          specialize in building responsive, visually appealing web applications
          with Tailwind CSS. Let's create something amazing together!
        </p>
      </div>

      <div className="md:w-[50%] h-full p-0 md:px-4 opacity-40 md:opacity-100 md:flex-1">
        <Canvas camera={{ position: [0, 0, 10] }} style={{ background: 'transparent' }}>
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Atom />
          </Float>
          <Stars saturation={0} count={400} speed={0.5} />
        </Canvas>
      </div>
    </div>
  );
};

function Atom(props) {
  const points = useMemo(
    () => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  );

  return (
    <group {...props}>
      {/* Remove unnecessary glow effects */}
      <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
      <Line worldUnits points={points} color="turquoise" lineWidth={0.3} rotation={[0, 0, 1]} />
      <Line worldUnits points={points} color="turquoise" lineWidth={0.3} rotation={[0, 0, -1]} />

      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} />

      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });

  return (
    <group {...props}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.25]} />
        <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default About;
