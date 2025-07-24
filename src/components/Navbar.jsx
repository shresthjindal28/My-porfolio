import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['home', 'skills', 'work', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Enhanced navbar opacity and blur based on scroll position
  const navbarOpacity = Math.min(scrollPosition / 200, 0.95);
  
  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'work' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: `rgba(8, 14, 27, ${navbarOpacity})`,
        backdropFilter: `blur(${Math.min(scrollPosition / 50, 12)}px)`,
        boxShadow: scrollPosition > 30 ? '0 4px 30px rgba(0, 0, 0, 0.15)' : 'none',
        borderBottom: scrollPosition > 30 ? '1px solid rgba(255, 205, 0, 0.1)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold">
            <span className="font-display bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>
          
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-primary to-secondary transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{top: '0'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-primary to-secondary transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                style={{top: '10px'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-primary to-secondary transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{top: '20px'}}
              />
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className={`relative py-2 px-3 text-sm lg:text-base font-medium cursor-pointer transition-all duration-300
                           ${activeSection === link.to ? 'text-primary' : 'text-gray-300 hover:text-gray-100'}`}
                activeClass="active"
              >
                {link.name}
                {activeSection === link.to && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
            
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-80}
              className="bg-gradient-to-r from-primary to-secondary text-dark-800 px-4 lg:px-6 py-2 rounded-full 
                        text-sm lg:text-base font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <motion.div 
                className="glass-card p-4 rounded-xl flex flex-col space-y-3"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className={`py-3 px-4 rounded-lg text-center transition-colors
                             ${activeSection === link.to ? 'bg-dark-600 text-primary' : 'text-gray-300'}`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="bg-gradient-to-r from-primary to-secondary text-dark-800 py-3 px-4 rounded-lg font-medium text-center"
                  onClick={closeMenu}
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
