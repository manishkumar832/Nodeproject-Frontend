import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { ApiUrl } from "../../App";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are required", { duration: 3000 });
    }

    try {
      setLoading(true);
      const results = await axios.post(`${ApiUrl}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      toast.success("Login successful ✅", { duration: 3000 });

      setUser(results?.data?.user);
      localStorage.setItem("user", JSON.stringify(results?.data?.user));
      localStorage.setItem("token", results?.data?.token);
      localStorage.setItem("role", results?.data?.user.role);

    
      setTimeout(() => {
        if (results?.data?.user.role === "employee") {
          navigate("/Employee");
        } else if (results?.data?.user.role === "jobseeker") {
          navigate("/Jobseeker");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Login failed ❌",
        { duration: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      <Toaster position="top-right" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Welcome Back 👋
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-16"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-300
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
