import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Determine navbar opacity based on scroll position
  const navbarOpacity = Math.min(scrollPosition / 300, 0.8);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300`}
      style={{
        backgroundColor: `rgba(10, 10, 25, ${navbarOpacity})`,
        backdropFilter: `blur(${Math.min(scrollPosition / 100, 8)}px)`,
        boxShadow: scrollPosition > 50 ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Portfolio
          </div>
          
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none mr-6 mb-4"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}
                style={{top: '0.5rem'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                style={{top: '1.25rem'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                style={{top: '2rem'}}
              />
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-white font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-white font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-white font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Work Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-white font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium rounded-full py-2 px-6 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-500 ease-in-out mt-2`}
          style={{
            backgroundColor: `rgba(15, 15, 35, 0.95)`,
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            width: '100%'
          }}
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Work Experience
            </Link>
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium rounded-full py-2 px-6 text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
