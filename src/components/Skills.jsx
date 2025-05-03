import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skill3D from './Skill3D';

gsap.registerPlugin(ScrollTrigger);

const deviconUrl = (name, type = 'original') => 
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

// Category color mapping
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

// Detail card component moved from Skill3D.jsx
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
  
  // Helper function to validate icon URLs (moved from Skill3D)
  const getValidIconUrl = (url) => {
    const FALLBACK_ICON = 'https://img.icons8.com/ios/50/code--v1.png';
    if (
      typeof url !== 'string' ||
      url.trim() === '' ||
      !(url.endsWith('.svg') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.startsWith('data:image'))
    ) {
      return FALLBACK_ICON;
    }
    return url;
  };
  
  return (
    <div
      className={`
        bg-slate-900/95 rounded-xl ${isMobile ? 'p-2.5' : 'p-4'} 
        shadow-xl backdrop-blur-md w-full
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
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} leading-normal`}>
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
        <div className="text-center py-2.5 flex flex-col justify-center">
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

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobileView, setIsMobileView] = useState(false);
  const [displayedSkill, setDisplayedSkill] = useState(null);
  
  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const categories = [
    'All', 'Frontend', 'Backend', 'Programming', 
    'Database', 'DevOps', 'Tools', 'Design', 'Graphics', 'Animation'
  ];
  
  const allSkills = [
    { name: 'HTML5', icon: deviconUrl('html5'), category: 'Frontend', proficiency: 95, description: 'Markup language for structuring web content. I use HTML5 semantic elements for better accessibility and SEO.' },
    { name: 'CSS3', icon: deviconUrl('css3'), category: 'Frontend', proficiency: 92, description: 'Stylesheet language for designing web pages. I create responsive, mobile-first layouts with modern CSS features.' },
    { name: 'SASS', icon: deviconUrl('sass', 'original'), category: 'Frontend', proficiency: 88, description: 'CSS preprocessor for advanced styling. I use variables, mixins, and nesting for maintainable stylesheets.' },
    { name: 'Bootstrap', icon: deviconUrl('bootstrap', 'original'), category: 'Frontend', proficiency: 90, description: 'Popular CSS framework for responsive design. I build interfaces quickly with Bootstrap components.' },
    { name: 'React JS', icon: deviconUrl('react'), category: 'Frontend', proficiency: 94, description: 'JavaScript library for building user interfaces. I create reusable components and manage state efficiently.' },
    { name: 'Next.js', icon: deviconUrl('nextjs', 'original-wordmark'), category: 'Frontend', proficiency: 85, description: 'React framework for production. I leverage server-side rendering and static site generation.' },
    { name: 'React Router', icon: deviconUrl('reactrouter', 'original'), category: 'Frontend', proficiency: 92, description: 'Routing library for React applications. I implement client-side navigation with dynamic routes.' },
    { name: 'Tailwind CSS', icon: deviconUrl('tailwindcss', 'original-wordmark'), category: 'Frontend', proficiency: 93, description: 'Utility-first CSS framework. I rapidly build custom designs without leaving HTML.' },
    { name: 'JavaScript', icon: deviconUrl('javascript'), category: 'Programming', proficiency: 95, description: 'Core language for web development. I write modern ES6+ code with proper patterns and practices.' },
    { name: 'jQuery', icon: deviconUrl('jquery', 'original-wordmark'), category: 'Frontend', proficiency: 88, description: 'JavaScript library for DOM manipulation. I use it for legacy projects that require cross-browser compatibility.' },
    { name: 'TypeScript', icon: deviconUrl('typescript'), category: 'Programming', proficiency: 86, description: 'Typed superset of JavaScript. I leverage type safety for more robust, maintainable code.' },
    { name: 'Three.js', icon: deviconUrl('threejs', 'original-wordmark'), category: 'Graphics', proficiency: 82, description: 'JavaScript 3D library. I create immersive 3D experiences for websites like this portfolio.' },
    { name: 'GSAP', icon: 'https://greensock.com/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png', category: 'Animation', proficiency: 88, description: 'Animation platform for high-performance animations. I create smooth, complex animations for web interfaces.' },
    { name: 'Figma', icon: deviconUrl('figma'), category: 'Design', proficiency: 85, description: 'Collaborative interface design tool. I design mockups and prototypes before implementation.' },
    { name: 'MongoDB', icon: deviconUrl('mongodb', 'original-wordmark'), category: 'Database', proficiency: 87, description: 'NoSQL database for modern apps. I design schemas and handle CRUD operations efficiently.' },
    { name: 'Express', icon: deviconUrl('express', 'original-wordmark'), category: 'Backend', proficiency: 88, description: 'Web framework for Node.js. I build REST APIs and handle middleware for server-side logic.' },
    { name: 'Node.js', icon: deviconUrl('nodejs', 'original-wordmark'), category: 'Backend', proficiency: 90, description: 'JavaScript runtime for server-side apps. I build scalable backend services and APIs.' },
    { name: 'Git', icon: deviconUrl('git'), category: 'DevOps', proficiency: 91, description: 'Version control system. I manage code repositories with branching, merging, and collaboration workflows.' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', category: 'Tools', proficiency: 89, description: 'API development and testing tool. I test endpoints and document APIs for frontend integration.' },
    { name: 'REST API', icon: 'https://img.icons8.com/ios/50/api-settings.png', category: 'Backend', proficiency: 92, description: 'RESTful API architecture. I design and implement standardized APIs following REST principles.' },
    { name: 'Email JS', icon: 'https://www.emailjs.com/favicon.ico', category: 'Integration', proficiency: 86, description: 'Service for sending emails from JavaScript. I integrate contact forms without server-side code.' },
    { name: 'C', icon: deviconUrl('c'), category: 'Programming', proficiency: 82, description: 'General-purpose programming language. I have experience with data structures and algorithm implementation.' },
    { name: 'C++', icon: deviconUrl('cplusplus'), category: 'Programming', proficiency: 84, description: 'Object-oriented programming language. I solve complex problems with efficient code.' },
    { name: 'Java', icon: deviconUrl('java', 'original-wordmark'), category: 'Programming', proficiency: 83, description: 'Popular language for enterprise apps. I build robust applications with OOP principles.' },
    { name: 'Redux', icon: deviconUrl('redux', 'original'), category: 'Frontend', proficiency: 87, description: 'State management library for JavaScript apps. I implement complex state logic with Redux store and actions.' },
    { name: 'Firebase', icon: deviconUrl('firebase', 'plain'), category: 'Backend', proficiency: 85, description: 'Platform for web and mobile apps. I use Firebase for authentication, database, and hosting services.' },
    { name: 'Docker', icon: deviconUrl('docker', 'original'), category: 'DevOps', proficiency: 79, description: 'Containerization platform. I create and deploy applications in containers for consistency across environments.' },
  ];

  // Filter skills based on selected category
  const filteredSkills = activeCategory === 'All' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);
  
  // Animation setup with improved scrolling behavior
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center", 
        toggleActions: "play none none none"
      }
    });
    
    // Animate heading with a nicer effect
    tl.fromTo(
      section.querySelector('.heading-main'),
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    )
    .fromTo(
      section.querySelector('.heading-sub'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    );
    
    // Animate category filters with stagger effect
    tl.fromTo(
      section.querySelectorAll('.category-item'),
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.5)"
      },
      "-=0.2"
    );
    
    // Animate 3D container with a reveal effect
    tl.fromTo(
      section.querySelector('.cube-container'),
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.inOut"
      },
      "-=0.3"
    );
    
    // Add counter animation for skills count
    tl.fromTo(
      section.querySelector('.skills-counter'),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5
      },
      "-=0.7"
    );
    
    // Animate footer text
    tl.fromTo(
      section.querySelector('.skills-footer'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      },
      "-=0.4"
    );
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="min-h-screen px-4 py-8 sm:py-12 sm:px-6 lg:px-8 bg-transparent"
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="heading-main text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-white">
            My <span className="text-emerald-400">Skills</span>
          </h2>
        </div>
        
        {/* Category filters */}
        <div className="category-filters flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 mb-3 md:mb-5 px-1 sm:px-0">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-item px-2 sm:px-2.5 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 relative
                ${activeCategory === category 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transform scale-105' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {category}
              {activeCategory === category && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
        
        {/* New layout with 3D model and card side by side */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* 3D Model Side */}
          <div className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] lg:w-1/2 relative flex items-center justify-center">
            <Skill3D 
              skills={filteredSkills}
              onSkillSelect={setDisplayedSkill}
            />
          </div>
          
          {/* Card Side */}
          <div className="w-full lg:w-2/5 mt-6 lg:mt-0">
            <DetailCard skill={displayedSkill} isMobile={isMobileView} />
            
            {/* Instructions - now on the card side */}
            <div className="text-center lg:text-left mt-3 md:mt-5">
              <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800/70 rounded-full text-xs text-slate-300">
                <span className="hidden sm:inline">👆 </span>
                {isMobileView 
                  ? "Tap bubbles to see details" 
                  : "Hover over bubbles to see details, click to pin"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









