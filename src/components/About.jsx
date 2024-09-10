import React from 'react'
import Spline from '@splinetool/react-spline';

const About = () => {
  return (
    <div name="About" id='about-link' className='h-[80vh] lg:h-[100vh] max-w-screen-lg ml-4 md:mx-auto  flex items-center justify-center  md:justify-between'>
        <div className='absolute tracking-widest flex flex-col md:flex-wrap  md:flex-1 md:relative text-white'>
          <h1 className='text-3xl sm:text-6xl font-bold mb-4'>Hello I'm <br /> Shresth Jindal </h1>
          <p className=''>I'm a web developer proficient in the MERN stack and passionate about creating immersive 3D animation using Three.js, Spline, Venta.js. I specialized in building responsive, visually appealing web applications with Tailwind CSS. Let's create something amazing together!</p>
        </div>
         <div className="h-full px-4 opacity-40 md:opacity-100 md:flex-1  ">
          <Spline className='relative'
            scene="https://prod.spline.design/uQU40Ro0vG0lyJd3/scene.splinecode" 
          />
        </div>
    </div>
  )
}

export default About

