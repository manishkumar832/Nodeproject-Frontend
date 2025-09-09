import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Image, UserCircle2 } from "lucide-react";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profile: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setForm({ ...form, profile: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);

      if (form.profile) {
        formData.append("profilePic", form.profile);
      }

      const res = await axios.put(
        "https://nodeproject-s6y6.onrender.com/user/editProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("✅ Profile updated");
      console.log("Updated User:", res.data);
    } catch (error) {
      console.error("❌ Edit Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5"
      >
        <div className="flex justify-center mb-4">
          <UserCircle2 size={64} className="text-gray-600" />
        </div>

        
        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <User className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

        
        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <User className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

        
        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <Mail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

      
        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <Lock className="text-gray-500 mr-2" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

       
        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <Image className="text-gray-500 mr-2" size={20} />
          <input
            type="file"
            name="profile"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>


        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
