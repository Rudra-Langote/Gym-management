import React from 'react'

const Header = () => {
  return (
    <div className=' absolute z-20 w-[100%]'>
      <nav className=' flex justify-between items-center m-2 p-4 px-10'>
        <div className=' col-span-1'>
            <label className=' text-white text-4xl' htmlFor="logo"><span className=' font-bold text-yellow-300' >RR</span><span className=' font-extralight'>Fitness</span></label>
        </div>
        <div>
            <ul className=' hidden md:flex gap-[50px] text-white text-xl'>
                <li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Home</li>
                <li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>About</li>
                <li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Packegs</li>
                <li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Service</li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
