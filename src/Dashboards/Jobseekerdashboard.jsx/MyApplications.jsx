import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../App";
import { Toaster, toast } from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data.data);
      } catch (err) {
        console.error("Error fetching applications:", err.response?.data || err.message);
        toast.error("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await axios.delete(`${ApiUrl}/jobSeeker/myApplications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(applications.filter((app) => app._id !== id));
      toast.success("Application deleted successfully!");
    } catch (err) {
      console.error("Error deleting application:", err.response?.data || err.message);
      toast.error("Failed to delete application.");
    }
  };

  if (loading) return <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading applications...</p>;
  if (applications.length === 0)
    return <p className="text-center mt-30 text-gray-600">No applications found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 mt-10 py-10">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center"> Applications</h2>
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="mb-1"><strong>Job:</strong> {app.job?.Title || "N/A"}</p>
              <p className="mb-1"><strong>Status:</strong> {app.status || "Pending"}</p>
              <p className="mb-3"><strong>Applicant Name:</strong> {app.name}</p>
              <button
                onClick={() => handleDelete(app._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Delete Application
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyApplications;
