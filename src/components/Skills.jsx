import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper function for Devicon URLs
const deviconUrl = (name, type = 'original') => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

const SkillsSection = () => {
  const sectionRef = useRef(null);

  const frontendSkills = [
    { name: 'HTML5', icon: deviconUrl('html5') },
    { name: 'CSS3', icon: deviconUrl('css3') },
    { name: 'SASS', icon: deviconUrl('sass', 'original') }, // Added SASS
    { name: 'Bootstrap', icon: deviconUrl('bootstrap', 'original') }, // Added Bootstrap
    { name: 'React JS', icon: deviconUrl('react') },
    { name: 'Next.js', icon: deviconUrl('nextjs', 'original-wordmark') },
    { name: 'React Router', icon: deviconUrl('reactrouter', 'original') },
    { name: 'Tailwind CSS', icon: deviconUrl('tailwindcss', 'original-wordmark') },
    { name: 'JavaScript', icon: deviconUrl('javascript') },
    { name: 'jQuery', icon: deviconUrl('jquery', 'original-wordmark') }, // Added jQuery
    { name: 'TypeScript', icon: deviconUrl('typescript') },
    { name: 'Three.js', icon: deviconUrl('threejs', 'original-wordmark') },
    { name: 'GSAP', icon: 'https://img.icons8.com/ios-filled/50/000000/filled-circle.png' }, // Updated GSAP icon to a simple dot
    { name: 'Figma', icon: deviconUrl('figma') }
  ];

  const backendSkills = [
    { name: 'MongoDB', icon: deviconUrl('mongodb', 'original-wordmark') },
    { name: 'Express', icon: deviconUrl('express', 'original-wordmark') },
    { name: 'Node', icon: deviconUrl('nodejs', 'original-wordmark') },
    { name: 'Git', icon: deviconUrl('git') },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'API', icon: 'https://img.icons8.com/ios/50/api-settings.png' }, // Added API (placeholder icon)
    { name: 'Email JS', icon: 'https://www.emailjs.com/favicon.ico' },
    { name: 'Claude AI', icon: 'https://img.icons8.com/ios-filled/50/artificial-intelligence.png' },
    { name: 'Gemini AI', icon: 'https://img.icons8.com/fluency/48/google-gemini.png' }, // Added Gemini AI (placeholder icon)
    { name: 'SMTP', icon: 'https://img.icons8.com/ios/50/secured-letter--v1.png' },
    { name: 'JWT', icon: 'https://img.icons8.com/ios/50/key--v1.png' },
    { name: 'Payment Integration', icon: 'https://img.icons8.com/ios/50/bank-card-back-side--v1.png' },
  ];

  const problemSolvingSkills = [
    { name: 'C', icon: deviconUrl('c') },
    { name: 'C++', icon: deviconUrl('cplusplus') },
    { name: 'Java', icon: deviconUrl('java', 'original-wordmark') },
  ];

  const professionalSkills = [
    { name: 'Communication', icon: 'https://img.icons8.com/ios/50/speech-bubble--v1.png' },
    { name: 'Team Work', icon: 'https://img.icons8.com/ios/50/collaboration--v1.png' },
    { name: 'Project Management', icon: 'https://img.icons8.com/ios/50/briefcase--v1.png' },
    { name: 'Creativity', icon: 'https://img.icons8.com/ios/50/paint-palette.png' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          delay: (index % 4) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SkillCard = ({ skill }) => {
    const IconUrl = skill.icon;
    return (
      <div className="skill-card group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50">
        <div className="flex flex-col items-center space-y-4">
          {/* Adjusted icon container size and image size */}
          <div className="h-10 w-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 flex items-center justify-center">
            <img
              src={IconUrl}
              alt={`${skill.name} logo`}
              className="max-w-full max-h-full object-contain" // Use max-w/max-h for better scaling within container
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 text-center">
            {skill.name}
          </h3>
        </div>
        <div className="absolute inset-0 bg-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-16 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-16">
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frontend Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {frontendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Backend Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {backendSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Problem Solving</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {problemSolvingSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {professionalSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;









