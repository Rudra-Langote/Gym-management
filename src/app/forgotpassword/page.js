"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('/api/users/forgotpassword',
                JSON.stringify({ email: email })
            )
            toast.success(res.data.message)

        } catch (error) {
            toast.error(error.response.data.message)
        }
        

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <ToastContainer/>
            <div className="bg-gray-800 mt-20 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">Forgot Your Password?</h2>

                <p className="text-center text-gray-400 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                        Send Mail
                    </button>
                </form>

                {/* Back to Login Link */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                        Remembered your password?{" "}
                        <Link href="/login" className="text-yellow-500 hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
