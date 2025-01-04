// src/components/ProjectDisplay.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    title: "Branding Nice Studio",
    description:
      "The technological revolution is changing the fabric of society itself. Factual knowledge is less prized when ",
    image:
      "https://images.unsplash.com/photo-1735181056575-1f05648efbad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image paths
  },
  {
    id: 2,
    title: "Creative Agency",
    description:
      "Exploring innovative solutions to solve complex problems with creativity and collaboration.",
    image:
      "https://images.unsplash.com/photo-1735181056575-1f05648efbad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Digital Marketing Campaign",
    description:
      "Driving engagement through tailored digital marketing strategies for modern businesses.",
    image:
      "https://images.unsplash.com/photo-1735181056575-1f05648efbad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "E-Commerce Redesign",
    description:
      "Enhancing user experiences with a sleek and modern e-commerce design approach.",
    image:
      "https://images.unsplash.com/photo-1735181056575-1f05648efbad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ProjectDisplay = () => {
  const projectRefs = useRef([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    try {
      gsap.from(projectRefs.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => setLoading(false),
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return (
      <div className="bg-transparent text-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-red-500 text-center">
          <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-xl">Unable to load projects at this time.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400">
      </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent backdrop-blur-sm text-white min-h-screen flex flex-col items-center px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[40vh] object-cover"
            />
            <div className={`absolute w-full bg-black/80 p-6 md:p-2 transition-all duration-300 ease-in-out
              ${isMobile 
                ? 'bottom-0 h-auto opacity-100' 
                : 'group-hover:bottom-0 bottom-[-100%] h-2/3 opacity-0 group-hover:opacity-100'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <a
                href="#"
                className="text-yellow-400 mb-3 underline mt-4 inline-block font-medium hover:text-yellow-300"
              >
                Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDisplay;
