import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // aspect ratio will be set after renderer size
      0.1,
      1000
    );
    camera.position.z = 5;

    const node = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    // Use container size instead of window size
    const resizeRenderer = () => {
      if (node) {
        const { width, height } = node.getBoundingClientRect();
        renderer.setSize(width || 400, height || 400);
        camera.aspect = (width || 400) / (height || 400);
        camera.updateProjectionMatrix();
      }
    };
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);
    node.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    let frameId;
    let lastTime = 0;
    const fps = 60;
    const animate = (time) => {
      frameId = requestAnimationFrame(animate);
      if (time - lastTime < 1000 / fps) return;
      lastTime = time;
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeRenderer);
      if (frameId) cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    };
  }, []);

  return <div ref={canvasRef} className="absolute inset-0 z-0"></div>;
};

export default ThreeCanvas;
