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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(17, 34, 64, 0.85)',
        backdropFilter: 'blur(4px)',
        color: '#ccd6f6',
        borderRadius: '12px',
        boxShadow: '0 5px 15px -10px rgba(0, 0, 0, 0.3)',
        border: '1px solid #233554',
        padding: '1.25rem',
        transition: 'all 0.3s ease-in-out',
        maxWidth: isMobile ? '100%' : '90%',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(17, 34, 64, 0.85)' }}
      date={experience.date}
      dateClassName="text-gray-300 font-mono text-xs md:text-sm font-medium"
      iconStyle={{
        background: experience.iconBg,
        color: '#fff',
        boxShadow: '0 0 0 3px #233554',
        width: '28px',
        height: '28px',
      }}
      icon={experience.icon}
    >
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className='text-gray-100 text-lg font-bold'>{experience.title}</h3>
          
          {!isMobile && !logoError && (
            <img 
              src={logoSrc} 
              alt={`${experience.company_name} logo`} 
              className="h-6 w-auto object-contain ml-2"
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
          <p className='text-primary text-sm font-medium m-0' style={{
            color: '#64ffda',
          }}>
            {experience.company_name}
          </p>
          {experience.location && (
            <span className="text-gray-400 text-xs mt-1 sm:mt-0">
              {experience.location}
            </span>
          )}
        </div>
      </div>
      
      {experience.skills && (
        <div className="flex flex-wrap gap-1 my-2">
          {experience.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(35, 53, 84, 0.6)',
                color: '#a8b2d1',
                fontSize: '0.65rem',
              }}
            >
              {skill}
            </span>
          ))}
          {experience.skills.length > 3 && (
            <span className="text-xs text-gray-400">+{experience.skills.length - 3}</span>
          )}
        </div>
      )}
      
      {/* Show only first 2 bullet points */}
      <ul className='mt-2 list-none ml-0 space-y-1'>
        {experience.points.slice(0, 2).map((point, pointIndex) => (
          <li
            key={`experience-point-${pointIndex}`}
            className='text-gray-300 text-xs tracking-wide pl-3 relative'
          >
            <span className="absolute left-0 top-1.5 h-1 w-1 rounded-full bg-gray-500"></span>
            {point.length > 75 ? `${point.substring(0, 75)}...` : point}
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
    <div id='work' className='w-full min-h-screen bg-transparent relative py-12'>
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-purple-500 blur-[120px]"></div>
      </div>
      
      <div className='max-w-7xl mx-auto p-4 relative z-10'>
        <div className='pb-12 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-3 relative inline-block">
              Work Experience
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
            </h2>
            <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              My professional journey in the tech industry and the roles I've had the opportunity to take on.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <VerticalTimeline 
            lineColor={'rgba(35, 53, 84, 0.8)'}
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
                color: '#64ffda',
                boxShadow: '0 0 0 3px #233554',
                width: '28px',
                height: '28px',
              }}
              icon={
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-[0.6rem] font-mono">START</span>
                </div>
              }
            />
          </VerticalTimeline>
        </motion.div>
        
        <div className="text-center mt-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <a
              href="/shresth_jindal_resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-8 py-4 overflow-hidden bg-gray-800 rounded-md group hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              <span className="absolute left-0 block w-0 h-full rounded bg-gradient-to-r from-[#64ffda] to-[#3b82f6] opacity-50 transition-all duration-500 group-hover:w-full -z-10"></span>
              <span className="relative text-gray-100 font-medium text-base group-hover:text-white transition-colors duration-300">Download Full Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-gray-300 group-hover:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* CSS styles */}
      <style>{`
        .vertical-timeline-custom-line::before {
          left: 14px !important;
          width: 2px !important;
        }
        
        .vertical-timeline::before {
          width: 2px !important;
        }
        
        .vertical-timeline-element {
          margin-bottom: 2rem !important;
        }
        
        .vertical-timeline-element-content {
          box-shadow: none !important;
        }
        
        .vertical-timeline-element-icon {
          font-size: 0.8rem !important;
        }
        
        @media only screen and (max-width: 1169px) {
          .vertical-timeline-element-icon {
            left: 0 !important;
            width: 28px !important;
            height: 28px !important;
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
