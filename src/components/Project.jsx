import React from 'react'
import { FaCode } from "react-icons/fa6";
import game from '../assets/Tic-Tac-Toe.png'
import agency from '../assets/Agency.png'
import portfolio from '../assets/Portfolio.png'
import wizardz from '../assets/wizardz.png'

const Project = () => {
    const myProjects = [
        {id:1, src:game , title:"CODE",link:"https://github.com/shresthjindal28/Tic-Tak-Toe-Game.git"},
        {id:2, src:agency , title:"CODE", link:"https://github.com/shresthjindal28/Website-Production-Company.git"},
        {id:3, src:portfolio , title:"CODE", link:"https://github.com/shresthjindal28/My-porfolio.git"},
        {id:4, src:wizardz , title:"CODE", link:"https://github.com/shresthjindal28/Animated-Website-UI-Design.git"},
    ]
  return (
    <div id='4' name='Project' className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-screen h-full text-white'>
        <div className=''>
            <h1 className='text-4xl font-bold border-b border-gray-500 p-2 inline' id="">Projects</h1>
        </div>
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-8 mt-10 px-12 sm:px-0">
            {myProjects.map(({id,src,title,link}) => (
                <div key={id} className=" md:h-[40vh]">
                <img className='hover:scale-105 duration-300' src={src} alt="" />
                <div className="mt-4">
                    <button><a href={link} className='flex items-center gap-2 text-lg'> <FaCode /> {title}</a></button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Project
