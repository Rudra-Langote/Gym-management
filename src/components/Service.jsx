import React from 'react'
import Image from 'next/image'


const Service = ({img, head, disc}) => {
    return (
        <div id='Service' className=' m-5 my-10'>
            <div className='flex flex-col md:flex-row items-center p-6 gap-10'>
                <div>
                    <Image height={200} quality={100} src={img} />
                </div>
                <div className=' text-white'>
                    <h1 className=' text-3xl text-yellow-500 font-bold'>{head}</h1>
                    <p className=' my-1 text-md'>{disc}</p>
                </div>
            </div>
            <hr />
        </div>
        
    )
}

export default Service
