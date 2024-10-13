'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext'
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation';
import axios from "axios";
import Script from 'next/script';


const Cards = ({ img, title, duration, disc1, disc2, price }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [Amount, setAmount] = useState(price)
    const router = useRouter();
    const { isLoggedIn } = useAuth();
   



    const handlePayment = async () => {
        setIsProcessing(true);
        if (!isLoggedIn) {
            router.push('/signup')
        }
        try {
            const checkRes = await axios.put(`/api/booking`,
                JSON.stringify({ duration: duration })
            );
            if (checkRes.status == 208) {
                toast.warning(checkRes.data.message)
            }
            else {
                try {
                    const data = await axios.post(`/api/payment`,
                        JSON.stringify({ amount: Amount })
                    );

                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: Amount * 100,
                        currency: "INR",
                        name: "RK Fitness",
                        description: "Package Booked",
                        order_id: data.orderId,
                        handler: async function (response) {
                            const res = await axios.post('api/booking',
                                JSON.stringify({ duration: duration })
                            )

                            const data = await axios.put(`/api/payment`,
                                JSON.stringify({ amount: Amount, duration: duration, id : response.razorpay_payment_id })
                            );
                            toast.success(res.data.message)
                            toast.success(data.data.message)
                            
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                } catch (error) {
                    console.error("Error in Payment:", error);
                    toast.error(error.response.data.error)
                }

            }

        } catch (error) {
            toast.error("hello")
        }
        finally {
            setIsProcessing(false);
        }


    };




    // const handleClick = () => {
    //     if (isLoggedIn) {
    //         router.push('/profile');
    //     } else {
    //         router.push('/signup');
    //     }
    // };
    return (
        <>
           
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className=" overflow-hidden hover:scale-105 hover:z-10 rounded-md duration-500 border relative w-[90%] h-[250px] md:w-[40%] md:h-[45%]">

                <Image className=' absolute hover:-left-[90px] duration-700 -left-[100px] md:-left-[60px] h-[100%]' height={250} alt={title} src={img} />

                <div className=' w-[100%] h-[200%] md:-rotate-[55deg]   absolute -top-5 -right-[160px] md:-right-[140px] z-10 bg-yellow-500 '>

                </div>
                <div className=' z-20 w-[40%]  font-bold text-black absolute right-2 top-5'>
                    <h1 className=' mb-2 text-3xl'>{title}</h1>
                    <ul className=' list-disc space-y-1'>
                        <li>{duration} Months</li>
                        <li>{disc1}</li>
                        <li>{disc2}</li>
                        <li>Only ₹{price}</li>
                    </ul>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={isProcessing}  // Disable button while processing
                    className={`absolute right-4 bottom-2 z-30 border-black bg-white rounded-md px-3 py-2 font-bold transition-all duration-500 transform shadow-md ${
                        isProcessing ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-black hover:text-white hover:border-0 hover:scale-110'
                    }`}
                >
                    {isProcessing ? 'Processing...' : 'Enroll Now'}
                </button>

            </div>
        </>

    )
}

export default Cards

