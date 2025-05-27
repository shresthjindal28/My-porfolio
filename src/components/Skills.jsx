import React, { useState, useRef  } from 'react';
import { motion } from 'framer-motion';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Skills component error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-10 text-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-dark-300">Please refresh the page to try again</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// DevIcon URL helper
const deviconUrl = (name, type = 'original') => 
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

// Skill categories and their colors
const categories = [
  { id: 'all', name: 'All', color: '#ffcd00' },
  { id: 'frontend', name: 'Frontend', color: '#38bdf8' },
  { id: 'backend', name: 'Backend', color: '#a78bfa' },
  { id: 'language', name: 'Languages', color: '#fb923c' },
  { id: 'database', name: 'Database', color: '#4ade80' },
  { id: 'devops', name: 'DevOps', color: '#f472b6' },
  { id: 'tools', name: 'Tools', color: '#818cf8' },
  { id: 'design', name: 'Design', color: '#fb7185' },
];

// Skills data
const allSkills = [
  { 
    name: 'React', 
    category: 'frontend',
    icon: deviconUrl('react'), 
    proficiency: 90,
    description: 'JavaScript library for building user interfaces with reusable UI components.',
    years: 2,
    projects: 15,
    related: ['Next.js', 'Redux', 'React Router']
  },
  { 
    name: 'JavaScript', 
    category: 'language',
    icon: deviconUrl('javascript'), 
    proficiency: 92,
    description: 'High-level programming language that follows the ECMAScript standard.',
    years: 2,
    projects: 20,
    related: ['TypeScript', 'Node.js', 'ES6+'] 
  },
  { 
    name: 'HTML5', 
    category: 'frontend',
    icon: deviconUrl('html5'), 
    proficiency: 95,
    description: 'Latest version of the Hypertext Markup Language for structuring web content.',
    years: 2,
    projects: 25,
    related: ['CSS3', 'Semantic HTML', 'Web Accessibility'] 
  },
  { 
    name: 'CSS3', 
    category: 'frontend',
    icon: deviconUrl('css3'), 
    proficiency: 88,
    description: 'Style sheet language used for describing the presentation of a document.',
    years: 2,
    projects: 25,
    related: ['SASS', 'Tailwind CSS', 'Responsive Design'] 
  },
  { 
    name: 'TypeScript', 
    category: 'language',
    icon: deviconUrl('typescript'), 
    proficiency: 82,
    description: 'Strongly typed programming language that builds on JavaScript.',
    years: 2,
    projects: 8,
    related: ['JavaScript', 'Angular', 'Type Systems'] 
  },
  { 
    name: 'Node.js', 
    category: 'backend',
    icon: deviconUrl('nodejs', 'original'), 
    proficiency: 85,
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    years: 2,
    projects: 12,
    related: ['Express', 'REST APIs', 'NPM'] 
  },
  { 
    name: 'MongoDB', 
    category: 'database',
    icon: deviconUrl('mongodb', 'original'), 
    proficiency: 80,
    description: 'NoSQL database program using JSON-like documents with schema.',
    years: 2,
    projects: 10,
    related: ['Mongoose', 'Atlas', 'NoSQL'] 
  },
  { 
    name: 'Express', 
    category: 'backend',
    icon: deviconUrl('express', 'original'), 
    proficiency: 84,
    description: 'Web application framework for Node.js designed for building web applications and APIs.',
    years: 2,
    projects: 12,
    related: ['Node.js', 'REST APIs', 'Middleware'] 
  },
  { 
    name: 'Tailwind CSS', 
    category: 'frontend',
    icon: deviconUrl('tailwindcss', 'plain'), 
    proficiency: 88,
    description: 'Utility-first CSS framework for rapidly building custom user interfaces.',
    years: 2,
    projects: 8,
    related: ['CSS', 'Responsive Design', 'UI Development'] 
  },
  { 
    name: 'Git', 
    category: 'devops',
    icon: deviconUrl('git', 'original'), 
    proficiency: 86,
    description: 'Distributed version control system for tracking changes in source code.',
    years: 2,
    projects: 20,
    related: ['GitHub', 'GitFlow', 'Version Control'] 
  },
  { 
    name: 'Next.js', 
    category: 'frontend',
    icon: deviconUrl('nextjs', 'original'), 
    proficiency: 78,
    description: 'React framework that enables server-side rendering and static site generation.',
    years: 2,
    projects: 5,
    related: ['React', 'Server-Side Rendering', 'Static Site Generation'] 
  },
  { 
    name: 'Redux', 
    category: 'frontend',
    icon: deviconUrl('redux', 'original'), 
    proficiency: 76,
    description: 'State management library for JavaScript applications.',
    years: 2,
    projects: 6,
    related: ['React', 'State Management', 'React Context'] 
  },
  { 
    name: 'SASS', 
    category: 'frontend',
    icon: deviconUrl('sass', 'original'), 
    proficiency: 82,
    description: 'CSS preprocessor scripting language that is interpreted or compiled into CSS.',
    years: 2,
    projects: 10,
    related: ['CSS', 'Preprocessors', 'BEM'] 
  },
  { 
    name: 'Firebase', 
    category: 'backend',
    icon: deviconUrl('firebase', 'plain'), 
    proficiency: 79,
    description: 'Platform for creating mobile and web applications with tools and infrastructure.',
    years: 2,
    projects: 7,
    related: ['Authentication', 'Cloud Firestore', 'Real-time Database'] 
  },
  { 
    name: 'Figma', 
    category: 'design',
    icon: deviconUrl('figma', 'original'), 
    proficiency: 75,
    description: 'Cloud-based design tool for collaborative interface design.',
    years: 2,
    projects: 8,
    related: ['UI Design', 'Prototyping', 'Design Systems'] 
  },
  { 
    name: 'Docker', 
    category: 'devops',
    icon: deviconUrl('docker', 'original'), 
    proficiency: 70,
    description: 'Platform for developing, shipping, and running applications in containers.',
    years: 2,
    projects: 3,
    related: ['Containerization', 'CI/CD', 'Kubernetes'] 
  },
  { 
    name: 'Three.js', 
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg', 
    proficiency: 75,
    description: 'JavaScript 3D library that makes WebGL simple, creating stunning 3D graphics in the browser.',
    years: 2,
    projects: 4,
    related: ['WebGL', '3D Modeling', 'JavaScript Animation'] 
  },
  { 
    name: 'GSAP', 
    category: 'frontend',
    icon: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg', 
    proficiency: 80,
    description: 'Professional-grade animation library for the modern web with smooth performance.',
    years: 2,
    projects: 7,
    related: ['Web Animation', 'SVG Animation', 'Motion Design'] 
  },
  { 
    name: 'Blender', 
    category: 'design',
    icon: deviconUrl('blender', 'original'), 
    proficiency: 65,
    description: 'Free and open-source 3D creation suite supporting the entire 3D pipeline.',
    years: 2,
    projects: 3,
    related: ['3D Modeling', '3D Animation', 'Rendering'] 
  },
  { 
    name: 'WebGL', 
    category: 'frontend',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/25/WebGL_Logo.svg', 
    proficiency: 70,
    description: 'JavaScript API for rendering interactive 2D and 3D graphics within any web browser.',
    years: 2,
    projects: 4,
    related: ['Three.js', 'Shaders', 'Canvas API'] 
  },
  { 
    name: 'Framer Motion', 
    category: 'frontend',
    icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg', 
    proficiency: 85,
    description: 'Production-ready motion library for React that makes creating animations easy.',
    years: 2,
    projects: 6,
    related: ['React', 'Animation', 'UI Motion'] 
  },
  { 
    name: 'SQL', 
    category: 'database',
    icon: deviconUrl('mysql', 'original'), 
    proficiency: 78,
    description: 'Standard language for storing, manipulating and retrieving data in relational databases.',
    years: 2,
    projects: 8,
    related: ['MySQL', 'PostgreSQL', 'Database Design'] 
  },
  { 
    name: 'Axios', 
    category: 'frontend',
    icon: 'https://axios-http.com/assets/logo.svg', 
    proficiency: 88,
    description: 'Promise-based HTTP client for the browser and Node.js with an easy-to-use API.',
    years: 2,
    projects: 15,
    related: ['API Integration', 'Data Fetching', 'REST Clients'] 
  }
];

// Helper function to validate icon URLs
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

// Helper function to convert hex to RGB with error handling
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') {
    return '255, 255, 255'; // Default to white if invalid
  }
  
  // Remove the '#' character if present
  hex = hex.replace('#', '');
  
  // Check for valid hex format
  if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
    return '255, 255, 255'; // Default to white if invalid format
  }
  
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Parse the hex values
  try {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  } catch (error) {
    console.error('Error parsing hex color:', error);
    return '255, 255, 255'; // Default to white on error
  }
}

// Skill Card Component
const SkillCard = ({ skill, onClick }) => {
  const categoryColor = categories.find(c => c.id === skill.category)?.color || '#ffffff';
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(${hexToRgb(categoryColor)}, 0.3)` }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(skill)}
      className="glass-card p-5 cursor-pointer relative overflow-hidden group"
    >
      {/* Background color accent */}
      <div 
        className="absolute top-0 left-0 h-1 w-full transform origin-left transition-all duration-300 group-hover:h-full group-hover:opacity-10"
        style={{ backgroundColor: categoryColor }}
      ></div>
      
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${categoryColor}20` }}>
          <img 
            src={getValidIconUrl(skill.icon)} 
            alt={skill.name} 
            className="w-10 h-10 object-contain" 
            onError={(e) => {
              e.target.src = 'https://img.icons8.com/ios/50/code--v1.png';
            }}
          />
        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-100">{skill.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full" style={{ 
            backgroundColor: `${categoryColor}20`,
            color: categoryColor 
          }}>
            {categories.find(c => c.id === skill.category)?.name}
          </span>
        </div>
      </div>
      
      <p className="mt-4 text-dark-200 line-clamp-2 text-sm">{skill.description}</p>
      
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </motion.div>
  );
};

// Detail Modal Component
const SkillDetailModal = ({ skill, onClose }) => {
  if (!skill) return null;
  
  const category = categories.find(c => c.id === skill.category);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass-card max-w-md w-full p-6 relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 p-1 rounded-full bg-dark-600 hover:bg-dark-500 transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-center">
          <div 
            className="p-3 rounded-lg mr-4" 
            style={{ backgroundColor: `${category?.color}30` }}
          >
            <img 
              src={getValidIconUrl(skill.icon)} 
              alt={skill.name} 
              className="w-12 h-12 object-contain" 
              onError={(e) => {
                e.target.src = 'https://img.icons8.com/ios/50/code--v1.png';
              }}
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-100">{skill.name}</h2>
            <span 
              className="text-xs px-2 py-1 rounded-full" 
              style={{ 
                backgroundColor: `${category?.color}30`,
                color: category?.color 
              }}
            >
              {category?.name}
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-dark-100 leading-relaxed">{skill.description}</p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-dark-700 p-3 rounded-lg">
              <span className="text-sm text-dark-300">Experience</span>
              <p className="text-lg font-medium">{skill.years} years</p>
            </div>
            <div className="bg-dark-700 p-3 rounded-lg">
              <span className="text-sm text-dark-300">Projects</span>
              <p className="text-lg font-medium">{skill.projects}+</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm text-dark-200 mb-2">Related Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skill.related.map((item, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 rounded-full bg-dark-600 text-dark-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Skills Component
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const containerRef = useRef(null);
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);
  
  return (
    <ErrorBoundary>
      <div ref={containerRef} className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">My Skills</h2>
          <p className="mt-4 text-dark-300 max-w-2xl mx-auto">
            I've worked with a wide range of technologies in the web development world. 
            Here's an overview of my technical skills and expertise.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex gap-2 p-1 bg-dark-700/60 backdrop-blur-md rounded-full">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap
                          ${activeCategory === category.id 
                            ? 'bg-white text-dark-800 shadow-lg' 
                            : 'text-gray-300 hover:text-white'}`}
                style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <SkillCard 
                skill={skill} 
                onClick={(skill) => setSelectedSkill(skill)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-300 mb-4">No skills found in this category</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 bg-primary text-dark-800 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Show All Skills
            </button>
          </div>
        )}
        
        {/* Skill Detail Modal */}
        {selectedSkill && (
          <SkillDetailModal 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Skills;









