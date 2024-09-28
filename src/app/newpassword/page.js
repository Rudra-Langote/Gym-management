"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const SetPassword = () => {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const serarchParams = useSearchParams()
  const token = serarchParams.get('token')

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
      } else {

        setError('')
        const res = await axios.post('api/users/changepassword',
          JSON.stringify({ password: newPassword, token: token })
        )
        toast.success(res.data.message)
        router.push('/login')
      }

    } catch (error) {
      toast.error(error.response.data.error)

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <ToastContainer/>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Set New Password</h2>

        <form onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700"
              placeholder="Confirm your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
