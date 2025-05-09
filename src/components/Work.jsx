import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaReact } from 'react-icons/fa';

const workExperience = [
  {
    title: "Full Stack Web Engineer",
    company_name: "dolt",
    logo: "/path/to/dolt-logo.png",
    icon: <FaBriefcase />,
    iconBg: "#E63946",
    date: "Feb 2025 - Present",
    points: [
      "Developing and maintaining web applications using React, Node.js, and MongoDB.",
      "Collaborating within an Agile team to deliver features and fix bugs.",
      "Implementing RESTful APIs and integrating third-party services.",
      "Participating in code reviews and contributing to architectural decisions.",
    ],
  },
  {
    title: "Frontend Developer (Contract)",
    company_name: "joeaf_fruits",
    logo: "/path/to/joeaf-logo.png",
    icon: <FaReact />,
    iconBg: "#E63946",
    date: "Dec 2024 - Jan 2025",
    points: [
      "Led the frontend development for a client's promotional website using React.",
      "Ensured cross-browser compatibility and responsive design.",
      "Translated Figma designs into functional user interfaces.",
      "Communicated progress and challenges effectively with the project manager.",
    ],
  },
];

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    key={experience.company_name}
    contentStyle={{
      background: '#112240',
      color: '#ccd6f6',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid #233554',
      padding: window.innerWidth < 768 ? '1rem' : '1.5rem',
    }}
    contentArrowStyle={{ borderRight: '7px solid #112240' }}
    date={experience.date}
    iconStyle={{
      background: experience.iconBg,
      color: '#fff',
      boxShadow: '0 0 0 3px #233554',
    }}
    icon={experience.icon}
  >
    <div className="mb-2 sm:mb-3">
      <div>
        <h3 className='text-gray-100 text-lg sm:text-xl md:text-2xl font-bold'>{experience.title}</h3>
        <p className='text-[#E63946] text-base sm:text-lg font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>
    </div>
    <ul className='mt-2 sm:mt-4 list-disc ml-4 sm:ml-5 space-y-1 sm:space-y-2'>
      {experience.points.map((point, pointIndex) => (
        <li
          key={`experience-point-${pointIndex}`}
          className='text-[#a8b2d1] text-xs sm:text-sm md:text-base pl-1 tracking-wide'
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Work = () => {
  // Add state to track screen width
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div name='work' className='w-full min-h-screen bg-transparent text-gray-300 py-16 md:py-24'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-4 sm:pb-8 text-center'>
          <p className='text-3xl sm:text-4xl md:text-5xl font-bold inline border-b-4 border-[#E63946] text-gray-100'>
            Work Experience
          </p>
          <p className='py-3 sm:py-6 text-base sm:text-lg text-gray-400'>// My professional journey.</p>
        </div>
        <div className="mt-6 sm:mt-10">
          <VerticalTimeline 
            lineColor={'#233554'}
            animate={!isMobile} // Disable animations on mobile for better performance
            className={isMobile ? 'vertical-timeline-custom-mobile' : ''}
          >
            {workExperience.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
}

export default Work;
