"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";

const AddMembers = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: null,
        email: "",
        gender: "Male",
        duration: 1,
    });
    
    const [Amount, setAmount] = useState()
    useEffect(()=>{
        setAmount(700*formData.duration)

    },[formData])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === "phoneNumber" ? Number(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const checkRes = await axios.put(`/api/booking`,
                formData
            );
            if (checkRes.status == 208) {
                toast.warning(checkRes.data.error)
            }
            else {
                try {
                    const data = await axios.post(`/api/payment`,
                        JSON.stringify({ amount: Amount * 100 })
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
                                formData
                            )
                            toast.success(res.data.message || "Member added successfully!");
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                } catch (error) {
                    console.error("Error in Payment:", error);
                    toast.error(error.response?.data?.error || "Failed to add member");
                }

            }



        } catch (error) {
            toast.error(error.response.data.error)

        }
        finally {
            setIsProcessing(false);
        }

    };
    return (
        <div className="min-h-md md:mt-20 bg-gray-900 text-white flex items-center justify-center">
             <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <ToastContainer />
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-yellow-500">Add New Member</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Duration (Months)</label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
                            >
                                <option value={1}>1 Month</option>
                                <option value={3}>3 Months</option>
                                <option value={6}>6 Months</option>
                                <option value={12}>12 Months</option>
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all"
                        >
                            Add Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMembers;