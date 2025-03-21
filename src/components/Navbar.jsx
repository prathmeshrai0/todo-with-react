import React from 'react'

const Navbar = () => {
  return (
  <nav className='flex gap-6  p-4 bg-gray-800'>
    <div className='cursor-pointer hover:font-bold   w-20'>Home</div>
    <div onClick={()=>{alert('Nothing I am just a developer !!!!')}} className='cursor-pointer hover:font-bold   w-20'>About Me</div>
  </nav>
  )
}

export default Navbar