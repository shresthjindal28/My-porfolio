import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaReact, FaLaptopCode, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';

const workExperience = [
  {
    title: "Full Stack Web Engineer",
    company_name: "Dolt Technologies",
    logo: "/images/logos/dolt-logo.png",
    fallbackLogo: "/images/logos/placeholder-logo.svg",
    icon: <FaBriefcase />,
    iconBg: "#E63946",
    date: "Feb 2025 - Present",
    location: "San Francisco, CA (Remote)",
    skills: ["React", "Node.js", "MongoDB", "GraphQL", "AWS"],
    points: [
      "Developing and maintaining web applications using React, Node.js, and MongoDB.",
      "Collaborating with cross-functional teams in an Agile environment to deliver high-quality features.",
      "Implementing RESTful APIs and integrating third-party services for seamless user experiences.",
      "Participating in code reviews and contributing to architectural decisions for system improvements."
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "JoeAF Digital",
    logo: "/images/logos/joeaf-logo.png", 
    fallbackLogo: "/images/logos/placeholder-logo.svg",
    icon: <FaReact />,
    iconBg: "#3b82f6",
    date: "Dec 2024 - Jan 2025",
    location: "New York, NY (Contract)",
    skills: ["React", "Next.js", "Tailwind CSS", "Figma", "Vercel"],
    points: [
      "Led frontend development for a client's promotional website using React and Next.js.",
      "Ensured cross-browser compatibility and responsive design across all device types.",
      "Translated Figma designs into functional, pixel-perfect user interfaces.",
      "Communicated progress and challenges effectively with stakeholders and project managers."
    ],
  }
];

const ExperienceCard = ({ experience, isMobile }) => {
  const [logoSrc, setLogoSrc] = useState(experience.logo);
  const [logoError, setLogoError] = useState(false);
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#112240',
        color: '#ccd6f6',
        borderRadius: '12px',
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        border: '1px solid #233554',
        padding: isMobile ? '1.5rem' : '2rem',
      }}
      contentArrowStyle={{ borderRight: '7px solid #112240' }}
      date={experience.date}
      dateClassName="text-gray-400 font-mono text-sm md:text-base"
      iconStyle={{
        background: experience.iconBg,
        color: '#fff',
        boxShadow: '0 0 0 4px #233554',
      }}
      icon={experience.icon}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className='text-gray-100 text-xl sm:text-2xl font-bold'>{experience.title}</h3>
          {!isMobile && !logoError && (
            <img 
              src={logoSrc} 
              alt={`${experience.company_name} logo`} 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                if (logoSrc !== experience.fallbackLogo) {
                  setLogoSrc(experience.fallbackLogo);
                } else {
                  setLogoError(true);
                }
              }}
            />
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className='text-primary text-base font-semibold m-0'>
            {experience.company_name}
          </p>
          {experience.location && (
            <span className="text-gray-400 text-sm mt-1 sm:mt-0">
              {experience.location}
            </span>
          )}
        </div>
      </div>
      
      {experience.skills && (
        <div className="flex flex-wrap gap-2 my-3">
          {experience.skills.map((skill, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-dark-600 text-dark-200"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      
      <ul className='mt-4 list-disc ml-5 space-y-2'>
        {experience.points.map((point, pointIndex) => (
          <li
            key={`experience-point-${pointIndex}`}
            className='text-dark-200 text-sm sm:text-base tracking-wide pl-1'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Work = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id='work' className='w-full min-h-screen bg-transparent relative'>
      <div className='max-w-7xl mx-auto p-4'>
        <div className='pb-12 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Work Experience</h2>
            <p className="mt-4 text-dark-300 max-w-2xl mx-auto">
              My professional journey in the tech industry and the roles I've had the opportunity to take on.
            </p>
          </motion.div>
        </div>
        
        <div className="mt-12">
          <VerticalTimeline 
            lineColor={'#233554'}
            animate={!isMobile}
            className={isMobile ? 'vertical-timeline-custom-line' : ''}
          >
            {workExperience.map((experience, index) => (
              <ExperienceCard 
                key={index} 
                experience={experience}
                isMobile={isMobile} 
              />
            ))}
            
            {/* Timeline start element */}
            <VerticalTimelineElement
              iconStyle={{
                background: '#112240',
                color: '#ccd6f6',
                boxShadow: '0 0 0 4px #233554',
              }}
              icon={
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-xs font-mono">START</span>
                </div>
              }
            />
          </VerticalTimeline>
        </div>
        
        <div className="text-center mt-16">
          <a
            href="/shresth_jindal_resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <span>Download Full Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Replace the problematic style jsx with regular CSS */}
      <style>{`
        .vertical-timeline-custom-line::before {
          left: 18px !important;
        }
        
        @media only screen and (max-width: 1169px) {
          .vertical-timeline-element-icon {
            left: 0 !important;
          }
          
          .vertical-timeline-element-content {
            margin-left: 40px !important;
          }
          
          .vertical-timeline-element-content-arrow {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Work;
