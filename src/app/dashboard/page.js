"use client";
import { useEffect, useState } from "react";
import AddMembers from "@/components/AddMembers";
import MembersSection from "@/components/MembersSection";
import MembershipSection from "@/components/MembershipSection";
import PaymentsSection from "@/components/PaymentSection";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const cookie = Cookies.get('Admin')
        if (cookie) {
            setIsAdmin(true)
        }
    }, [])

    const [activeSection, setActiveSection] = useState("profile");

    if (!isAdmin) {
        return (<div className="flex text-yellow-500 flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Admin Only Page</h1>
            <p className="text-lg">This page can only be accessed by admins.</p>
        </div>)
    }

    return (
        <>
            <div className="min-h-screen  bg-gray-900 text-white flex flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full pt-20 lg:w-1/5 bg-gray-800 flex flex-col p-5 lg:h-screen">
                    <h2 className="text-2xl font-bold mb-5 text-yellow-500 text-center lg:text-left">
                        Admin Dashboard
                    </h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => setActiveSection("profile")}
                                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-black ${activeSection === "profile" ? "bg-yellow-500 text-black" : ""
                                    }`}
                            >
                                Add Members
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("members")}
                                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-black ${activeSection === "members" ? "bg-yellow-500 text-black" : ""
                                    }`}
                            >
                                Members
                            </button>
                        </li>
                        {/* <li>
                            <button
                                onClick={() => setActiveSection("membership")}
                                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-black ${activeSection === "membership" ? "bg-yellow-500 text-black" : ""
                                    }`}
                            >
                                Membership Plans
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("payments")}
                                className={`w-full text-left py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-black ${activeSection === "payments" ? "bg-yellow-500 text-black" : ""
                                    }`}
                            >
                                Payments
                            </button>
                        </li> */}
                    </ul>
                </aside>

                <main className="w-full lg:w-4/5 p-5 lg:p-10">
                    {activeSection === "profile" && <AddMembers />}
                    {activeSection === "members" && <MembersSection />}
                    {/* {activeSection === "membership" && <MembershipSection />} //Service is not avalable */}
                    {/* {activeSection === "payments" && <PaymentsSection />} */}
                </main>
            </div>
        </>);
};

export default Dashboard;
