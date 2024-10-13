"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Verify = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(()=>{
    const tokenFromUrl = window.location.href.split("=")[1];
    setToken(tokenFromUrl);
  },[])
  const handleVerify = async () => {
    try {
      const res = await axios.post('/api/users/verifyemail',
        JSON.stringify({ Token: token })
      )
      toast.success(res.data.message)
      router.push('/login')
    } catch (error) {
      toast.error(error.response.data.error)
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Verify Your Account</h2>

        <p className="text-center text-gray-400 mb-4">
          Click the button below to verify your account.
        </p>

        <button
          onClick={handleVerify}
          className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Verify
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already verified?{" "}
            <a href="/login" className="text-yellow-500 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
