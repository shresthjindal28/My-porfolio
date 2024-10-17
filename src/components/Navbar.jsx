import React, { useState,useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-scroll'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const links = [
        {
            id: 1,

            link: 'Home'
        },
        {
            id: 2,

            link: 'about'
        },
        {
            id: 3,
  
            link: 'skill'
        },
        {
          id: 4,

          link: 'Project'
      },
        {
            id: 5,

            link: 'Contact'
        },
    ];

    const handleNavClick = () => {
      setNav(!nav); // Toggles the navbar state
    };


  return (
    <div name="Home" className='flex justify-between items-center w-full h-20 px-4 text-white bg-black'>
      <div className="">
        <h1 className='font-signature text-4xl ml-2'>
            Shresth
        </h1>
      </div>

      <ul className="hidden md:flex ">
        {links.map(({ id,elementId ,link }) => (
            <li key={id} className="px-4 capitalize font-medium text-lg tracking-wide text-gray-400 hover:text-white hover:scale-105 duration-100 cursor-pointer" id={elementId}              
            onClick={() => {
              skillEl?.scrollIntoView({
                behavior: "smooth",
              });
            }}><Link to={id} smooth duration={300}>{link}</Link>
            </li>
        ))}
      </ul>

      <div onClick={() => setNav(!nav)} className="flex z-10 md:hidden pr-3">
        {nav ? <FaTimes className="cursor-pointer" size={30}/> : <FaBars  className="cursor-pointer" size={30} />}
      </div>

      {nav && (
        <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-500 text-gray-500'>
          {links.map(({ id ,link,elementId }) => (
            <li key={id} className='px-4 cursor-pointer capitalize py-6 text-4xl hover:text-white hover:scale-150' id={elementId}              
            onClick={() => {
              skillEl?.scrollIntoView({
                behavior: "smooth",
              });
            }}><Link to={id} smooth duration={300} onClick={handleNavClick} >{link}</Link></li>
          ))}
        </ul>  
      )}

       
    </div>
  )
}

export default Navbar
