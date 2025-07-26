// src/components/Home.jsx
import  { useRef, Suspense, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Home3DModel from './Home3DModel';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';

// Fallback component for 3D model
const ModelFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-primary animate-pulse text-center">
      <div className="w-24 h-24 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm">Loading 3D Model...</p>
    </div>
  </div>
);

// Skeleton placeholder for FCP
const SkeletonPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    
  </div>
);

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  // Skeleton state for FCP
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-screen bg-gradient-radial from-dark-700/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* 3D Model Container - only show on larger screens */}
        <motion.div
          style={{ y: y1, opacity }}
          className="w-full lg:w-1/2 order-2 lg:order-1 mt-8 lg:mt-0 flex items-center justify-center"
        >
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-md animate-pulse" />
            <div className="absolute inset-3 rounded-full bg-dark-800 border border-dark-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              {showSkeleton ? (
                <SkeletonPlaceholder />
              ) : (
                <Suspense fallback={<ModelFallback />}>
                  <Home3DModel />
                </Suspense>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Hero Text Content */}
        <motion.div
          style={{ y: y2, opacity }}
          className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2 text-primary font-mono"
          >
            Hi there, my name is
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="block text-gray-100">Shresth Jindal</span>
            <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Full Stack Developer
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-dark-200 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8"
          >
            I build interactive, accessible, and responsive web applications with modern technologies. 
            Specializing in the MERN stack and passionate about creating exceptional digital experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
          >
            <a
              href="/shresth_jinadl_resume.pdf"
              download="Shresth_Jindal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download Resume
            </a>
            
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={800}
              offset={-80}
              className="btn-outline"
            >
              View Projects
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex justify-center lg:justify-start space-x-5"
          >
            {[
              { icon: <FaGithub />, url: "https://github.com/shresthjindal28", label: "GitHub" },
              { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/shresth-jindal-b074ba28b", label: "LinkedIn" },
              { icon: <FaTwitter />, url: "https://x.com/shresth_ji76019", label: "Twitter" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + (index * 0.1) }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-dark-200 border border-dark-500 bg-dark-700 hover:bg-dark-600 hover:text-primary hover:border-primary transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      

    </div>
  );
};

export default Home;
