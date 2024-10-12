"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const MembersSection = () => {

  const [Members, setMembers] = useState([])
  useEffect(() => {
    const handelMember = async () => {
      const mem = await axios.get('api/memberfind')
      setMembers(mem.data.member)

    }
    handelMember()
  }, [])
  const handelMemberDelete = async (email) => {
    try {
      const res = await axios.delete('api/member', {
        data: { email: email }
      })
      toast.success(res.data.message)

      
    } catch (error) {
      toast.error(res.response.data.error)
    }
    

  }


  return (
    <div>
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-4">Members</h2>
      <div className="bg-gray-800 p-2 md:p-6 rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Members.map((member) => (
              <tr key={member.id}>
                <td className="py-2">{member.firstName} {member.lastName}</td>
                <td className="py-2">{member.email}</td>
                <td className={`py-2 ${member.isMember ? "text-green-500" : "text-red-500"}`}>
                  {member.isMember ? 'Active' : 'Expired'}
                </td>
                <td className="py-2 ">
                  <button
                    onClick={() => { handelMemberDelete(member.email) }}
                    className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all"
                  >Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersSection;
