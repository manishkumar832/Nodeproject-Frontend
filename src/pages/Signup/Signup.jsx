import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiUrl } from "../../App";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: "",                          
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.name || !form.password || !form.role) {
      return toast.error("All fields are required");
    }

    try {
      await axios.post(`${ApiUrl}/auth/signup`, {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role, 
      });

      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

         
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Role</option>
            <option value="employee">employee</option>
            <option value="jobseeker">jobseeker</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
