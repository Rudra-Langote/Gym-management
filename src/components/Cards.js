import React from 'react'
import Image from 'next/image'
import cd1 from '../../public/Card1.jpg'

const Cards = () => {
    return (

        <div className=" overflow-hidden border relative w-[40%] h-[45%]">
            <Image className=' absolute -left-[60px] h-[100%]' src={cd1} />

            <div className=' w-[100%] h-[200%] -rotate-[40deg] absolute top-0 -right-[140px] z-10 bg-yellow-300 '>

            </div>
            <div className=' z-20 w-[40%]  font-bold text-black absolute right-2 top-5'>
                <h1 className=' mb-2 text-3xl'>QuickGain</h1>
                <ul className=' list-disc space-y-1'>
                    <li>1 Month</li>
                    <li>Fexible Hours</li>
                    <li>Mon-Sat</li>
                    <li>Only ₹500</li>
                </ul>
            </div>

            <button className=' absolute right-2 bottom-2 z-30 border-black  bg-white rounded-sm hover:bg-black hover:text-white hover:border-0 border-[2px] duration-[0.3s] text-black h-[20%] w-[20%]'>Enroll Now</button>

        </div>

    )
}

export default Cards

{/* <div className=" bg-red-200 w-[40%] h-[45%]">

            </div>
            <div className=" bg-red-200 w-[40%] h-[45%]">dlklas</div>
            <div className=" bg-red-200 w-[40%] h-[45%]">lkflk</div> */}