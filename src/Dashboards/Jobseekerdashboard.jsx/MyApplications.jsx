// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ApiUrl } from "../../App";
// import { Toaster, toast } from "react-hot-toast";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setApplications(res.data.data);
//       } catch (err) {
//         console.error("Error fetching applications:", err.response?.data || err.message);
//         toast.error("Failed to fetch applications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [token]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this application?")) return;

//     try {
//       await axios.delete(`${ApiUrl}/jobSeeker/myApplications/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(applications.filter((app) => app._id !== id));
//       toast.success("Application deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting application:", err.response?.data || err.message);
//       toast.error("Failed to delete application.");
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "applied":
//         return "text-blue-500 font-semibold";
//       case "shortlisted":
//         return "text-yellow-500 font-semibold";
//       case "accepted":
//         return "text-green-600 font-semibold";
//       case "rejected":
//         return "text-red-600 font-semibold";
//       default:
//         return "text-gray-500 font-semibold";
//     }
//   };

//   if (loading)
//     return (
//       <p className="min-h-screen bg-indigo-50 flex items-center justify-center">
//         Loading applications...
//       </p>
//     );

//   if (applications.length === 0)
//     return <p className="text-center mt-30 text-gray-600">No applications found.</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 mt-10 py-10">
//       <Toaster position="top-right" />
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">My Applications</h2>
//         <ul className="space-y-4">
//           {applications.map((app) => (
//             <li
//               key={app._id}
//               className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <p className="mb-1"><strong>Job:</strong> {app.job?.Title || "N/A"}</p>
//               <p className="mb-1">
//                 <strong>Status:</strong>{" "}
//                 <span className={getStatusStyle(app.status)}>
//                   {app.status || "Pending"}
//                 </span>
//               </p>
//               <p className="mb-1">
//                 <strong>Applied On:</strong>{" "}
//                 {app.appliedOn ? new Date(app.appliedOn).toLocaleDateString() : "N/A"}
//               </p>
//               <p className="mb-3"><strong>Applicant Name:</strong> {app.name}</p>

//               <button
//                 onClick={() => handleDelete(app._id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
//               >
//                 Delete Application
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MyApplications;


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

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "applied":
        return "📋";
      case "shortlisted":
        return "⭐";
      case "accepted":
        return "✅";
      case "rejected":
        return "❌";
      default:
        return "⏳";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 flex items-center justify-center ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );

  if (applications.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-4">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No applications yet</h3>
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8 mt-18">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Applications</h1>
          <p className="text-gray-600">Track your job applications and their status</p>
        </div>
        
        <div className="grid gap-5">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{app.job?.Title || "Untitled Position"}</h3>
                    
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                      <span className={`inline-flex items-center py-1 px-3 rounded-full text-sm font-medium ${getStatusStyle(app.status)}`}>
                        <span className="mr-1">{getStatusIcon(app.status)}</span>
                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                      </span>
                      
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Applied: {app.appliedOn ? new Date(app.appliedOn).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 mb-4">
                      <p><span className="font-medium">Applicant:</span> {app.name}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="flex items-center justify-center px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 shadow-sm"
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;