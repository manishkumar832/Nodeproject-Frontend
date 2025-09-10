import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profile: null,
    profilePicUrl: "",
    id: "",
    role: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://nodeproject-s6y6.onrender.com/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data.data || res.data;
        const userData = {
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          profilePicUrl: data.profile || "",
          id: data._id || "",
          role: data.role || "",
        };

        setForm((prev) => ({ ...prev, ...userData }));
        setOriginalData(userData);
      } catch (error) {
        toast.error("Failed to load profile", { duration: 1000 });
      }
    };
    fetchProfile();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setForm({ ...form, profile: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Check if user changed anything
  const hasChanges = () => {
    if (!originalData) return false;
    return (
      form.name !== originalData.name ||
      form.username !== originalData.username ||
      form.password.trim() !== "" ||
      form.profile !== null
    );
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast("⚠️ No changes made", { duration: 1000 });
      return;
    }

    try {
      const formData = new FormData();
      if (form.name.trim() !== "") formData.append("name", form.name);
      if (form.username.trim() !== "") formData.append("username", form.username);
      if (form.password.trim() !== "") formData.append("password", form.password);
      if (form.profile instanceof File) formData.append("profilePic", form.profile);

      const res = await axios.put(
        "https://nodeproject-s6y6.onrender.com/user/editProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = res.data.data || res.data.user || res.data;

      toast.success(res.data.message || "✅ Profile updated", { duration: 1000 });

      setForm((prev) => ({
        ...prev,
        password: "",
        profile: null,
        profilePicUrl: updatedUser.profile
          ? `https://nodeproject-s6y6.onrender.com/${updatedUser.profile}`
          : prev.profilePicUrl,
      }));

      setTimeout(() => navigate("/profile"), 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile", { duration: 1000 });
    }
  };

  const previewSrc = form.profile
    ? URL.createObjectURL(form.profile)
    : form.profilePicUrl || "/default-avatar.png";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5"
      >
        <div className="flex justify-center mb-4">
          <img
            src={previewSrc}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover"
          />
        </div>

        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <User className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <User className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <Lock className="text-gray-500 mr-2" size={20} />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password (leave blank to keep same)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center border rounded-xl p-3 bg-gray-50">
          <Image className="text-gray-500 mr-2" size={20} />
          <input
            type="file"
            name="profile"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <p className="text-center text-sm text-gray-600">
          <strong>ID:</strong> {form.id} | <strong>Role:</strong> {form.role}
        </p>

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
