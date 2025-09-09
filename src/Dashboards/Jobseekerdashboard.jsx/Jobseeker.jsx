import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../App";

export default function JobseekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "" });
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 pt-24 px-6 md:px-16 mt-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-10 rounded-3xl shadow-lg mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Hello, {user.name || "Jobseeker"} 👋
        </h1>
        <p className="mt-3 text-lg text-indigo-100">
          Explore available jobs and apply to the ones that match your skills.
        </p>
      </div>

      {/* Jobs Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Available Jobs
        </h2>

        {loading ? (
          <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 shadow rounded-2xl p-10 text-center">
            <p className="text-gray-600 text-lg">
              No jobs available at the moment. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate("/jobs")}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200"
              >
                <h3 className="text-lg font-bold text-gray-900">{job.Title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="mt-2 text-gray-700">{job.location}</p>
                <p className="text-sm text-gray-600">{job.role}</p>
                <p className="mt-2 text-indigo-600 font-semibold">{job.salary}</p>
                <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
