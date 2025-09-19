// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { ApiUrl } from "../../App";
// import { toast, Toaster } from "react-hot-toast";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const [error, setError] = useState(null);

//   // Application form state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [skills, setSkills] = useState("");
//   const [education, setEducation] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [coverLetterFile, setCoverLetterFile] = useState(null);

//   const token = localStorage.getItem("token");

//   // Fetch job details & applications
//   useEffect(() => {
//     if (!token) {
//       setError("You must be logged in to view this page.");
//       return;
//     }

//     const fetchJobAndApplications = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Fetch job
//         const jobRes = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const jobData = jobRes.data.data;
//         setJob(jobData);

//         // Fetch user's applications
//         const appsRes = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const apps = appsRes.data?.data || [];

//         // ✅ Check if already applied
//         const applied = apps.some((app) => app.job?._id === jobData._id);
//         setAlreadyApplied(applied);

//       } catch (err) {
//         console.error("Fetch error:", err);
//         if (!err.response) {
//           setError("Network error. Please check your connection.");
//         } else if (err.response.status === 401) {
//           setError("Session expired. Please login again.");
//           localStorage.removeItem("token");
//         } else {
//           setError(err.response.data?.message || "Something went wrong.");
//         }
//         toast.error(error || "Failed to fetch job details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobAndApplications();
//   }, [id, token]);

//   // Handle job application
//   const handleApply = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("jobId", job._id);
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("skills", skills);
//     formData.append("education", education);
//     if (resumeFile) formData.append("resume", resumeFile);
//     if (coverLetterFile) formData.append("coverLetter", coverLetterFile);

//     try {
//       const res = await axios.post(`${ApiUrl}/jobSeeker/apply`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success(res.data.message || "Application submitted successfully ✅");
//       setAlreadyApplied(true);
//       setShowForm(false);
//     } catch (err) {
//       let errorMsg = "Failed to apply ❌";

//       if (err.response?.data) {
//         // Handle backend returning string
//         if (typeof err.response.data === "string") {
//           errorMsg = err.response.data;
//         } else if (err.response.data.message) {
//           errorMsg = err.response.data.message;
//         }
//       }

//       toast.error(errorMsg);
      
//       // Update state if user already applied
//       if (errorMsg.toLowerCase().includes("already applied")) {
//         setAlreadyApplied(true);
//         setShowForm(false);
//       }

//       console.error("Apply error:", err);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
//   if (!job) return <p className="text-center mt-10">Job not found</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 flex justify-center items-start py-10 mt-20">
//       <div className="max-w-2xl w-full p-6 bg-white rounded shadow-lg mt-10">
//         <Toaster position="top-right" />
//         <h2 className="text-2xl font-bold mb-2">{job.Title}</h2>
//         <p className="text-gray-700 mb-4">{job.description}</p>
//         <p className="mb-1">
//           <strong>Company:</strong> {job.company}
//         </p>
//         <p className="mb-1">
//           <strong>Location:</strong> {job.location}
//         </p>
//         <p className="mb-4">
//           <strong>Salary:</strong> {job.salary}
//         </p>

//         {alreadyApplied ? (
//           <button
//             disabled
//             className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
//           >
//             ✅ Already Applied
//           </button>
//         ) : (
//           !showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//               Apply Now
//             </button>
//           )
//         )}

//         {showForm && !alreadyApplied && (
//   <form
//     onSubmit={handleApply}
//     className="mt-6 space-y-4 bg-gray-50 p-6 rounded-lg shadow"
//   >
   
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Full Name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//         className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
//         placeholder="Enter your full name"
//       />
//     </div>

    
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
//         placeholder="example@domain.com"
//       />
//     </div>

    
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
//       <input
//         type="text"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//         className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
//         placeholder="10-digit number"
//       />
//     </div>

    
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Skills</label>
//       <input
//         type="text"
//         value={skills}
//         onChange={(e) => setSkills(e.target.value)}
//         required
//         className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
//         placeholder="e.g. React, Node.js, MongoDB"
//       />
//     </div>

   
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">Education</label>
//       <input
//         type="text"
//         value={education}
//         onChange={(e) => setEducation(e.target.value)}
//         required
//         className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
//         placeholder="e.g. B.Tech in CSE"
//       />
//     </div>

    
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">
//         Upload Resume (PDF)
//       </label>
//       <input
//         type="file"
//         onChange={(e) => setResumeFile(e.target.files[0])}
//         accept=".pdf"
//         className="border p-2 rounded w-full"
//       />
//     </div>

   
//     <div>
//       <label className="block text-gray-700 font-medium mb-1">
//         Upload Cover Letter (PDF)
//       </label>
//       <input
//         type="file"
//         onChange={(e) => setCoverLetterFile(e.target.files[0])}
//         accept=".pdf"
//         className="border p-2 rounded w-full"
//       />
//     </div>

   
//     <div className="flex gap-3">
//       <button
//         type="submit"
//         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Submit Application
//       </button>
//       <button
//         type="button"
//         onClick={() => setShowForm(false)}
//         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Cancel
//       </button>
//     </div>
//   </form>
// )}
//       </div>
//     </div>
//   );
// };

// export default JobDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../App";
import { toast, Toaster } from "react-hot-toast";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Building, 
  Clock, 
  FileText, 
  Upload, 
  X,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [error, setError] = useState(null);

  // Application form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch job details & applications
  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view this page.");
      return;
    }

    const fetchJobAndApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch job
        const jobRes = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobData = jobRes.data.data;
        setJob(jobData);

        // Fetch user's applications
        const appsRes = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apps = appsRes.data?.data || [];

        // ✅ Check if already applied
        const applied = apps.some((app) => app.job?._id === jobData._id);
        setAlreadyApplied(applied);

      } catch (err) {
        console.error("Fetch error:", err);
        if (!err.response) {
          setError("Network error. Please check your connection.");
        } else if (err.response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
        } else {
          setError(err.response.data?.message || "Something went wrong.");
        }
        toast.error(error || "Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [id, token]);

  // Handle file validation
  const validateFile = (file, type) => {
    if (file && file.type !== "application/pdf") {
      setFileError(`${type} must be a PDF file`);
      return false;
    }
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setFileError(`${type} must be smaller than 5MB`);
      return false;
    }
    setFileError("");
    return true;
  };

  // Handle job application
  const handleApply = async (e) => {
    e.preventDefault();
    
    // Validate files
    if (resumeFile && !validateFile(resumeFile, "Resume")) return;
    if (coverLetterFile && !validateFile(coverLetterFile, "Cover letter")) return;

    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("skills", skills);
    formData.append("education", education);
    if (resumeFile) formData.append("resume", resumeFile);
    if (coverLetterFile) formData.append("coverLetter", coverLetterFile);

    try {
      const res = await axios.post(`${ApiUrl}/jobSeeker/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Application submitted successfully ✅");
      setAlreadyApplied(true);
      setShowForm(false);
    } catch (err) {
      let errorMsg = "Failed to apply ❌";

      if (err.response?.data) {
        // Handle backend returning string
        if (typeof err.response.data === "string") {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        }
      }

      toast.error(errorMsg);
      
      // Update state if user already applied
      if (errorMsg.toLowerCase().includes("already applied")) {
        setAlreadyApplied(true);
        setShowForm(false);
      }

      console.error("Apply error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md ">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <X size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center mx-auto"
            >
              <ArrowLeft size={18} className="mr-2 " />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Job Not Found</h2>
          <p className="text-gray-600 mt-2">The job you're looking for doesn't exist or may have been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <Toaster position="top-right" />
        
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </button>

        {/* Job Details Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.Title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <Building size={18} className="mr-2" />
                  <span>{job.company}</span>
                </div>
              </div>
              {!showForm && (
                alreadyApplied ? (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center mt-4 md:mt-0">
                    <CheckCircle size={18} className="mr-2" />
                    Applied Successfully
                  </div>
                ) : (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium mt-4 md:mt-0 transition-colors"
                  >
                    Apply Now
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-2 text-indigo-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <DollarSign size={18} className="mr-2 text-indigo-600" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase size={18} className="mr-2 text-indigo-600" />
                <span>Full-time</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
  
            </div>
          </div>
        </div>

        {/* Application Form */}
        {showForm && !alreadyApplied && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for {job.Title}</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="example@domain.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education *</label>
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. B.Tech in Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="List your key skills separated by commas (e.g. React, Node.js, MongoDB)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume (PDF) *
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={24} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500">
                            {resumeFile ? resumeFile.name : "Click to upload resume"}
                          </p>
                        </div>
                        <input
                          type="file"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                          accept=".pdf"
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter (PDF)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={24} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-500">
                            {coverLetterFile ? coverLetterFile.name : "Click to upload cover letter (optional)"}
                          </p>
                        </div>
                        <input
                          type="file"
                          onChange={(e) => setCoverLetterFile(e.target.files[0])}
                          accept=".pdf"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {fileError && (
                  <div className="text-red-600 text-sm mt-2">{fileError}</div>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;