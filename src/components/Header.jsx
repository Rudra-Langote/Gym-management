'use client'
import React, { useEffect, useState, useTransition } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '@/app/contexts/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handelUserFind = async () => {
      try {
        const cookie = Cookies.get('Admin');
        if (cookie) {
          setIsAdmin(true);
        }
      } catch (error) {
        
      }
    };

    const handelDataUpdate = async () => {
      await axios.post('api/member');
    };
    handelDataUpdate()
    handelUserFind();
  }, []);



  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (href) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="absolute z-20 w-[100%]">
      <nav className="flex justify-between items-center m-2 py-2 md:p-4 md:px-10">
        <div className="col-span-1">
          <label className="text-white text-6xl md:text-4xl" htmlFor="logo">
            <span className="font-bold text-yellow-500">RK</span>
            <span className="font-extralight">Fitness</span>
          </label>
        </div>
        <div className="flex justify-center items-center p-2">
          <ul className="hidden md:flex gap-[50px] text-white text-xl">
            <li
              className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                isPending ? 'opacity-50' : ''
              }`}
              onClick={() => handleNavigation('/')}
            >
              Home
            </li>
            {isLoggedIn && isAdmin && (
              <li
                className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                  isPending ? 'opacity-50' : ''
                }`}
                onClick={() => handleNavigation('/dashboard')}
              >
                Dashboard
              </li>
            )}
            <li
              className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                isPending ? 'opacity-50' : ''
              }`}
              onClick={() => handleNavigation('/#Blog')}
            >
              About
            </li>
            <li
              className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                isPending ? 'opacity-50' : ''
              }`}
              onClick={() => handleNavigation('/#Package')}
            >
              Packages
            </li>
            <li
              className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                isPending ? 'opacity-50' : ''
              }`}
              onClick={() => handleNavigation('/#Service')}
            >
              Service
            </li>
            {isLoggedIn && (
              <li
                className={`cursor-pointer hover:text-yellow-500 duration-[0.3s] ${
                  isPending ? 'opacity-50' : ''
                }`}
                onClick={() => handleNavigation('/profile')}
              >
                Profile
              </li>
            )}
          </ul>
          <ul className="text-white text-2xl md:hidden flex justify-center items-center">
            <li
              onClick={toggleDropdown}
              className="cursor-pointer hover:text-yellow-500 duration-[0.3s]"
            >
              <i className="fa-solid fa-bars"></i>
            </li>
            {isOpen && (
              <ul className="absolute rounded-lg top-20 right-10 w-[50%] items-center bg-black text-white flex flex-col space-y-4 py-4 px-6 md:hidden">
                <li onClick={() => handleNavigation('/')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                  Home
                </li>
                {isLoggedIn && isAdmin && (
                  <li onClick={() => handleNavigation('/dashboard')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                    Dashboard
                  </li>
                )}
                <li onClick={() => handleNavigation('/#Blog')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                  About
                </li>
                <li onClick={() => handleNavigation('/#Package')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                  Packages
                </li>
                <li onClick={() => handleNavigation('/#Service')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                  Service
                </li>
                {isLoggedIn && (
                  <li onClick={() => handleNavigation('/profile')} className="cursor-pointer hover:text-yellow-500 duration-[0.3s]">
                    Profile
                  </li>
                )}
              </ul>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
