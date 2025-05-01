import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skill3D from './Skill3D';

gsap.registerPlugin(ScrollTrigger);

const deviconUrl = (name, type = 'original') => 
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobileView, setIsMobileView] = useState(false);
  
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
          <p className="heading-sub text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            I've developed expertise in various technologies across the full-stack spectrum,
            with a focus on building performant, user-friendly web applications.
          </p>
        </div>
        
        {/* Category filters - improved for touch and mobile */}
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
        
        {/* Skills count indicator - more compact */}
        <div className="skills-counter text-center text-slate-400 mb-2 md:mb-4 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-transparent rounded-full text-xs font-medium">
            Showing {filteredSkills.length} of {allSkills.length} skills
          </span>
          {activeCategory !== 'All' && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-800/50 rounded-full text-xs font-medium">
              Category: <span className="text-emerald-400">{activeCategory}</span>
            </span>
          )}
        </div>
        
        {/* 3D Skills Visualization - optimized for different devices */}
        <div className="cube-container mb-3 md:mb-5">
          <Skill3D 
            skills={filteredSkills} 
            height={isMobileView ? '420px' : '65vh'} 
          />
        </div>
        
        {/* Instructions for better UX - made more concise */}
        <div className="text-center mb-3 md:mb-5">
          <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800/70 rounded-full text-xs text-slate-300">
            <span className="hidden sm:inline">👆 </span>
            {isMobileView 
              ? "Tap bubbles to see details" 
              : "Hover over bubbles to see details, click to pin"}
          </span>
        </div>
        
        {/* Footer text - more compact */}
        <div className="skills-footer text-center text-gray-300 max-w-2xl mx-auto bg-slate-800/30 p-2 sm:p-3 md:p-4 rounded-xl">
          <p className="text-xs sm:text-sm md:text-base mb-1">
            These are the technologies I've worked with to build web applications and solve complex problems.
          </p>
          <p className="text-xs text-slate-400">
            The interactive 3D visualization shows my key skills and their proficiency levels.
          </p>
        </div>
      </div>
    </div>
  );
}









