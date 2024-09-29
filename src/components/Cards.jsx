import React from 'react'
import Image from 'next/image'


const Cards = ({img, title, duration, disc1, disc2, price }) => {
    return (

        <div className=" overflow-hidden hover:scale-105 hover:z-10 rounded-md duration-500 border relative w-[90%] h-[250px] md:w-[40%] md:h-[45%]">
            <Image className=' absolute hover:-left-[90px] duration-700 -left-[100px] md:-left-[60px] h-[100%]' src={img} />

            <div className=' w-[100%] h-[200%] md:-rotate-[55deg] absolute -top-5 -right-[160px] md:-right-[140px] z-10 bg-yellow-500 '>

            </div>
            <div className=' z-20 w-[40%]  font-bold text-black absolute right-2 top-5'>
                <h1 className=' mb-2 text-3xl'>{title}</h1>
                <ul className=' list-disc space-y-1'>
                    <li>{duration}</li>
                    <li>{disc1}</li>
                    <li>{disc2}</li>
                    <li>{price}</li>
                </ul>
            </div>

            <button className="absolute right-4 bottom-2 z-30 border-black bg-white rounded-md px-3 py-2 font-bold transition-all duration-500 transform hover:bg-black hover:text-white hover:border-0 hover:scale-110 shadow-md">
            Enroll Now
            </button>

        </div>

    )
}

export default Cards

{/* <div className=" bg-red-200 w-[40%] h-[45%]">

            </div>
            <div className=" bg-red-200 w-[40%] h-[45%]">dlklas</div>
            <div className=" bg-red-200 w-[40%] h-[45%]">lkflk</div> */}