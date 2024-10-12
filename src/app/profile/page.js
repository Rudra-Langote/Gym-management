"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Script from "next/script";


const Profile = () => {

    const [activeTab, setActiveTab] = useState("userInfo");
    const router = useRouter()
    const { setIsLoggedIn } = useAuth()
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: undefined,
        address: "",
        age: undefined,
        gender: "",
        email: ""
    });

    const [isProcessing, setIsProcessing] = useState(false)
    const [Amount, setAmount] = useState(0)


    const [membership, setMembership] = useState({
        duration: null,
        startDate: null,
        endDate: null,
        isMember: false,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post("/api/users/profile");
                setUserInfo(res.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        const fetchMember = async () => {
            try {
                const res = await axios.post("/api/memberfind");
                setMembership(res.data.member);
                if (res.data.member.duration == 1) {
                    setAmount(700)
                }
                else if (res.data.member.duration == 3) {
                    setAmount(700 * 3)
                }
                else if (res.data.member.duration == 6) {
                    setAmount(700 * 6)
                }
                else if (res.data.member.duration == 12) {
                    setAmount(700 * 12)
                }
            } catch (error) {
                console.error("Error fetching membership data:", error);
            }
        };

        fetchUser();
        fetchMember();
    }, []);

    const startDate = new Date(membership.startDate);
    const endDate = new Date(membership.endDate);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
        hour12: true,
    };
    const formattedStartDate = startDate.toLocaleString("en-IN", options);
    const formattedEndDate = endDate.toLocaleString("en-IN", options);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === "age" || name === "phoneNumber" ? Number(value) : value;

        setUserInfo((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    const handleSaveDetails = async () => {
        try {
            const res = await axios.put('api/users/profile',
                JSON.stringify(userInfo)
            )

            toast.success(res.data.message)
        } catch (error) {

            toast.error(response.data.error)
        }
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get('api/users/logout')
            toast.success(res.data.message)
            setIsLoggedIn(false)
            router.push('/')
        } catch (error) {
            toast.error(response.data.error)
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const res = await axios.delete('api/users/profile')
            toast.success(res.data.message)
        } catch (error) {
            toast.error(response.data.error)
        }
    };
    const handleNewPack = async () => {
        router.push('/#Package')
    }

    const handlePayment = async () => {
        setIsProcessing(true);


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
                    console.log("Payment Successful", response);
                    handleRenewPack()
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in Payment:", error);
            // toast.error(error.response.data.error)
        } finally {
            setIsProcessing(false);
        }


    };
    const handleRenewPack = async () => {
        try {
            const res = await axios.put('api/member',
                JSON.stringify({ email: userInfo.email, duration: membership.duration })
            )
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-950 text-white p-8">
             <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <ToastContainer />
            <div className="bg-gray-800 p-8 mt-20 rounded-3xl shadow-2xl w-full max-w-5xl transform transition-all duration-500 hover:scale-105">
                <h2 className="text-4xl font-bold text-center mb-8 text-yellow-500 drop-shadow-lg">
                    Profile
                </h2>
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => handleTabChange("userInfo")}
                        className={`flex items-center py-3 px-6 rounded-t-lg mx-2 transition duration-500 ${activeTab === "userInfo"
                            ? "bg-yellow-500 text-gray-900 font-semibold shadow-lg transform scale-105"
                            : "bg-gray-700 hover:bg-yellow-600 hover:scale-105 hover:shadow-lg"
                            }`}
                    >
                        <FaUserCircle className="mr-2 text-2xl" />
                        Information
                    </button>
                    <button
                        onClick={() => handleTabChange("membershipStatus")}
                        className={`flex items-center py-3 px-6 rounded-t-lg mx-2 transition duration-500 ${activeTab === "membershipStatus"
                            ? "bg-yellow-500 text-gray-900 font-semibold shadow-lg transform scale-105"
                            : "bg-gray-700 hover:bg-yellow-600 hover:scale-105 hover:shadow-lg"
                            }`}
                    >
                        <FaClipboardList className="mr-2 text-2xl" />
                        Membership Status
                    </button>
                </div>

                <div className="bg-gray-700 p-8 rounded-b-3xl shadow-2xl">
                    {activeTab === "userInfo" ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {Object.keys(userInfo).filter((key) => key !== "email").map((key) => (
                                <div
                                    key={key}
                                    className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <h3 className="text-lg font-semibold mb-2 text-yellow-400 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </h3>
                                    <input
                                        type={key === "age" ? "number" : "text" || key === "phoneNumber" ? "tel" : "text"}
                                        name={key}
                                        value={userInfo[key] || ""}
                                        onChange={handleInputChange}
                                        className="bg-gray-700 text-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        min={key === "age" ? "7" : undefined}
                                    />
                                </div>

                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-2">
                            {membership.isMember ? (
                                <>
                                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                                            Membership Plan
                                        </h3>
                                        <p className="text-gray-300">{membership.duration} Months</p>
                                    </div>
                                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                                            Status
                                        </h3>
                                        <p className="text-gray-300">Active</p>
                                    </div>
                                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                                            Start Date
                                        </h3>
                                        <p className="text-gray-300">{formattedStartDate}</p>
                                    </div>
                                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                        <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                                            End Date
                                        </h3>
                                        <p className="text-gray-300">{formattedEndDate}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl col-span-full">
                                    <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                                        Membership Status
                                    </h3>
                                    <p className="text-gray-300">No membership available</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-4 md:flex-row justify-between">
                        {activeTab === "userInfo" && (
                            <>
                                <button
                                    onClick={handleSaveDetails}
                                    className="bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Save Details
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-gray-900 text-red-500 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Delete Account
                                </button>
                            </>
                        )}
                        {activeTab === "membershipStatus" && !membership.isMember && (
                            <>
                                <button
                                    onClick={handlePayment}
                                    className="bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Renew Pack
                                </button>
                                <button
                                    onClick={handleNewPack}
                                    className="bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Buy New Pack
                                </button>
                            </>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
