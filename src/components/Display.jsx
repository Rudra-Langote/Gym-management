"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { useAuth } from '@/app/contexts/AuthContext';

const Display = () => {
    const router = useRouter()
    const { isLoggedIn } = useAuth();

    const sendSignup = () => {

        router.push("/signup");
    };

    const sendLogin = () => {
        router.push("/login");
    };


    return (
        <div id='Top' className="relative h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/Display.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            <div className="relative z-10 flex flex-col md:gap-[30px] items-center justify-center h-full">
                <div className='   relative  text-3xl  md:text-5xl h-[11%] w-[90%] md:h-[17%] md:w-[45%]'>
                    <h1 className="text-white  absolute left-0 top-0 font-bold">Once You See <span className=' text-yellow-500'>Results</span></h1>
                    <h1 className="text-white  absolute right-0 bottom-0  font-bold">It <span className=' text-yellow-500'>Becomes</span> An Addiction</h1>
                </div>

                <div className=' relative bottom-0 flex justify-center items-center p-2 h-[17%] md:w-[45%]'>
                    <ul className=' flex gap-[40px] md:gap-[90px] list-disc text-white text-md md:text-xl'>
                        <li className=' text-yellow-500'>Strength</li>
                        <li>Endurance</li>
                        <li className=' text-yellow-500'>Performance</li>
                    </ul>
                </div>


                {isLoggedIn ? <div className='  md:mt-[50px] relative flex gap-[50px] items-center justify-center w-[90%]  h-[15%] md:h-[10%] md:w-[45%]'>
                    <button onClick={sendSignup} className=' md:p-2 text-center border-yellow-500 bg-yellow-500 rounded-sm hover:bg-white hover:text-black hover:border-0 border-[2px] duration-[0.3s] text-white h-[40%] w-[40%] md:h-[70%] md:w-[25%]'>Be a Member</button>
                    <button onClick={sendLogin} className=' md:p-2 border-2 rounded-sm text-white hover:bg-white hover:text-black  h-[40%] w-[40%] md:h-[70%] md:w-[25%] duration-[0.3s]'>Allread a Member</button>
                </div> : <div className='  md:mt-[50px] relative flex flex-col text-5xl items-center justify-center w-[50%]  h-[20%] md:h-[20%] md:w-[20%]'>
                    <span className=' underline font-bold text-yellow-500' >RK</span>
                    <span className=' text-white  underline text-3xl font-bold'>FITNESS</span>
                </div>}

            </div>
            <div className="absolute inset-0 bg-black opacity-50 z-5"></div>
        </div>

    )
}

export default Display
