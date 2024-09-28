"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaClipboardList } from "react-icons/fa";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("userInfo");
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: undefined,
        address: "",
        age: undefined,
        gender: "",
    });

    
    
    const [membership, setMembership] = useState({
        duration : null,
        startDate : null,
        endDate : null,
        isMember : false

    });
    


    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post('/api/users/profile');
                console.log(res)
                setUserInfo(res.data.user); // Assuming the API returns user data
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        const fetchMember = async () =>{
            try {
                const res = await axios.post('/api/memberfind');
                console.log(res)
                setMembership(res.data.member); // Assuming the API returns user data
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        
        fetchMember();
        fetchUser();
    }, []);

    const startDate = new Date(membership.startDate);
    const endDate = new Date(membership.endDate);
    const options = {
        year: 'numeric',
        month: 'long', // Full month name; use '2-digit' for numeric month
        day: 'numeric',
        timeZone: 'Asia/Kolkata', // Set the time zone to India
        hour12: true, // Use 12-hour clock
    };
    const formattedStartDate = startDate.toLocaleString('en-IN', options);
    const formattedEndDate = endDate.toLocaleString('en-IN', options);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Convert age and phoneNumber to numbers when input changes
        const updatedValue = name === "age" || name === "phoneNumber" ? Number(value) : value;

        setUserInfo((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    const handleSaveDetails = () => {
        // Placeholder: Add functionality to save user details
        console.log("Details saved:", userInfo);
    };

    const handleLogout = () => {
        // Placeholder: Add logout functionality
        console.log("User logged out");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-950 text-white p-8">
            <div className="bg-gray-800 p-8 mt-20 rounded-3xl shadow-2xl w-full max-w-5xl transform transition-all duration-500 hover:scale-105">
                <h2 className="text-4xl font-bold text-center mb-8 text-yellow-500 drop-shadow-lg">
                    Profile
                </h2>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => handleTabChange("userInfo")}
                        className={`flex items-center py-3 px-6 rounded-t-lg mx-2 transition duration-500 ${activeTab === "userInfo"
                            ? "bg-yellow-500 text-gray-900 font-semibold shadow-lg transform scale-105"
                            : "bg-gray-700 hover:bg-yellow-600 hover:scale-105 hover:shadow-lg"
                            }`}
                    >
                        <FaUserCircle className="mr-2 text-2xl" />
                        User Information
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

                {/* Card Container */}
                <div className="bg-gray-700 p-8 rounded-b-3xl shadow-2xl">
                    {activeTab === "userInfo" ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* User Information Cards */}
                            {Object.keys(userInfo).map((key) => (
                                <div
                                    key={key}
                                    className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <h3 className="text-lg font-semibold mb-2 text-yellow-400 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </h3>
                                    <input
                                        type={key === "age" || key === "phoneNumber" ? "number" : "text"} // Use number input for age and phoneNumber
                                        name={key}
                                        value={userInfo[key] || ''} // Prevent uncontrolled input warnings
                                        onChange={handleInputChange}
                                        className="bg-gray-700 text-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        min={key === "age" ? "7" : undefined} // Prevent negative numbers for age
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Membership Status Cards */}
                            {membership ? (
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
                                        <p className="text-gray-300">{membership.isMember === true? "Active" : "Expired"}</p>
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

                    {/* Action Buttons */}
                    {activeTab === "userInfo" && (
                        <div className="mt-8 flex justify-between">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
