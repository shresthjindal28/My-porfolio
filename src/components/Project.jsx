import  { useEffect, useRef, useState, memo } from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Employee Management System",
    description:
      "A comprehensive system for managing employee data, attendance, and performance tracking with a user-friendly interface.",
    image: "/images/employee-management.webp", // Local fallback image (use WebP for optimization)
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    github: "https://github.com/shresthjindal28/Employee-Management-System",
    tags: ["React", "Node.js", "MongoDB"],
    color: "from-blue-500 to-indigo-700"
  },
  {
    id: 2,
    title: "Uber Clone",
    description:
      "A ride-sharing application clone featuring real-time tracking, payment integration, and driver-passenger matching.",
    image: "/images/uber-clone.webp", // Local fallback image (use WebP for optimization)
    imageUrl: "https://images.unsplash.com/photo-1657947953120-6e5201f3b3ed?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/shresthjindal28/Uber",
    tags: ["React Native", "Firebase", "Maps API"],
    color: "from-green-500 to-teal-700"
  },
  {
    id: 3,
    title: "Restaurant Near Me",
    description:
      "Location-based restaurant finder with filters, reviews, and real-time availability updates.",
    image: "/images/restaurant.webp", // Local fallback image (use WebP for optimization)
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    github: "https://github.com/A-netrunner/Food-Shopping",
    tags: ["JavaScript", "Google Maps API", "Yelp API"],
    color: "from-red-500 to-rose-700"
  },
  {
    id: 4,
    title: "Weather Forecast",
    description:
      "Real-time weather forecasting application with detailed meteorological data and interactive maps.",
    image: "/images/weather.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    github: "https://github.com/shresthjindal28/Weather-Forcase",
    tags: ["React", "Weather API", "Chart.js"],
    color: "from-cyan-500 to-blue-700"
  },
  {
    id: 5,
    title: "Chat Bot",
    description:
      "AI-powered chatbot with natural language processing capabilities for automated customer support.",
    image: "/images/chatbot.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    github: "https://github.com/shresthjindal28/chat-bot",
    tags: ["NLP", "Machine Learning", "Node.js"],
    color: "from-purple-500 to-violet-700"
  },
  {
    id: 6,
    title: "Drive Clone",
    description:
      "Cloud storage application with file sharing capabilities, folder organization, and seamless synchronization across devices.",
    image: "/images/drive.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1649180549324-3e03951391aa?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/shresthjindal28/Drive",
    tags: ["React", "Firebase", "Cloud Storage"],
    color: "from-amber-500 to-orange-700"
  },
  {
    id: 7,
    title: "Blogging Website",
    description:
      "A platform for creating, reading, and managing blog posts with user authentication and rich text editing features.",
    image: "/images/blogging-website.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    github: "https://github.com/shresthjindal28/blog-website.git",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    color: "from-pink-500 to-purple-700"
  },
  {
    id: 8,
    title: "AI Agent",
    description:
      "An autonomous AI agent capable of performing tasks, learning, and adapting based on interactions and goals.",
    image: "/images/ai-agent.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    github: "https://github.com/shresthjindal28/AI-AGENT.git",
    tags: [ "AI",  "OpenAI API", "API Integration"],
    color: "from-teal-500 to-cyan-700"
  },
  {
    id: 9,
    title: "Text to Image Generator",
    description:
      "An application that generates images from textual descriptions using advanced AI models.",
    image: "/images/text-to-image.jpg", // Local fallback image
    imageUrl: "https://plus.unsplash.com/premium_photo-1725985758416-618e34ef5616?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/shresthjindal28/Text-to-image-generator.git",
    tags: ["Python", "AI", "Image Generation", "API"],
    color: "from-indigo-500 to-blue-700"
  },
  {
    id: 10,
    title: "Chating Web",
    description:
      "A real-time chat application with modern UI/UX, featuring instant messaging, user authentication, and seamless communication.",
    image: "/images/chat-app.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    github: "https://github.com/shresthjindal28/Chat-app.git",
    liveUrl: "https://chat-app-0809.netlify.app/",
    tags: ["React", "Firebase", "Real-time", "Chat"],
    color: "from-emerald-500 to-green-700"
  },
  {
    id: 11,
    title: "Gradient Library",
    description:
      "A comprehensive collection of beautiful gradients with easy-to-use interface for developers and designers to copy and implement.",
    image: "/images/gradient-library.jpg", // Local fallback image
    imageUrl: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/shresthjindal28/gradient-library.git",
    liveUrl: "https://gradora-illn1r6xk-shresthjindal28s-projects.vercel.app/",
    tags: ["React", "CSS", "Design", "UI Library"],
    color: "from-violet-500 to-purple-700"
  }
];


// Memoized Project Card to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({ project, openProjectDetails, imageLoading, projectsRef }) {
  return (
    <div
      key={project.id}
      ref={(el) => {
        const originalIndex = projects.findIndex(p => p.id === project.id);
        if (el) projectsRef.current[originalIndex] = el;
      }}
      className="group perspective-1000"
      onClick={() => openProjectDetails(project)}
      role="button"
      aria-label={`Open ${project.title} project details`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectDetails(project);
        }
      }}
    >
      <div 
        className="h-[350px] bg-gray-800 rounded-xl overflow-hidden relative cursor-pointer 
        transform transition-all duration-500 hover:scale-[1.02] 
        hover:shadow-2xl hover:shadow-yellow-500/20 group-hover:rotate-y-3"
      >
        {/* Project Image with Dynamic Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>
          {/* Image loading skeleton */}
          {imageLoading[project.id] && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse">
              <div className="h-full w-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          )}
          {/* Image with fallback */}
        <img
          src={project.imageUrl || project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
          loading="lazy"
          onError={e => {
            e.target.onerror = null;
            e.target.src = project.image;
          }}
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-60 transition-all duration-500"></div>
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
        </div>
        {/* Project Content with Enhanced Animation */}
        <div className="absolute inset-0 p-7 flex flex-col justify-end z-10 transform transition-all duration-500">
          <div className="overflow-hidden">
            <h3 className="text-2xl font-bold mb-3 text-white transform transition-all duration-500 
            translate-y-4 group-hover:translate-y-0">
              {project.title}
            </h3>
          </div>
          <div className="overflow-hidden">
            <p className="text-gray-300 mb-5 text-sm opacity-80 transform transition-all duration-500 
            translate-y-12 group-hover:translate-y-0 delay-75 line-clamp-2 group-hover:line-clamp-3">
              {project.description}
            </p>
          </div>
          {/* Enhanced Tags with Staggered Animation */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-xs
                text-white border border-white/10 transform translate-y-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                style={{ 
                  transitionDelay: `${150 + (i * 50)}ms`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Animated Action Button */}
          <button 
            className="mt-5 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500
            rounded-lg text-black font-medium opacity-0 group-hover:opacity-100 
            transform translate-y-8 group-hover:translate-y-0 
            transition-all duration-500 delay-150
            flex items-center gap-2 w-fit shadow-lg shadow-orange-900/10"
            tabIndex="-1"
          >
            View Details
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {/* Top Corner Badge */}
        <div className="absolute top-0 right-0 p-2 m-3 bg-black/50 backdrop-blur-md rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
          #{projects.findIndex(p => p.id === project.id) + 1}
        </div>
      </div>
    </div>
  );
});

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
  imageLoading: PropTypes.object.isRequired,
  projectsRef: PropTypes.object.isRequired
};

const ProjectDisplay = () => {
  // Only modal state is here, grid is not re-rendered on modal open/close
  const [error] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const titleRef = useRef(null);


  useEffect(() => {
    const initialLoadingState = {};
    projects.forEach(project => {
      initialLoadingState[project.id] = true;
    });
    setImageLoading(initialLoadingState);
  }, []);

  useEffect(() => {
    projectsRef.current = projectsRef.current.slice(0, projects.length);
  }, []);

  const openProjectDetails = (project) => {
    setCurrentProject(project);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

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

  return (
    <div className="text-white min-h-screen relative" ref={sectionRef}>
      {/* Hero Section */}
      <div className="w-full bg-transparent py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center" ref={titleRef}>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">My Projects</h1>
            <p className="text-lg md:text-xl text-gray-300 px-4">Explore my portfolio of projects showcasing my skills and expertise</p>
          </div>
        </div>
      </div>


      {/* Project Grid */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Enhanced Projects Grid (no filter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              openProjectDetails={openProjectDetails}
              imageLoading={imageLoading}
              projectsRef={projectsRef}
            />
          ))}
        </div>
        {/* No empty state needed since all projects are always shown */}
      </div>

      {/* Project Detail Modal - Enhanced */}
      {showModal && currentProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto" 
          onClick={closeProjectDetails}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[300px] md:h-[400px]">
              <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-20`}></div>
              
              {/* Image loading state */}
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              
              <img 
                src={currentProject.imageUrl || currentProject.image} 
                alt={currentProject.title} 
                className="w-full h-full object-cover"
                onLoad={(e) => e.target.previousElementSibling?.classList.add('hidden')}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = currentProject.image; // Fallback to local image
                  e.target.previousElementSibling?.classList.add('hidden');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              
              <button 
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-all"
                onClick={closeProjectDetails}
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 id="modal-title" className="text-2xl md:text-4xl font-bold text-white">{currentProject.title}</h2>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-8">
                {currentProject.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-yellow-400/10 rounded-full text-xs text-yellow-400 border border-yellow-500/30">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-10 leading-relaxed">{currentProject.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={currentProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-black font-medium hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Give Star in GitHub
                </a>
                
                {currentProject.liveUrl && (
                  <a 
                    href={currentProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                    View Live Demo
                  </a>
                )}
                
                <button 
                  onClick={closeProjectDetails}
                  className="px-6 py-3.5 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDisplay;