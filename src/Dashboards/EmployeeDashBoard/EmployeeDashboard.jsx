// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBriefcase } from "react-icons/fa";
// import { VscFiles } from "react-icons/vsc";
// import { ApiUrl } from "../../App";
// import toast from "react-hot-toast";

// const EmployeeDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [recentJob, setRecentJob] = useState(null);
//   const [applicationsCount, setApplicationsCount] = useState(0);
//   const [recentApplicants, setRecentApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);

//     const fetchJobsAndApplications = async () => {
//       try {
//         setLoading(true);

        
//         const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const myJobs = res.data.data.filter(
//           (job) =>
//             job.postedBy === storedUser._id ||
//             job.postedBy?._id === storedUser._id
//         );

//         setJobs(myJobs);

//         const sortedJobs = [...myJobs].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setRecentJob(sortedJobs[0] || null);

       
//         let allApplications = [];

//         for (let job of myJobs) {
//           const appsRes = await axios.get(
//             `${ApiUrl}/Employee/application/${job._id}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           const apps = Array.isArray(appsRes.data)
//             ? appsRes.data
//             : appsRes.data.data || [];

//           allApplications.push(
//             ...apps.map((a) => ({
//               ...a,
//               jobTitle: job.Title,
//               createdAt: a.createdAt || job.createdAt,
//             }))
//           );
//         }

  
//         const uniqueApplications = Array.from(
//           new Set(allApplications.map((a) => a._id))
//         ).map((id) => allApplications.find((a) => a._id === id));

//         setApplicationsCount(uniqueApplications.length);

       
//         const sortedApplicants = uniqueApplications.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setRecentApplicants(sortedApplicants.slice(0, 3));
//       } catch (err) {
//         console.error(
//           "Error fetching jobs/applications:",
//           err.response?.data || err.message
//         );
//         toast.error("Failed to load dashboard data ❌");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobsAndApplications();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-6 mt-20">
//       <div className="max-w-4xl mx-auto mb-10">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome,{" "}
//           <span className="text-indigo-600">{user?.name || "Employee"}</span> 👋
//         </h1>
//         <p className="text-gray-600 mt-1">Here’s your hiring overview.</p>
//       </div>

//       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//           <FaBriefcase className="text-indigo-600 text-3xl mb-2" />
//           <h2 className="text-lg font-semibold text-gray-700">Jobs Posted</h2>
//           <p className="text-gray-500 text-sm">
//             {jobs.length > 0 ? `${jobs.length} job(s) posted` : "No jobs posted yet"}
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
//           <VscFiles className="text-green-600 text-3xl mb-2" />
//           <h2 className="text-lg font-semibold text-gray-700">Applications</h2>
//           <p className="text-gray-500 text-sm mb-2">
//             {applicationsCount > 0
//               ? `${applicationsCount} total application(s)`
//               : "No applications yet"}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto mt-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Recently Posted Job
//         </h2>
//         {!recentJob ? (
//           <p className="text-gray-500">No job posted recently.</p>
//         ) : (
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-indigo-700">
//               {recentJob.Title}
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">
//               {recentJob.company} • {recentJob.location}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">{recentJob.role}</p>
//             <p className="text-xs text-gray-400 mt-2">
//               Posted on {new Date(recentJob.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaUserTie, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { ApiUrl } from "../../App";
import { Toaster } from "react-hot-toast";

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

        const res = await axios.get(`${ApiUrl}/Employee/AlljobsPosted`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myJobs = res.data.data.filter(
          (job) =>
            job.postedBy === storedUser._id ||
            job.postedBy?._id === storedUser._id
        );

        setJobs(myJobs);

        const sortedJobs = [...myJobs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentJob(sortedJobs[0] || null);

        let allApplications = [];

        for (let job of myJobs) {
          const appsRes = await axios.get(
            `${ApiUrl}/Employee/application/${job._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const apps = Array.isArray(appsRes.data)
            ? appsRes.data
            : appsRes.data.data || [];

          allApplications.push(
            ...apps.map((a) => ({
              ...a,
              jobTitle: job.Title,
              createdAt: a.createdAt || job.createdAt,
            }))
          );
        }

        const uniqueApplications = Array.from(
          new Set(allApplications.map((a) => a._id))
        ).map((id) => allApplications.find((a) => a._id === id));

        setApplicationsCount(uniqueApplications.length);

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

  // Loading skeleton component
  const DashboardSkeleton = () => (
    <div className="min-h-screen bg-indigo-50 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse mb-10">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome,{" "}
          <span className="text-indigo-600">{user?.name || "Employee"}</span>
        </h1>
        <p className="text-gray-500 mt-2">Here's your hiring overview for today</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <FaBriefcase className="text-indigo-600 text-xl" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Total Jobs</h2>
          <p className="text-2xl font-bold text-gray-900 mt-2">{jobs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Jobs posted</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <VscFiles className="text-green-600 text-xl" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Applications</h2>
          <p className="text-2xl font-bold text-gray-900 mt-2">{applicationsCount}</p>
          <p className="text-xs text-gray-500 mt-1">Total applications</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaUserTie className="text-blue-600 text-xl" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Recent Applicants</h2>
          <p className="text-2xl font-bold text-gray-900 mt-2">{recentApplicants.length}</p>
          <p className="text-xs text-gray-500 mt-1">Last 3 applicants</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Fill Rate</h2>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {jobs.length > 0 ? Math.round((applicationsCount / jobs.length) * 10) / 10 : 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">Apps per job</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applicants Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Applicants</h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
              {recentApplicants.length} New
            </span>
          </div>
          
          {recentApplicants.length === 0 ? (
            <div className="text-center py-8">
              <FaUserTie className="text-gray-300 text-4xl mx-auto mb-3" />
              <p className="text-gray-500">No applicants yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentApplicants.map((applicant, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {applicant.name ? applicant.name.charAt(0).toUpperCase() : 'A'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {applicant.name || "Applicant"}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      Applied for {applicant.jobTitle}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {applicant.createdAt ? new Date(applicant.createdAt).toLocaleDateString() : "Recently"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Job Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Job Posted</h2>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          
          {!recentJob ? (
            <div className="text-center py-8">
              <FaBriefcase className="text-gray-300 text-4xl mx-auto mb-3" />
              <p className="text-gray-500">No job posted recently</p>
              <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Post a new job
              </button>
            </div>
          ) : (
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-200">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {recentJob.Title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="mr-3">{recentJob.company}</span>
                <span className="mx-1">•</span>
                <span>{recentJob.location}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{recentJob.role}</p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Posted on {new Date(recentJob.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                  Active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;