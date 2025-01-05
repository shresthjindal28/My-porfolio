// src/components/Home.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Home = () => {
  const elementRefs = {
    header: useRef(),
    description: useRef(),
    cta: useRef(),
    social: useRef(),
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    
    timeline
      .from(elementRefs.header.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      })
      .from(elementRefs.description.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .from(elementRefs.cta.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .from(elementRefs.social.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .to(elementRefs.header.current, {
        opacity: 1
      })
      .to(elementRefs.description.current, {
        opacity: 1
      })
      .to(elementRefs.cta.current, {
        opacity: 1
      })
      .to(elementRefs.social.current, {
        opacity: 1
      })
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-3xl md:mt-9 mx-auto text-center relative">
        <h1 
          ref={elementRefs.header}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
        >
          Hi, I'm <span className="text-yellow-400">Shresth Jindal</span>
          <span className="block text-2xl md:text-3xl mt-4 text-gray-400">
            Full Stack Developer & UI/UX Enthusiast
          </span>
        </h1>

        <p 
          ref={elementRefs.description}
          className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
        >
          I craft modern web experiences using React.js, Next.js, Three.js, and Tailwind CSS. 
          Passionate about creating intuitive user interfaces and scalable backend solutions.
          With expertise in MERN stack and cloud technologies, I transform ideas into robust applications.
          I enjoy solving complex problems and learning new technologies to stay at the forefront of web development.
        </p>

        <div 
          ref={elementRefs.cta}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          
          <a
            href="/Shresth-resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors duration-300"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-medium hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>

        <div 
          ref={elementRefs.social}
          className="flex justify-center space-x-6"
        >
          <a 
            href="https://github.com/shresthjindal28" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/shresth-jindal-b074ba28b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://x.com/shresth_ji76019?t=4w7wPZQNHUNEfCmmGxT7vg&s=08" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            aria-label="Twitter Profile"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
