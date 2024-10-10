import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Social from './components/Social'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <div className='bg-gradient-to-b from-black via-gray-950 to-gray-800 text-white tracking-widest h-full'>
      <Navbar/>
      <Home/>
      <Social/>
      <About/>
      <Skills/>
      <Contact/>
      <Analytics />
    </div>
  )
}

export default App
