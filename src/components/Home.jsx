import React from 'react'
import Boy from '../assets/portfolio/boy.jpg'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const Home = () => {
  return (
    <div name="home" className='w-full h-screen  '>
        <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 text-white md:flex-row">
            <div className="flex flex-col justify-center h-full tracking-widest">
                <h2 className='text-3xl sm:text-6xl font-bold'>I'm a Full Stack Developer</h2>
                <p className='text-gray-400 py-4 max-w-md'>I have 8 years of experience building and desgining software.
                    Currently, I love to work on web applicatins using technologies like React, Tailwind, Next JS and GraphQL.
                </p>
                <div className="">
                    <button className='group flex w-fit px-6 py-3 my-2 items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'>
                        Portfolio
                        <span className='group-hover:rotate-90 duration-300'>
                            <MdOutlineKeyboardArrowRight size={25} className='ml-1'/>
                        </span>
                    </button>
                </div>
            </div>
            <div className="">
                <img className='rounded-full mx-auto -mt-8 md:mt-0 w-2/3 md:w-[30vw]' src={Boy} alt="My profile" />
            </div>
        </div>
    </div>
  )
}

export default Home
