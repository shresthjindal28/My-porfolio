import React, { useState } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full bg-gray-800 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Portfolio</div>
          
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
            >
              Skills
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
            >
              Contact
            </Link>
            <Link
              to="Projects"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pt-4`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="Projects"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
