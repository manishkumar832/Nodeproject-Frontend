import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { ApiUrl } from "../../App";
import toast from "react-hot-toast";

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [recentJob, setRecentJob] = useState(null);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchJobsAndApplications = async () => {
      try {
        setLoading(true);

        // Fetch all jobs posted by the employee
        const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myJobs = res.data.data.filter(
          (job) =>
            job.postedBy === storedUser._id ||
            job.postedBy?._id === storedUser._id
        );

        setJobs(myJobs);

        // Set the most recent job
        const sortedJobs = [...myJobs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentJob(sortedJobs[0] || null);

        // Fetch applications for all jobs
        let allApplications = [];

        for (let job of myJobs) {
          const appsRes = await axios.get(
            `${ApiUrl}/Employee/application/${job._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const apps = Array.isArray(appsRes.data)
            ? appsRes.data
            : appsRes.data.data || [];

          // Attach job info for each application
          allApplications.push(
            ...apps.map((a) => ({
              ...a,
              jobTitle: job.Title,
              createdAt: a.createdAt || job.createdAt,
            }))
          );
        }

        // Remove duplicate applications (if any) by _id
        const uniqueApplications = Array.from(
          new Set(allApplications.map((a) => a._id))
        ).map((id) => allApplications.find((a) => a._id === id));

        setApplicationsCount(uniqueApplications.length);

        // Most recent 3 applicants
        const sortedApplicants = uniqueApplications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentApplicants(sortedApplicants.slice(0, 3));
      } catch (err) {
        console.error(
          "Error fetching jobs/applications:",
          err.response?.data || err.message
        );
        toast.error("Failed to load dashboard data ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndApplications();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-6 mt-20">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome,{" "}
          <span className="text-indigo-600">{user?.name || "Employee"}</span> 👋
        </h1>
        <p className="text-gray-600 mt-1">Here’s your hiring overview.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaBriefcase className="text-indigo-600 text-3xl mb-2" />
          <h2 className="text-lg font-semibold text-gray-700">Jobs Posted</h2>
          <p className="text-gray-500 text-sm">
            {jobs.length > 0 ? `${jobs.length} job(s) posted` : "No jobs posted yet"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <VscFiles className="text-green-600 text-3xl mb-2" />
          <h2 className="text-lg font-semibold text-gray-700">Applications</h2>
          <p className="text-gray-500 text-sm mb-2">
            {applicationsCount > 0
              ? `${applicationsCount} total application(s)`
              : "No applications yet"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recently Posted Job
        </h2>
        {!recentJob ? (
          <p className="text-gray-500">No job posted recently.</p>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700">
              {recentJob.Title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {recentJob.company} • {recentJob.location}
            </p>
            <p className="text-sm text-gray-500 mt-1">{recentJob.role}</p>
            <p className="text-xs text-gray-400 mt-2">
              Posted on {new Date(recentJob.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
