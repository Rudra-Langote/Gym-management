"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';


const Header = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=' absolute z-20 w-[100%]'>
      <nav className=' flex justify-between items-center m-2 py-2 md:p-4 md:px-10'>
        <div className=' col-span-1'>
          <label className=' text-white text-6xl md:text-4xl' htmlFor="logo"><span className=' font-bold text-yellow-500' >RK</span><span className=' font-extralight'>Fitness</span></label>
        </div>
        <div className=' flex justify-center items-center  p-2'>
          <ul className=' hidden md:flex gap-[50px] text-white text-xl'>
            <Link href={'/'}><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Home</li></Link>
            <Link href="#Blog"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>About</li></Link>
            <Link href="#Package"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Packegs</li></Link>
            <Link href="#Service"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Service</li></Link>
            {isLoggedIn && <Link href="/profile"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Profile</li></Link>}
          </ul>
          <ul className='text-white text-2xl md:hidden flex justify-center items-center' >
            <li onClick={toggleDropdown} className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '><i className="fa-solid fa-bars"></i></li>
            {isOpen && (
              <ul className="absolute rounded-lg top-20 right-10 w-[50%] items-center bg-black  text-white flex flex-col  space-y-4 py-4 px-6 md:hidden">
                <Link href={'/'}><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Home</li></Link>
                <Link href="#Blog"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>About</li></Link>
                <Link href="#Package"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Packegs</li></Link>
                <Link href="#Service"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Service</li></Link>
                {isLoggedIn && <Link href="/profile"><li className=' cursor-pointer hover:text-yellow-500 duration-[0.3s] '>Profile</li></Link>}
              </ul>
            )}
        </ul>
    </div>
      </nav >
    </div >
  )
}

export default Header
