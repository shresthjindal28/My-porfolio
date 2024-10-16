import React from 'react'

const Contact = () => {
  return (
    <div id='5' name='contact' className='w-full h-screen text-white'>
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
            <h1 className='text-4xl font-bold inline border-b-4 border-gray-500 '>Contact</h1>
            <p className='py-6 text-2xl'>Submit the form below to get in touch with me</p>
        </div>
        <div className="flex items-center justify-center">
            <form action="https://getform.io/f/alljnxva" method='POST' className='flex flex-col w-full md:w-1/2 gap-5'>
                <input type="text" name='name' placeholder='Enter your name' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' />
                <input type="text" name='email' placeholder='Enter your email' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' />
                <textarea name="message" rows={10} placeholder='Enter your message' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'></textarea>

                <button className='text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Let's Talk</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
