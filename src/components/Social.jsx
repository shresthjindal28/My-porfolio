import React from 'react'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {BsFillPersonLinesFill} from 'react-icons/bs'

const Social = () => {

  const links = [
    {
      id: 1,
      child: (
        <>
          LinkedIn <FaLinkedin size={30}/>
        </>
      ),
      href: 'https://in.linkedin.com/in/shresth-jindal-b074ba28b',
      style: 'rounded-tr-md'
    },
    {
      id: 2,
      child: (
        <>
          github <FaGithub size={30}/>
        </>
      ),
      href: 'https://github.com/shresthjindal28',
    },
    {
      id: 3,
      child: (
        <>
          Mail <HiOutlineMail size={30}/>
        </>
      ),
      href: 'mailto:shresthjindal28@gmail.com',
    },
    {
      id: 4,
      child: (
        <>
          Resume <BsFillPersonLinesFill size={30}/>
        </>
      ),
      href: '/resume.pdf',
      style: 'rounded-br-md',
      download: true,
    }
  ]
   
  return (
    <div className='hidden lg:flex flex-col top-[35%] left-0 fixed '>
      <ul>
        {links.map(({id, child, href, style, download}) => (
           <li key={id} className={'flex justify-between items-center h-14 w-40 px-4 bg-gray-600 ml-[-100px] hover:rounded-md duration-150 hover:ml-[-10px] ' + " " + style}>
              <a className='flex justify-between items-center w-full text-white  ' href={href} download={download} target='_blank' rel='noreferrer'>
                  {child}
              </a>
            </li>
        ))}
       
      </ul>
    </div>
  )
}

export default Social
