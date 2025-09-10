import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EmployeeApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const jobsRes = await axios.get(
        "https://nodeproject-s6y6.onrender.com/Employee/AlljobsPosted?mine=true",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const jobIds = jobsRes.data.data.map((job) => job._id);
      const jobsMap = {};
      jobsRes.data.data.forEach((job) => {
        jobsMap[job._id] = job.Title;
      });

      let allApps = [];
      for (let jobId of jobIds) {
        const res = await axios.get(
          `https://nodeproject-s6y6.onrender.com/Employee/application/${jobId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const apps = Array.isArray(res.data?.data) ? res.data.data : res.data;

        const appsWithTitle = apps.map((app) => ({
          ...app,
          jobTitle: jobsMap[app.job] || "Unknown Job",
        }));

        allApps = [...allApps, ...appsWithTitle];
      }

      const uniqueApps = Array.from(
        new Map(allApps.map((app) => [app._id, app])).values()
      );

      setApplications(uniqueApps);
    } catch (err) {
      console.error(
        "Error fetching applications:",
        err.response?.data || err.message
      );
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    if (!["applied", "shortlisted", "accepted", "rejected"].includes(status)) {
      console.error("Invalid status:", status);
      return;
    }

    try {
      await axios.put(
        `https://nodeproject-s6y6.onrender.com/Employee/application/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Application ${status} successfully!`);
      fetchApplications();
    } catch (err) {
      console.error(
        "Error updating status:",
        err.response?.data || err.message
      );
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading applications...</p>;

  return (
    <div className="min-h-screen bg-indigo-50 p-6 mt-20">
      
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Applications for Your Jobs
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-indigo-800">{app.name}</h3>
            <p>
              <strong>Email:</strong> {app.email}
            </p>
            <p>
              <strong>Phone:</strong> {app.phone}
            </p>
            <p>
              <strong>Skills:</strong> {app.skills}
            </p>
            <p>
              <strong>Education:</strong> {app.education}
            </p>
            <p>
              <strong>Job Title:</strong> {app.jobTitle}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-medium ${
                  app.status === "applied"
                    ? "text-gray-700"
                    : app.status === "shortlisted"
                    ? "text-yellow-600"
                    : app.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {app.status}
              </span>
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => updateStatus(app._id, "shortlisted")}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Shortlist
              </button>
              <button
                onClick={() => updateStatus(app._id, "accepted")}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeApplications;
