import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const technicalRef = useRef(null);
  const professionalRef = useRef(null);

  const technicalSkills = [
    { name: 'React JS', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'MongoDB', level: 80 },
    { name: 'Express', level: 75 },
    { name: 'Node', level: 82 },
    { name: 'Three.js', level: 70 },
    { name: 'Git', level: 85 },
    { name: 'Postman', level: 78 },
    { name: 'Email JS', level: 75 },
    { name: 'GSAP', level: 72 }
  ];

  const professionalSkills = [
    { name: 'Communication', level: 95 },
    { name: 'Team Work', level: 95 },
    { name: 'Project Management', level: 85 },
    { name: 'Creativity', level: 90 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate technical skills section
      gsap.from(technicalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: technicalRef.current,
          start: 'top 80%',
          onEnter: () => setIsVisible(true)
        }
      });

      // Animate professional skills section
      gsap.from(professionalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: professionalRef.current,
          start: 'top 80%'
        }
      });

      // Animate skill bars
      technicalSkills.forEach((_, index) => {
        gsap.to(`#skill-bar-${index}`, {
          width: `${technicalSkills[index].level}%`,
          duration: 1,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: technicalRef.current,
            start: 'top 80%'
          }
        });
      });

      // Animate circular progress
      professionalSkills.forEach((skill, index) => {
        gsap.to(`#circle-progress-${index}`, {
          strokeDasharray: `${skill.level * 2.51} 251`,
          duration: 1,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: professionalRef.current,
            start: 'top 80%'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [technicalSkills, professionalSkills]); // Add dependencies

  const CircleProgress = ({ percentage, label, index }) => (
    <div className="flex bg-transparent backdrop-blur-sm flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            className="stroke-gray-700 fill-none"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            id={`circle-progress-${index}`}
            className="stroke-emerald-400 fill-none"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            strokeDasharray="0 251"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-emerald-400">
          {percentage}%
        </span>
      </div>
      <span className="mt-2 text-sm text-gray-300">{label}</span>
    </div>
  );

  return (
    <div ref={sectionRef} className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div ref={technicalRef} className="bg-transparent backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        id={`skill-bar-${index}`}
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Skills */}
          <div ref={professionalRef} className="bg-gray-800/50 rounded-lg shadow-lg border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Professional Skills</h2>
              <div className="grid grid-cols-2 gap-8">
                {professionalSkills.map((skill, index) => (
                  <CircleProgress
                    key={skill.name}
                    percentage={skill.level}
                    label={skill.name}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
