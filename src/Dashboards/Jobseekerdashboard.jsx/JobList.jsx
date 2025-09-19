// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ApiUrl } from "../../App";
// import { useNavigate } from "react-router-dom";
// import { toast, Toaster } from "react-hot-toast";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const fetchJobsAndApplications = async () => {
//     setLoading(true);
//     try {
//       const jobsRes = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const allJobs = jobsRes.data?.data || [];

//       const appsRes = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const myApps = appsRes.data?.data || [];

//       const jobsWithStatus = allJobs.map((job) => ({
//         ...job,
//         alreadyApplied: myApps.some((app) => app.job?._id === job._id),
//       }));

//       setJobs(jobsWithStatus);
//     } catch (err) {
//       console.error("Error fetching jobs:", err.response?.data || err.message);
//       toast.error("Failed to fetch jobs.");
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   useEffect(() => {
//     fetchJobsAndApplications();
//   }, [token]);

  
//   useEffect(() => {
//     const handleStorageChange = () => {
//       if (localStorage.getItem("jobApplied") === "true") {
//         fetchJobsAndApplications();
//         localStorage.removeItem("jobApplied"); 
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   if (loading)
//     return (
//       <p className="min-h-screen bg-indigo-50 flex items-center justify-center">
//         Loading jobs...
//       </p>
//     );

//   if (jobs.length === 0)
//     return <p className="text-center mt-10 text-gray-600">No jobs available</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 py-10 mt-20">
//       <Toaster position="top-right" />
//       <div className="max-w-5xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">JOBS</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <h3 className="text-xl font-semibold text-indigo-800 mb-2">{job.Title}</h3>
//               <p className="text-gray-700 mb-2">{job.description}</p>
//               <p className="text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
//               <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
//               <p className="text-gray-600 mb-3"><strong>Salary:</strong> {job.salary}</p>

//               {job.alreadyApplied ? (
//                 <button
//                   disabled
//                   className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
//                 >
//                   ✅ Already Applied
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate(`/jobs/${job._id}`)}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
//                 >
//                    View
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FiChevronLeft, FiChevronRight, FiBriefcase, FiMapPin, FiDollarSign, FiClock } from "react-icons/fi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Number of jobs to show per slide on desktop
  const jobsPerPage = 3;

  const fetchJobsAndApplications = async () => {
    setLoading(true);
    try {
      const jobsRes = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allJobs = jobsRes.data?.data || [];

      const appsRes = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myApps = appsRes.data?.data || [];

      const jobsWithStatus = allJobs.map((job) => ({
        ...job,
        alreadyApplied: myApps.some((app) => app.job?._id === job._id),
      }));

      setJobs(jobsWithStatus);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsAndApplications();
  }, [token]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("jobApplied") === "true") {
        fetchJobsAndApplications();
        localStorage.removeItem("jobApplied");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Carousel navigation functions for desktop
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + jobsPerPage >= jobs.length ? 0 : prevIndex + jobsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - jobsPerPage < 0 ? Math.max(0, jobs.length - jobsPerPage) : prevIndex - jobsPerPage
    );
  };

  // Get current jobs to display for desktop carousel
  const currentJobs = jobs.slice(currentIndex, currentIndex + jobsPerPage);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-indigo-800">Loading opportunities...</p>
        </div>
      </div>
    );

  if (jobs.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <FiBriefcase className="mx-auto text-5xl text-indigo-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Available</h3>
          <p className="text-gray-600">Check back later for new opportunities.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 mt-20">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">Career Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your next professional adventure with our curated job listings
          </p>
        </div>

        {/* Mobile View - Standard Grid */}
        <div className="block md:hidden">
          <div className="grid gap-6 mb-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} navigate={navigate} />
            ))}
          </div>
        </div>

        {/* Desktop View - Carousel */}
        <div className="hidden md:block relative bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Navigation Arrows */}
          {jobs.length > jobsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-indigo-50 transition-colors duration-200"
                aria-label="Previous jobs"
              >
                <FiChevronLeft className="text-indigo-700 text-xl" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-indigo-50 transition-colors duration-200"
                aria-label="Next jobs"
              >
                <FiChevronRight className="text-indigo-700 text-xl" />
              </button>
            </>
          )}

          {/* Jobs Grid */}
          <div className="grid grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <JobCard key={job._id} job={job} navigate={navigate} />
            ))}
          </div>

          {/* Carousel Indicators */}
          {jobs.length > jobsPerPage && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * jobsPerPage)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    currentIndex === index * jobsPerPage ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// Extracted Job Card Component for reusability
const JobCard = ({ job, navigate }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-indigo-900 pr-2">{job.Title}</h3>
          {job.alreadyApplied && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <FiClock className="mr-1" /> Applied
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <FiBriefcase className="text-indigo-500 mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiMapPin className="text-indigo-500 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiDollarSign className="text-indigo-500 mr-2" />
            <span>{job.salary}</span>
          </div>
        </div>
      </div>

      {job.alreadyApplied ? (
        <button
          disabled
          className="w-full py-3 bg-green-100 text-green-700 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
        >
          ✅ Application Submitted
        </button>
      ) : (
        <button
          onClick={() => navigate(`/jobs/${job._id}`)}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default JobList;