import React from 'react'

const Display = () => {
    return (
        <div className="relative h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/Display.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            <div className="relative z-10 flex flex-col gap-[30px] items-center justify-center h-full">
                <div className=' relative   h-[17%] w-[45%]'>
                    <h1 className="text-white text-5xl absolute left-0 top-0 font-bold">Once You See <span className=' text-yellow-300'>Results</span></h1>
                    <h1 className="text-white text-5xl absolute  right-0 bottom-0 font-bold">It <span className=' text-yellow-300'>Becomes</span> An Addiction</h1>
                </div>
                <div>
                    <div className=' relative bottom-0  h-[17%] w-[45%]'>
                        <ul className=' flex gap-[90px] list-disc text-white text-xl'>
                            <li className=' text-yellow-300'>Strength</li>
                            <li>Endurance</li>
                            <li className=' text-yellow-300'>Performance</li>
                        </ul>
                    </div>
                </div>

                <div className=' mt-[50px] relative flex gap-[50px] items-center justify-center  h-[10%] w-[45%]'>
                    <button className=' border-yellow-300 bg-yellow-300 rounded-sm hover:bg-white hover:text-black hover:border-0 border-[2px] duration-[0.3s] text-white h-[70%] w-[25%]'>Be a Member</button>
                    <button className=' border-2 rounded-sm text-white hover:bg-white hover:text-black h-[70%] w-[25%] duration-[0.3s]'>Allread a Member</button>
                </div>

                



            </div>
            <div className="absolute inset-0 bg-black opacity-50 z-5"></div>
        </div>

    )
}

export default Display
