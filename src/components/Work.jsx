import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaReact } from 'react-icons/fa';

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

const TimelineCard = ({ experience, index, isMobile }) => {
  const [logoSrc, setLogoSrc] = useState(experience.logo);
  const [logoError, setLogoError] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setLogoSrc(experience.logo);
    setLogoError(false);
  }, [experience.logo]);

  const isEven = index % 2 === 0;
  const isLeft = isEven;
  
  const cardVariants = {
    hidden: { opacity: 0, x: isLeft && !isMobile ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.1
      }
    }
  };

  return (
    <div className={`relative mb-8 flex ${isMobile ? 'justify-start' : (isLeft ? 'justify-start' : 'justify-end')}`}>
      <div className="absolute top-0 transform -translate-y-1/2 z-10"
           style={{ left: isMobile ? '13px' : '50%', transform: isMobile ? 'translateX(0)' : 'translateX(-50%)' }}>
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-purple-400 shadow-md"
          style={{ backgroundColor: experience.iconBg }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white text-lg">{experience.icon}</span>
        </motion.div>
      </div>

      <motion.div
        ref={cardRef}
        className={`relative w-full p-6 rounded-xl shadow-xl backdrop-blur-sm
                    ${isMobile ? 'ml-10 max-w-sm' : 'max-w-md'}
                    bg-gradient-to-br from-blue-900/70 to-blue-950/70 border border-blue-800/50 hover:border-[#64ffda] transition-all duration-300 ease-in-out`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className='text-gray-100 text-xl font-bold leading-tight group-hover:text-[#64ffda] transition-colors duration-300'>{experience.title}</h3>
          {!logoError && (
            <motion.img
              key={logoSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={logoSrc}
              alt={`${experience.company_name} logo`}
              className="h-8 w-auto object-contain ml-4 flex-shrink-0"
              onError={() => {
                if (logoSrc !== experience.fallbackLogo) {
                  setLogoSrc(experience.fallbackLogo);
                } else {
                  setLogoError(true);
                }
              }}
            />
          )}
        </div>

        <p className='text-[#64ffda] text-sm font-semibold mb-1'>{experience.company_name}</p>
        <p className='text-gray-400 text-xs mb-3'>{experience.date} &bull; {experience.location}</p>

        {experience.skills && (
          <div className="flex flex-wrap gap-2 my-3">
            {experience.skills.slice(0, 4).map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                className="text-xs px-3 py-1 rounded-full bg-blue-800/60 text-blue-200 border border-blue-700/80
                           hover:bg-[#64ffda] hover:text-blue-950 hover:border-[#3b82f6] transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {experience.skills.length > 4 && (
              <span className="text-xs text-gray-500 mt-1 ml-1">+{experience.skills.length - 4} more</span>
            )}
          </div>
        )}

        <ul className='mt-4 list-none pl-0 space-y-2 text-gray-300 text-sm'>
          {experience.points.slice(0, 3).map((point, pointIndex) => (
            <li key={`point-${pointIndex}`} className='relative pl-5'>
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#64ffda] opacity-75"></span>
              {point.length > 100 ? `${point.substring(0, 100)}...` : point}
            </li>
          ))}
          {experience.points.length > 3 && (
            <li className="text-gray-400 text-xs mt-2 pl-5">...more on resume</li>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

TimelineCard.propTypes = {
  experience: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const Work = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength1 = 800;
  const pathLength2 = 700;
  const pathLength3 = 600;

  const dashoffset1 = useTransform(scrollYProgress, [0, 1], [pathLength1, 0]);
  const dashoffset2 = useTransform(scrollYProgress, [0, 1], [pathLength2, 0]);
  const dashoffset3 = useTransform(scrollYProgress, [0, 1], [pathLength3, 0]);

  const { scrollYProgress: lineScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });
  const lineDashoffset = useTransform(lineScrollYProgress, [0, 1], [1000, 0]); // Using a large value for the line height transform

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const floatVariants = {
    animate: i => ({
      y: [0, 10 * i, 0],
      x: [0, 5 * i, 0],
      transition: {
        duration: 15 + i * 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    }),
  };

  return (
    <div id='work' ref={sectionRef} className='w-full min-h-screen bg-transparent relative py-12 overflow-hidden flex flex-col justify-center'>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <motion.div
          variants={floatVariants}
          animate="animate"
          custom={1}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-[100px]"
        ></motion.div>
        <motion.div
          variants={floatVariants}
          animate="animate"
          custom={-1}
          className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-purple-500 blur-[120px]"
        ></motion.div>
        <motion.div
          variants={floatVariants}
          animate="animate"
          custom={0.5}
          className="absolute top-1/2 left-[10%] w-52 h-52 rounded-full bg-green-500 blur-[90px] opacity-20"
        ></motion.div>

        {/* --- Animated SVG Curves --- */}
        <svg className="absolute w-full h-full left-0 top-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M50 50 C200 0, 400 150, 600 50 C800 -50, 1000 100, 1350 50"
            stroke="#64ffda"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength1,
              strokeDashoffset: dashoffset1,
              filter: 'blur(0.5px) opacity(0.7)'
            }}
          />
          <motion.path
            d="M1350 200 C1100 250, 900 100, 700 200 C500 300, 300 150, 50 200"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength2,
              strokeDashoffset: dashoffset2,
              filter: 'blur(0.5px) opacity(0.6)'
            }}
          />
          <motion.path
            d="M50 700 C300 750, 600 600, 900 700 C1100 800, 1300 650, 1350 700"
            stroke="#FFD700"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength3,
              strokeDashoffset: dashoffset3,
              filter: 'blur(0.5px) opacity(0.5)'
            }}
          />
        </svg>
      </div>

      <div className='max-w-7xl mx-auto p-4 relative z-10 w-full'>
        {/* Section Title */}
        <div className='pb-12 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-3 relative inline-block">
              Work Experience
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda] to-transparent"></span>
            </h2>
            <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              My professional journey in the tech industry and the roles I&apos;ve had the opportunity to take on.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Main vertical timeline line */}
          <motion.div
            className="absolute bg-blue-700/60 h-full w-0.5 rounded-full"
            style={{
              left: isMobile ? '20px' : '50%',
              transform: isMobile ? 'translateX(-50%)' : 'translateX(-50%)',
              height: 'calc(100% - 100px)',
              top: '50px'
            }}
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 100px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
             <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#64ffda] to-[#3b82f6] rounded-full"
                style={{
                    height: lineDashoffset,
                    transformOrigin: 'top',
                    transform: 'scaleY(0)',
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Timeline Cards */}
          <div className="flex flex-col items-center">
            {workExperience.map((experience, index) => (
              <TimelineCard
                key={index}
                experience={experience}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              // THIS IS THE CRUCIAL LINE TO VERIFY
              href="/shresth_jinadl_resume.pdf"
              download="shresth_jindal_resume.pdf" // Explicitly suggest the filename
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
    </div>
  );
}

export default Work;