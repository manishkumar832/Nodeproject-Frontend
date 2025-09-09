import React from "react";
import { useNavigate } from "react-router-dom";

export default function FrontPage() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const role = localStorage.getItem("role"); 
    const token = localStorage.getItem("token");

    if (!token || !role) {
      
      navigate("/login");
    } else if (role === "jobseeker") {
      navigate("/jobs");
    } else if (role === "employee") {
      navigate("/manage-jobs");
    }
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-50 flex flex-col pt-16 overflow-x-hidden">
      
      <header className="bg-gradient-to-l from-white to-indigo-700 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Find Your Next Opportunity with{" "}
          <span className="text-yellow-300">NextHire</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          Discover the latest job openings and connect with top employers around
          the world.
        </p>
        <div className="mt-8">
          <button
            onClick={handleNavigation}
            className="px-8 py-3 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition font-semibold"
          >
            Browse Jobs
          </button>
        </div>
      </header>

  
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="mt-2 text-gray-600">Active Job Listings</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-3xl font-bold text-blue-600">5K+</h3>
            <p className="mt-2 text-gray-600">Employers</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
            <p className="mt-2 text-gray-600">Job Seekers</p>
          </div>
        </div>
      </section>

  
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Explore Job Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["IT & Software", "Marketing", "Finance", "Design"].map(
            (category) => (
              <button
                key={category}
                onClick={handleNavigation}
                className="p-6 bg-white rounded-lg shadow hover:bg-blue-50 hover:shadow-md transition font-medium cursor-pointer"
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-gray-400 text-center">
        © {new Date().getFullYear()} NextHire. All rights reserved.
      </footer>
    </div>
  );
}
