import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../App";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  if (loading)
    return <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading jobs...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-10 mt-18">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center"> Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available</p>
        ) : (
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
                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
