
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react"; 

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-200 hover:shadow-2xl transition-all duration-300">
        
       
        <div className="flex flex-col items-center">
          <img
            src={user.profile}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-black mt-4">{user.name}</h2>
        </div>

        
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center text-gray-700">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{user.username}</span>
          </div>
          <div className="flex items-center justify-center text-gray-700">
            <Mail className="w-5 h-5 mr-2 text-indigo-600" />
            <span>{user.email}</span>
          </div>
          
        </div>

     
        <div className="my-6 border-t border-gray-300"></div>

       
        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
