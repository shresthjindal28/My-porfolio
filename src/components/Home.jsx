// src/components/Home.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Home3DModel from './Home3DModel';

const Home = () => {
  const elementRefs = {
    header: useRef(),
    subHeader: useRef(),
    description: useRef(),
    cta: useRef(),
    social: useRef(),
  };

  useEffect(() => {
    const ctaButtons = gsap.utils.toArray(elementRefs.cta.current.children);
    const socialIcons = gsap.utils.toArray(elementRefs.social.current.children);

    gsap.set(
      [
        elementRefs.header.current,
        elementRefs.subHeader.current,
        elementRefs.description.current,
        ctaButtons,
        socialIcons,
      ],
      { opacity: 0 }
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    tl.fromTo(elementRefs.header.current, 
        { y: -50, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1 }
      )
      .fromTo(elementRefs.subHeader.current, 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        "-=0.7"
      ) 
      .fromTo(elementRefs.description.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1 }, 
        "-=0.6"
      )
      .fromTo(ctaButtons, 
        { y: 30, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, stagger: 0.2 }, 
        "-=0.5"
      ) 
      .fromTo(socialIcons, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15 }, 
        "-=0.6"
      ); 
      
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 overflow-hidden bg-transparent">
      
      {/* Text Content Section */}
      <div className="w-full lg:w-1/2 max-w-3xl lg:max-w-none lg:mr-8 text-center lg:text-left relative z-10 py-8 sm:py-10 lg:py-0 flex flex-col justify-center">
        {/* Main Heading */}
        <h1 
          ref={elementRefs.header}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2"
        >
          Hi, I'm <span className="text-yellow-400">Shresth Jindal</span>
        </h1>
        {/* Sub Heading */}
        <span 
          ref={elementRefs.subHeader}
          className="block text-xl sm:text-2xl md:text-3xl text-gray-400 mb-4 sm:mb-6"
        >
          Full Stack Developer & UI/UX Enthusiast
        </span>

        {/* Description */}
        <p 
          ref={elementRefs.description}
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
        >
          Passionate about crafting <span className="text-yellow-300 font-medium">seamless digital experiences</span>. 
          Expertise in MERN stack, Next.js, and cloud solutions. Let's build something amazing together.
        </p>
        <div 
          ref={elementRefs.cta}
          className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <a
            href="/shresth_jinadl_resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="border-2 border-yellow-400 text-yellow-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Contact Me
          </a>
        </div>

        {/* Social Links - more touch-friendly */}
        <div 
          ref={elementRefs.social}
          className="flex justify-center lg:justify-start space-x-6 sm:space-x-8"
        >
          <a 
            href="https://github.com/shresthjindal28" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110 p-1.5 sm:p-2"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/shresth-jindal-b074ba28b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110 p-1.5 sm:p-2"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://x.com/shresth_ji76019?t=4w7wPZQNHUNEfCmmGxT7vg&s=08" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110 p-1.5 sm:p-2"
            aria-label="Twitter Profile"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      {/* 3D Canvas Section - improved responsive sizing */}
      <div className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-screen lg:w-1/2 relative mt-4 sm:mt-6 lg:mt-0 flex items-center justify-center"> 
         <Home3DModel /> 
      </div>

    </div>
  );
};

export default Home;
