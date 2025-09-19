// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ApiUrl } from "../../App";

// export default function JobseekerDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({ name: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

  
//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJobs(res.data.data || []);
//       } catch (error) {
//         console.error("Error fetching jobs:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 pt-24 px-6 md:px-16 mt-5">
      
//       <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-10 rounded-3xl shadow-lg mb-10">
//         <h1 className="text-3xl md:text-4xl font-extrabold">
//           Hello, {user.name || "Jobseeker"} 👋
//         </h1>
//         <p className="mt-3 text-lg text-indigo-100">
//           Explore available jobs and apply to the ones that match your skills.
//         </p>
//       </div>

      
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Available Jobs
//         </h2>

//         {loading ? (
//           <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading jobs...</p>
//         ) : jobs.length === 0 ? (
//           <div className="bg-white border border-gray-200 shadow rounded-2xl p-10 text-center">
//             <p className="text-gray-600 text-lg">
//               No jobs available at the moment. Check back soon.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 onClick={() => navigate("/jobs")}
//                 className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200"
//               >
//                 <h3 className="text-lg font-bold text-gray-900">{job.Title}</h3>
//                 <p className="text-sm text-gray-500">{job.company}</p>
//                 <p className="mt-2 text-gray-700">{job.location}</p>
//                 <p className="text-sm text-gray-600">{job.role}</p>
//                 <p className="mt-2 text-indigo-600 font-semibold">{job.salary}</p>
//                 <p className="mt-3 text-sm text-gray-500 line-clamp-3">
//                   {job.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobseekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "" });
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Mock data for demonstration - only 3 jobs
        setTimeout(() => {
          setJobs([
            {
              _id: "1",
              Title: "Frontend Developer",
              company: "Tech Solutions Inc.",
              location: "San Francisco, CA",
              role: "Full-time",
              salary: "$90,000 - $120,000",
              description: "We are looking for a skilled Frontend Developer with experience in React to join our growing team."
            },
            {
              _id: "2",
              Title: "UX Designer",
              company: "Creative Labs",
              location: "Remote",
              role: "Contract",
              salary: "$70,000 - $90,000",
              description: "Join our design team to create beautiful and functional user experiences for our clients."
            },
            {
              _id: "3",
              Title: "Data Analyst",
              company: "Data Insights Co.",
              location: "New York, NY",
              role: "Full-time",
              salary: "$85,000 - $110,000",
              description: "Analyze complex data sets and provide actionable insights to drive business decisions."
            }
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pt-24 px-4 md:px-8 lg:px-16">
      {/* Header Section with gradient background and white text */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-100 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user.name || "Jobseeker"}!
              </h1>
              <p className="mt-2 text-indigo-100">
                Discover opportunities that match your skills and aspirations.
              </p>
            </div>
            {/* <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 text-black rounded-full text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
               Profile
              </span>
            </div> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Available Jobs</h3>
                <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Applications</h3>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Companies</h3>
                <p className="text-2xl font-semibold text-gray-900">{new Set(jobs.map(job => job.company)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Available Job Positions</h2>
            <button 
              onClick={() => navigate("/jobs")}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            >
              View all jobs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs available</h3>
              <p className="mt-2 text-gray-500">There are no job postings at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {jobs.slice(0, 3).map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate("/jobs")}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.Title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {job.role}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    
                    <p className="mt-4 text-gray-700 line-clamp-3 text-sm">
                      {job.description}
                    </p>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-base font-semibold text-indigo-600">{job.salary}</span>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}