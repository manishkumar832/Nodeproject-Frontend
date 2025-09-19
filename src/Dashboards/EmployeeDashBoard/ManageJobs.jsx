// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { ApiUrl } from "../../App";

// // export default function ManageJobs() {
// //   const [jobs, setJobs] = useState([]);
// //   const [editJob, setEditJob] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   const token = localStorage.getItem("token");
// //   const user = JSON.parse(localStorage.getItem("user"));

 
// //   const fetchJobs = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

      
// //       const myJobs = res.data.data.filter(
// //         (job) =>
// //           job.postedBy === user._id || job.postedBy?._id === user._id
// //       );

// //       setJobs(myJobs);
// //     } catch (error) {
// //       console.error("Error fetching jobs:", error);
// //       toast.error("Failed to load jobs ❌");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);

 
// //   const handleUpdate = async () => {
// //     if (!editJob) return;
// //     try {
// //       setSaving(true);
// //       const res = await axios.put(
// //         `${ApiUrl}/Employee/updatejob/${editJob._id}`,
// //         editJob,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       toast.success(res.data.message || "Job updated ✅");
// //       setEditJob(null);
// //       fetchJobs();
// //     } catch (err) {
// //       console.error("Error updating job:", err);
// //       toast.error(err?.response?.data?.message || "Failed to update ❌");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

  
// //   const handleDelete = async (jobId) => {
// //     if (!window.confirm("Are you sure you want to delete this job?")) return;

// //     try {
// //       const res = await axios.delete(
// //         `${ApiUrl}/Employee/deletejob/${jobId}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       toast.success(res.data.message || "Job deleted ✅");
// //       fetchJobs();
// //     } catch (err) {
// //       console.error("Error deleting job:", err);
// //       toast.error(err?.response?.data?.message || "Failed to delete ❌");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-12 px-6">
// //       <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
// //         Manage Your Jobs
// //       </h1>

// //       {loading ? (
       
// //         <div className="flex justify-center items-center min-h-[50vh]">
// //           <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
// //         </div>
// //       ) : (
// //         <div className="max-w-4xl mx-auto grid gap-6 mt-20">
// //           {jobs.length === 0 ? (
// //             <p className="text-center text-gray-600">
// //               You haven't posted any jobs yet.
// //             </p>
// //           ) : (
// //             jobs.map((job) =>
// //               editJob?._id === job._id ? (
              
// //                 <div
// //                   key={job._id}
// //                   className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
// //                 >
// //                   <h2 className="text-xl font-semibold text-indigo-700 mb-4">
// //                     Edit Job
// //                   </h2>

// //                   <div className="space-y-3">
// //                     <input
// //                       type="text"
// //                       value={editJob.Title}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, Title: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                     <textarea
// //                       value={editJob.description}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, description: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                     <input
// //                       type="text"
// //                       value={editJob.company}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, company: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                     <input
// //                       type="text"
// //                       value={editJob.location}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, location: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                     <input
// //                       type="text"
// //                       value={editJob.salary}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, salary: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                     <input
// //                       type="text"
// //                       value={editJob.role}
// //                       onChange={(e) =>
// //                         setEditJob({ ...editJob, role: e.target.value })
// //                       }
// //                       className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //                     />
// //                   </div>

// //                   <div className="flex justify-end gap-3 mt-4">
// //                     <button
// //                       className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
// //                       onClick={handleUpdate}
// //                       disabled={saving}
// //                     >
// //                       {saving ? "Saving..." : "Save"}
// //                     </button>
// //                     <button
// //                       className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
// //                       onClick={() => setEditJob(null)}
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </div>
// //               ) : (
              
// //                 <div
// //                   key={job._id}
// //                   className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
// //                 >
// //                   <h2 className="text-xl font-semibold text-gray-800">
// //                     {job.Title}
// //                   </h2>
// //                   <p className="text-gray-700 mt-2">{job.description}</p>
// //                   <p className="text-gray-500 mt-2">
// //                     <span className="font-semibold">Company:</span>{" "}
// //                     {job.company}
// //                   </p>
// //                   <p className="text-gray-500">
// //                     <span className="font-semibold">Location:</span>{" "}
// //                     {job.location}
// //                   </p>
// //                   <p className="text-gray-500">
// //                     <span className="font-semibold">Salary:</span>{" "}
// //                     {job.salary}
// //                   </p>
// //                   <p className="text-gray-500">
// //                     <span className="font-semibold">Role:</span> {job.role}
// //                   </p>

// //                   <div className="flex justify-end gap-3 mt-4">
// //                     <button
// //                       className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
// //                       onClick={() => setEditJob(job)}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
// //                       onClick={() => handleDelete(job._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               )
// //             )
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Toaster } from "react-hot-toast"; // Import Toaster component
// import { ApiUrl } from "../../App";

// export default function ManageJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [editJob, setEditJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const myJobs = res.data.data.filter(
//         (job) =>
//           job.postedBy === user._id || job.postedBy?._id === user._id
//       );

//       setJobs(myJobs);
//       toast.success("Jobs loaded successfully! ✅", {
//         icon: "👏",
//         style: {
//           borderRadius: "10px",
//           background: "#fff",
//           color: "#050505ff",
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       toast.error("Failed to load jobs ❌", {
//         style: {
//           borderRadius: "10px",
//           background: "#fff",
//           color: "",
//         },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleUpdate = async () => {
//     if (!editJob) return;
    
//     // Validation
//     if (!editJob.Title || !editJob.description || !editJob.company || 
//         !editJob.location || !editJob.salary || !editJob.role) {
//       toast.error("Please fill all fields ❌", {
//         style: {
//           borderRadius: "10px",
//           background: "#ef4444",
//           color: "#0d0d0dff",
//         },
//       });
//       return;
//     }
    
//     try {
//       setSaving(true);
//       const res = await axios.put(
//         `${ApiUrl}/Employee/updatejob/${editJob._id}`,
//         editJob,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message || "Job updated successfully! ✅", {
//         icon: "🎉",
//         style: {
//           borderRadius: "10px",
//           background: "#10b981",
//           color: "#fff",
//         },
//       });
//       setEditJob(null);
//       fetchJobs();
//     } catch (err) {
//       console.error("Error updating job:", err);
//       toast.error(err?.response?.data?.message || "Failed to update job ❌", {
//         style: {
//           borderRadius: "10px",
//           background: "#ef4444",
//           color: "#fff",
//         },
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (jobId) => {
//     if (!window.confirm("Are you sure you want to delete this job?")) return;

//     try {
//       const res = await axios.delete(
//         `${ApiUrl}/Employee/deletejob/${jobId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message || "Job deleted successfully! ✅", {
//         icon: "🗑️",
//         style: {
//           borderRadius: "10px",
//           background: "#fff",
//           color: "#111111ff",
//         },
//       });
//       fetchJobs();
//     } catch (err) {
//       console.error("Error deleting job:", err);
//       toast.error(err?.response?.data?.message || "Failed to delete job ❌", {
//         style: {
//           borderRadius: "10px",
//           background: "#ef4444",
//           color: "#fff",
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
//       {/* Add Toaster component here */}
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000, // Increased duration to 3 seconds for better visibility
//           style: {
//             borderRadius: "10px",
//             background: "#363636",
//             color: "#fff",
//           },
//           success: {
//             duration: 3000,
//             style: {
//               background: "#fff",
//             },
//           },
//           error: {
//             duration: 4000,
//             style: {
//               background: "#fff",
//             },
//           },
//         }}
//       />
      
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
//           Manage Your Job Postings
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center min-h-[50vh]">
//             <div className="text-center">
//               <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//               <p className="mt-4 text-indigo-700 font-medium">Loading your jobs...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {jobs.length === 0 ? (
//               <div className="bg-white p-8 rounded-xl shadow-md text-center">
//                 <svg className="w-16 h-16 text-indigo-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                 </svg>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs posted yet</h3>
//                 <p className="text-gray-500">You haven't posted any jobs yet. Create your first job posting to get started.</p>
//               </div>
//             ) : (
//               jobs.map((job) =>
//                 editJob?._id === job._id ? (
//                   <div
//                     key={job._id}
//                     className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
//                   >
//                     <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
//                       </svg>
//                       Edit Job
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
//                         <input
//                           type="text"
//                           value={editJob.Title}
//                           onChange={(e) =>
//                             setEditJob({ ...editJob, Title: e.target.value })
//                           }
//                           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                           placeholder="e.g. Software Engineer"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                         <input
//                           type="text"
//                           value={editJob.company}
//                           onChange={(e) =>
//                             setEditJob({ ...editJob, company: e.target.value })
//                           }
//                           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                           placeholder="Company name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                         <input
//                           type="text"
//                           value={editJob.location}
//                           onChange={(e) =>
//                             setEditJob({ ...editJob, location: e.target.value })
//                           }
//                           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                           placeholder="e.g. Remote, New York, etc."
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
//                         <input
//                           type="text"
//                           value={editJob.salary}
//                           onChange={(e) =>
//                             setEditJob({ ...editJob, salary: e.target.value })
//                           }
//                           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                           placeholder="e.g. $80,000 - $100,000"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Role Type</label>
//                         <input
//                           type="text"
//                           value={editJob.role}
//                           onChange={(e) =>
//                             setEditJob({ ...editJob, role: e.target.value })
//                           }
//                           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                           placeholder="e.g. Full-time, Part-time, Contract"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
//                       <textarea
//                         value={editJob.description}
//                         onChange={(e) =>
//                           setEditJob({ ...editJob, description: e.target.value })
//                         }
//                         rows="4"
//                         className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         placeholder="Describe the job responsibilities, requirements, etc."
//                       />
//                     </div>

//                     <div className="flex justify-end gap-3 mt-6">
//                       <button
//                         className="bg-gray-400 text-white px-5 py-2.5 rounded-lg hover:bg-gray-500 transition flex items-center"
//                         onClick={() => setEditJob(null)}
//                       >
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
//                         </svg>
//                         Cancel
//                       </button>
//                       <button
//                         className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
//                         onClick={handleUpdate}
//                         disabled={saving}
//                       >
//                         {saving ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                             </svg>
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     key={job._id}
//                     className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h2 className="text-xl font-semibold text-gray-800">{job.Title}</h2>
//                         <p className="text-indigo-600 font-medium">{job.company}</p>
//                       </div>
//                       <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                         {job.role}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-700 mt-4">{job.description}</p>
                    
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
//                       <div className="flex items-center text-gray-600">
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                         </svg>
//                         {job.location}
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
//                         </svg>
//                         {job.salary}
//                       </div>
//                     </div>

//                     <div className="flex justify-end gap-3 mt-6">
//                       <button
//                         className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition flex items-center"
//                         onClick={() => setEditJob(job)}
//                       >
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
//                         </svg>
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition flex items-center"
//                         onClick={() => handleDelete(job._id)}
//                       >
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
//                         </svg>
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
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
      // Removed the success toast notification here
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs ❌", {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleUpdate = async () => {
    if (!editJob) return;
    
    // Validation
    if (!editJob.Title || !editJob.description || !editJob.company || 
        !editJob.location || !editJob.salary || !editJob.role) {
      toast.error("Please fill all fields ❌", {
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#0d0d0dff",
        },
      });
      return;
    }
    
    try {
      setSaving(true);
      const res = await axios.put(
        `${ApiUrl}/Employee/updatejob/${editJob._id}`,
        editJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Job updated successfully! ✅", {
        icon: "🎉",
        style: {
          borderRadius: "10px",
          background: "#10b981",
          color: "#fff",
        },
      });
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error(err?.response?.data?.message || "Failed to update job ❌", {
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
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

      toast.success(res.data.message || "Job deleted successfully! ✅", {
        icon: "🗑️",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#111111ff",
        },
      });
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error(err?.response?.data?.message || "Failed to delete job ❌", {
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#fff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#fff",
            },
          },
        }}
      />
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Manage Your Job Postings
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-indigo-700 font-medium">Loading your jobs...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <svg className="w-16 h-16 text-indigo-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs posted yet</h3>
                <p className="text-gray-500">You haven't posted any jobs yet. Create your first job posting to get started.</p>
              </div>
            ) : (
              jobs.map((job) =>
                editJob?._id === job._id ? (
                  <div
                    key={job._id}
                    className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
                  >
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                      Edit Job
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={editJob.Title}
                          onChange={(e) =>
                            setEditJob({ ...editJob, Title: e.target.value })
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="e.g. Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={editJob.company}
                          onChange={(e) =>
                            setEditJob({ ...editJob, company: e.target.value })
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={editJob.location}
                          onChange={(e) =>
                            setEditJob({ ...editJob, location: e.target.value })
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="e.g. Remote, New York, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <input
                          type="text"
                          value={editJob.salary}
                          onChange={(e) =>
                            setEditJob({ ...editJob, salary: e.target.value })
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="e.g. $80,000 - $100,000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role Type</label>
                        <input
                          type="text"
                          value={editJob.role}
                          onChange={(e) =>
                            setEditJob({ ...editJob, role: e.target.value })
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="e.g. Full-time, Part-time, Contract"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea
                        value={editJob.description}
                        onChange={(e) =>
                          setEditJob({ ...editJob, description: e.target.value })
                        }
                        rows="4"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Describe the job responsibilities, requirements, etc."
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        className="bg-gray-400 text-white px-5 py-2.5 rounded-lg hover:bg-gray-500 transition flex items-center"
                        onClick={() => setEditJob(null)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        Cancel
                      </button>
                      <button
                        className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition flex items-center disabled:opacity-50"
                        onClick={handleUpdate}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={job._id}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{job.Title}</h2>
                        <p className="text-indigo-600 font-medium">{job.company}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {job.role}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mt-4">{job.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                        </svg>
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition flex items-center"
                        onClick={() => setEditJob(job)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition flex items-center"
                        onClick={() => handleDelete(job._id)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
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
    </div>
  );
}