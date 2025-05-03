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

  // Enhanced navbar opacity and blur based on scroll position
  const navbarOpacity = Math.min(scrollPosition / 200, 0.9);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300`}
      style={{
        backgroundColor: `rgba(5, 5, 15, ${navbarOpacity})`,
        backdropFilter: `blur(${Math.min(scrollPosition / 50, 16)}px)`,
        boxShadow: scrollPosition > 30 ? '0 4px 30px rgba(0, 0, 0, 0.2)' : 'none',
        borderBottom: scrollPosition > 30 ? '1px solid rgba(137, 66, 255, 0.1)' : 'none'
      }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-600">
            Portfolio
          </div>
          
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-500 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}
                style={{top: '0.5rem'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-500 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                style={{top: '1.25rem'}}
              />
              <span 
                className={`absolute h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-500 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                style={{top: '2rem'}}
              />
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-gray-200 font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-gray-200 font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-gray-200 font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Work Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              className="relative text-gray-200 font-medium py-2 px-1 cursor-pointer transition-all duration-300 hover:text-purple-300 group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium rounded-full py-2 px-6 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-500 ease-in-out mt-2`}
          style={{
            backgroundColor: `rgba(10, 10, 20, 0.98)`,
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: '1px solid rgba(137, 66, 255, 0.1)',
            width: '100%'
          }}
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Work Experience
            </Link>
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 py-2 border-b border-gray-700 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="text-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 font-medium rounded-full py-2 px-6 text-center"
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
