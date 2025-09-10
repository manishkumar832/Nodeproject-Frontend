import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ApiUrl } from "../../App";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

 
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const myJobs = res.data.data.filter(
        (job) =>
          job.postedBy === user._id || job.postedBy?._id === user._id
      );

      setJobs(myJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

 
  const handleUpdate = async () => {
    if (!editJob) return;
    try {
      setSaving(true);
      const res = await axios.put(
        `${ApiUrl}/Employee/updatejob/${editJob._id}`,
        editJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Job updated ✅");
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error(err?.response?.data?.message || "Failed to update ❌");
    } finally {
      setSaving(false);
    }
  };

  
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await axios.delete(
        `${ApiUrl}/Employee/deletejob/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Job deleted ✅");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error(err?.response?.data?.message || "Failed to delete ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Manage Your Jobs
      </h1>

      {loading ? (
       
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6 mt-20">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-600">
              You haven't posted any jobs yet.
            </p>
          ) : (
            jobs.map((job) =>
              editJob?._id === job._id ? (
              
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                    Edit Job
                  </h2>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editJob.Title}
                      onChange={(e) =>
                        setEditJob({ ...editJob, Title: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <textarea
                      value={editJob.description}
                      onChange={(e) =>
                        setEditJob({ ...editJob, description: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="text"
                      value={editJob.company}
                      onChange={(e) =>
                        setEditJob({ ...editJob, company: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="text"
                      value={editJob.location}
                      onChange={(e) =>
                        setEditJob({ ...editJob, location: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="text"
                      value={editJob.salary}
                      onChange={(e) =>
                        setEditJob({ ...editJob, salary: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="text"
                      value={editJob.role}
                      onChange={(e) =>
                        setEditJob({ ...editJob, role: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      onClick={handleUpdate}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                      onClick={() => setEditJob(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
              
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.Title}
                  </h2>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                  <p className="text-gray-500 mt-2">
                    <span className="font-semibold">Company:</span>{" "}
                    {job.company}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Salary:</span>{" "}
                    {job.salary}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Role:</span> {job.role}
                  </p>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => setEditJob(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
