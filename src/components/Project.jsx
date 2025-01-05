import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    title: "Employee Management System",
    description:
      "A comprehensive system for managing employee data, attendance, and performance tracking with a user-friendly interface.",
    image: "https://raydana.com/wp-content/uploads/2022/10/Employee-Management-System-Apps.png",
    github: "https://github.com/shresthjindal28/Employee-Management-System"
  },
  {
    id: 2,
    title: "Uber Clone",
    description:
      "A ride-sharing application clone featuring real-time tracking, payment integration, and driver-passenger matching.",
    image: "https://dianapps.com/blog/wp-content/uploads/2022/12/1080600-1024x576.png",
    github: "https://github.com/shresthjindal28/Uber"
  },
  {
    id: 3,
    title: "Resturant Near me",
    description:
      "Location-based restaurant finder with filters, reviews, and real-time availability updates.",
    image: "https://i.ytimg.com/vi/XneDTsGXQFw/maxresdefault.jpg",
    github: "https://github.com/A-netrunner/Food-Shopping"
  },
  {
    id: 4,
    title: "Weather Forcast",
    description:
      "Real-time weather forecasting application with detailed meteorological data and interactive maps.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuifresh.net%2Fwp-content%2Fuploads%2F2021%2F11%2FUIFresh-weather-app-ui-banner-1.jpg&f=1&nofb=1&ipt=2cd4de30ba1661221e31b471d0907be77749c9183b9cc425a6188b7e3e8cb1a0&ipo=images",
    github: "https://github.com/shresthjindal28/Weather-Forcase"
  },
  {
    id: 5,
    title: "Chat Bot",
    description:
      "AI-powered chatbot with natural language processing capabilities for automated customer support.",
    image: "https://botup.com/images/ai-chatbot-screenshot-1.png?v=1681707593517652013",
    github: "https://github.com/shresthjindal28/chat-bot"
  },
  {
    id: 6,
    title: "Drive Cone",
    description:
      "Cloud storage application with file sharing capabilities, folder organization, and seamless synchronization across devices.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nashdigital.co.za%2Fwp-content%2Fuploads%2F2020%2F02%2FGoogle-Drive-1308x654.jpg&f=1&nofb=1&ipt=b2b7a129d803c5d1e0d6fe6bf8113f931b417d91e2c335bae1369a7a622e1e2c&ipo=images",
    github: "https://github.com/shresthjindal28/Drive"
  }
];

const ProjectDisplay = () => {
  const projectRefs = useRef([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const projectElements = projectRefs.current;
      
      projectElements.forEach((project, index) => {
        if (!project) return;
        const rect = project.getBoundingClientRect();
        const projectMiddle = rect.top + rect.height / 2;
        const screenMiddle = windowHeight / 2;
        
        if (Math.abs(projectMiddle - screenMiddle) < rect.height / 2) {
          setActiveProject(index);
        }
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    try {
      gsap.from(projectRefs.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => setLoading(false),
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (error) {
    return (
      <div className="bg-transparent text-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-red-500 text-center">
          <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-xl">Unable to load projects at this time.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-transparent backdrop-blur-sm text-white relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h2 className="text-3xl font-bold mb-8 md:mb-16 text-center">My Projects</h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Line */}
          {!isMobile && (
            <div className="absolute left-4 top-[30vh] bottom-[30vh] w-[3px] flex items-center">
              <div className="h-full w-full bg-gray-800/30 relative">
                <div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-400 to-orange-500 transition-all duration-700 ease-in-out"
                  style={{ 
                    height: `${((activeProject + 1) / projects.length) * 100}%`,
                    boxShadow: '0 0 15px rgba(250, 204, 21, 0.4)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Projects */}
          <div className={`${isMobile ? 'grid gap-8 grid-cols-1' : 'space-y-32'}`}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className="relative"
              >
                {/* Navigation Dot */}
                {!isMobile && (
                  <div 
                    className={`absolute left-4 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10
                      w-5 h-5 rounded-full cursor-pointer transition-all duration-500 ease-in-out
                      flex items-center justify-center
                      ${index === activeProject ? 'scale-150 bg-yellow-400' : 'bg-gray-800 hover:bg-gray-700'}
                      ${index <= activeProject ? 'bg-yellow-400' : ''}`}
                    onClick={() => {
                      const element = projectRefs.current[index];
                      element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center'
                      });
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full
                      ${index === activeProject ? 'bg-black' : 'bg-gray-400'}
                      ${index <= activeProject ? 'bg-black' : ''}`}
                    />
                  </div>
                )}

                {/* Project Content */}
                <div className={`group overflow-hidden rounded-2xl 
                  ${isMobile ? 'h-[60vh]' : 'flex flex-col md:flex-row gap-8 items-center min-h-[60vh] pl-12'} 
                  ${index === activeProject ? 'scale-105 shadow-2xl shadow-yellow-400/20' : 'scale-95 opacity-60'} 
                  transition-all duration-700 ease-in-out hover:opacity-100
                  bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm`}
              >
                <div className={`relative overflow-hidden
                  ${isMobile ? 'w-full h-full' : 'w-1/2 h-[60vh]'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover rounded-lg transform
                      transition-transform duration-700 ease-in-out
                      group-hover:scale-110 ${isMobile ? '' : 'rounded-l-2xl'}
                      filter brightness-90 group-hover:brightness-100`}
                    style={{
                      objectPosition: 'center',
                      imageRendering: 'high-quality'
                    }}
                    loading="lazy"
                  />
                </div>

                <div className={`${
                  isMobile
                    ? 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 flex flex-col justify-end'
                    : 'w-1/2 p-8 flex flex-col justify-center'
                }`}>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 
                    transform transition-all duration-300 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-base md:text-lg 
                    transform transition-all duration-300 group-hover:translate-x-2">
                    {project.description}
                  </p>
                  <div className="flex gap-4 transform transition-all duration-300 group-hover:translate-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300
                        font-medium transition-colors duration-300 text-lg hover:gap-2"
                    >
                      View Project
                      <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProjectDisplay;