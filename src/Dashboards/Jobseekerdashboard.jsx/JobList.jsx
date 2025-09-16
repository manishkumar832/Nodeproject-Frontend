import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchJobsAndApplications = async () => {
    setLoading(true);
    try {
      const jobsRes = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allJobs = jobsRes.data?.data || [];

      const appsRes = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myApps = appsRes.data?.data || [];

      const jobsWithStatus = allJobs.map((job) => ({
        ...job,
        alreadyApplied: myApps.some((app) => app.job?._id === job._id),
      }));

      setJobs(jobsWithStatus);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchJobsAndApplications();
  }, [token]);

  // Listen to localStorage changes for live updates
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("jobApplied") === "true") {
        fetchJobsAndApplications();
        localStorage.removeItem("jobApplied"); // reset
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading)
    return (
      <p className="min-h-screen bg-indigo-50 flex items-center justify-center">
        Loading jobs...
      </p>
    );

  if (jobs.length === 0)
    return <p className="text-center mt-10 text-gray-600">No jobs available</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-10 mt-20">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">JOBS</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">{job.Title}</h3>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600 mb-3"><strong>Salary:</strong> {job.salary}</p>

              {job.alreadyApplied ? (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                >
                  ✅ Already Applied
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                >
                   View
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
