// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const EmployeeApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);

//       const jobsRes = await axios.get(
//         "https://nodeproject-s6y6.onrender.com/Employee/AlljobsPosted?mine=true",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const jobIds = jobsRes.data.data.map((job) => job._id);
//       const jobsMap = {};
//       jobsRes.data.data.forEach((job) => {
//         jobsMap[job._id] = job.Title;
//       });

//       let allApps = [];
//       for (let jobId of jobIds) {
//         const res = await axios.get(
//           `https://nodeproject-s6y6.onrender.com/Employee/application/${jobId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const apps = Array.isArray(res.data?.data) ? res.data.data : res.data;

//         const appsWithTitle = apps.map((app) => ({
//           ...app,
//           jobTitle: jobsMap[app.job] || "Unknown Job",
//         }));

//         allApps = [...allApps, ...appsWithTitle];
//       }

//       const uniqueApps = Array.from(
//         new Map(allApps.map((app) => [app._id, app])).values()
//       );

//       setApplications(uniqueApps);
//     } catch (err) {
//       console.error(
//         "Error fetching applications:",
//         err.response?.data || err.message
//       );
//       toast.error("Failed to fetch applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (applicationId, status) => {
//     if (!["applied", "shortlisted", "accepted", "rejected"].includes(status)) {
//       console.error("Invalid status:", status);
//       return;
//     }

//     try {
//       await axios.put(
//         `https://nodeproject-s6y6.onrender.com/Employee/application/${applicationId}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success(`Application ${status} successfully!`);
//       fetchApplications();
//     } catch (err) {
//       console.error(
//         "Error updating status:",
//         err.response?.data || err.message
//       );
//       toast.error("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   if (loading) return <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading applications...</p>;

//   return (
//     <div className="min-h-screen bg-indigo-50 p-6 mt-20">
      
//       <Toaster position="top-right" reverseOrder={false} />

//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         All Applications for Your Jobs
//       </h2>

//       {applications.length === 0 ? (
//         <p className="text-gray-600">No applications yet.</p>
//       ) : (
//         applications.map((app) => (
//           <div
//             key={app._id}
//             className="bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200"
//           >
//             <h3 className="text-lg font-semibold text-indigo-800">{app.name}</h3>
//             <p>
//               <strong>Email:</strong> {app.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {app.phone}
//             </p>
//             <p>
//               <strong>Skills:</strong> {app.skills}
//             </p>
//             <p>
//               <strong>Education:</strong> {app.education}
//             </p>
//             <p>
//               <strong>Job Title:</strong> {app.jobTitle}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`font-medium ${
//                   app.status === "applied"
//                     ? "text-gray-700"
//                     : app.status === "shortlisted"
//                     ? "text-yellow-600"
//                     : app.status === "accepted"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {app.status}
//               </span>
//             </p>

//             <div className="mt-4 flex gap-3">
//               <button
//                 onClick={() => updateStatus(app._id, "shortlisted")}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
//               >
//                 Shortlist
//               </button>
//               <button
//                 onClick={() => updateStatus(app._id, "accepted")}
//                 className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => updateStatus(app._id, "rejected")}
//                 className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EmployeeApplications;


import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EmployeeApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
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
          applicationDate: app.createdAt ? new Date(app.createdAt) : new Date()
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

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => filterStatus === "all" || app.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "newest") return b.applicationDate - a.applicationDate;
      if (sortBy === "oldest") return a.applicationDate - b.applicationDate;
      return 0;
    });

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-3"></div>
        <p className="text-gray-600">Loading applications...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-indigo-50 p-6 mt-20">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-2">Manage all applications for your posted jobs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-400">
            <h3 className="text-sm font-medium text-gray-600">Total Applications</h3>
            <p className="text-2xl font-bold mt-1">{applications.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
            <h3 className="text-sm font-medium text-gray-600">Shortlisted</h3>
            <p className="text-2xl font-bold mt-1">{getStatusCount("shortlisted")}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600">Accepted</h3>
            <p className="text-2xl font-bold mt-1">{getStatusCount("accepted")}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-600">Rejected</h3>
            <p className="text-2xl font-bold mt-1">{getStatusCount("rejected")}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex space-x-4 mb-3 md:mb-0">
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Applications</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          <button 
            onClick={fetchApplications}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-gray-500">There are no applications matching your current filters.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredApplications.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                          <p className="text-indigo-600 font-medium">{app.jobTitle}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${app.status === "applied" ? "bg-gray-100 text-gray-800" : ""}
                          ${app.status === "shortlisted" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${app.status === "accepted" ? "bg-green-100 text-green-800" : ""}
                          ${app.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                        `}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {app.email}</p>
                          <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Phone:</span> {app.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600"><span className="font-medium">Skills:</span> {app.skills}</p>
                          <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Education:</span> {app.education}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => updateStatus(app._id, "shortlisted")}
                      className="inline-flex items-center px-3 py-2 border border-yellow-500 text-sm font-medium rounded-md shadow-sm text-yellow-700 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "accepted")}
                      className="inline-flex items-center px-3 py-2 border border-green-500 text-sm font-medium rounded-md shadow-sm text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="inline-flex items-center px-3 py-2 border border-red-500 text-sm font-medium rounded-md shadow-sm text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeApplications;
