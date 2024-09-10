import React from 'react'
import  html from "../assets/html.png"
import  css from "../assets/css.png"
import  javascript from "../assets/javascript.png"
import  reactimg from "../assets/react.png"
import  next from "../assets/nextjs.png"
import  git from "../assets/github.png"
import  tailwind from "../assets/tailwind.png"


const Skills = () => {
  const myskill =[
    {id:1, src:html, title:"HTML", style:"hover:shadow-orange-500"},
    {id:2, src:css, title:"CSS", style:"hover:shadow-blue-400"},
    {id:3, src:javascript, title:"JavaScript", style:"hover:shadow-yellow-500"},
    {id:4, src:reactimg, title:"React", style:"hover:shadow-blue-600"},
    {id:5, src:next, title:"Next Js", style:"hover:shadow-white"},
    {id:6, src:git, title:"GitHub", style:"hover:shadow-gray-400"},
    {id:7, src:tailwind, title:"Tailwind", style:"hover:shadow-sky-400"}
  ]
  return (
    <div name='skill' className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
      <div className=''>
      <h1 className='text-4xl font-bold border-b border-gray-500 p-2 inline' id="">Skills</h1>
      </div>
      <div className=" w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">

        {
          myskill.map(({id, src, title, style}) => (
            <div key={id} className={`shadow-md hover:scale-105 duration-300 py-2 rounded-lg ${style}`}>
              <img className='w-20 mx-auto' src={src} alt="" />
              <p className='mt-4'>{title}</p>
            </div>
          ))}

      </div>
    </div>
  )
}

export default Skills
