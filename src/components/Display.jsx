"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

const Display = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn)

    const sendSignup = () => {
        router.push("/signup");
    };

    const sendLogin = () => {
        router.push("/login");
    };

    return (
        <div id="Top" className="relative h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/Display.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                <div className="relative text-center text-2xl md:text-5xl mb-8 px-4 w-full max-w-2xl">
                    <h1 className="text-white font-bold">
                        Once You See <span className="text-yellow-500">Results</span>
                    </h1>
                    <h1 className="text-white font-bold mt-4 md:mt-2">
                        It <span className="text-yellow-500">Becomes</span> An Addiction
                    </h1>
                </div>

                <div className="relative flex justify-center items-center mb-8">
                    <ul className="flex list-disc flex-wrap gap-8 md:gap-16 text-white text-lg md:text-xl">
                        <li className="text-yellow-500">Strength</li>
                        <li>Endurance</li>
                        <li className="text-yellow-500">Performance</li>
                    </ul>
                </div>

                {isLoggedIn ? (
                    <div className="flex flex-col items-center text-5xl md:text-6xl font-bold mt-8">
                        <span className="underline text-yellow-500">RK</span>
                        <span className="text-white underline text-3xl md:text-4xl">FITNESS</span>
                    </div>

                ) : (

                    <div className="flex flex-wrap gap-4 md:gap-10 items-center justify-center w-full max-w-xl">
                        <button
                            onClick={sendSignup}
                            className="px-6 py-3 md:px-8 md:py-4 text-white bg-yellow-500 border-2 border-yellow-500 rounded-md hover:bg-white hover:text-black duration-300"
                        >
                            Be a Member
                        </button>
                        <button
                            onClick={sendLogin}
                            className="px-6 py-3 md:px-8 md:py-4 text-white border-2 border-white rounded-md hover:bg-white hover:text-black duration-300"
                        >
                            Already a Member
                        </button>
                    </div>
                )}
            </div>


            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 opacity-90"></div>
        </div>
    );
};

export default Display;
