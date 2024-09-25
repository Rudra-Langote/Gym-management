import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className=' absolute z-20 w-[100%]'>
      <nav className=' flex justify-between items-center m-2 p-4 px-10'>
        <div className=' col-span-1'>
            <label className=' text-white text-4xl' htmlFor="logo"><span className=' font-bold text-yellow-300' >RK</span><span className=' font-extralight'>Fitness</span></label>
        </div>
        <div>
            <ul className=' hidden md:flex gap-[50px] text-white text-xl'>
                <Link href={'/'}><li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Home</li></Link>
                <Link href="#Blog"><li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>About</li></Link>
                <Link href="#Package"><li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Packegs</li></Link>
                <Link href="#Service"><li className=' cursor-pointer hover:text-yellow-300 duration-[0.3s] '>Service</li></Link>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
