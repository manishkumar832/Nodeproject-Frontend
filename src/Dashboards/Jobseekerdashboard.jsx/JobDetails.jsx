import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../App";
import { toast, Toaster } from "react-hot-toast";

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

  // Handle job application
  const handleApply = async (e) => {
    e.preventDefault();

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200 flex justify-center items-start py-10 mt-20">
      <div className="max-w-2xl w-full p-6 bg-white rounded shadow-lg mt-10">
        <Toaster position="top-right" />
        <h2 className="text-2xl font-bold mb-2">{job.Title}</h2>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <p className="mb-1">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="mb-1">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="mb-4">
          <strong>Salary:</strong> {job.salary}
        </p>

        {alreadyApplied ? (
          <button
            disabled
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          >
            ✅ Already Applied
          </button>
        ) : (
          !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Apply Now
            </button>
          )
        )}

        {showForm && !alreadyApplied && (
  <form
    onSubmit={handleApply}
    className="mt-6 space-y-4 bg-gray-50 p-6 rounded-lg shadow"
  >
   
    <div>
      <label className="block text-gray-700 font-medium mb-1">Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
        placeholder="Enter your full name"
      />
    </div>

    
    <div>
      <label className="block text-gray-700 font-medium mb-1">Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
        placeholder="example@domain.com"
      />
    </div>

    
    <div>
      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
        placeholder="10-digit number"
      />
    </div>

    
    <div>
      <label className="block text-gray-700 font-medium mb-1">Skills</label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
        className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
        placeholder="e.g. React, Node.js, MongoDB"
      />
    </div>

   
    <div>
      <label className="block text-gray-700 font-medium mb-1">Education</label>
      <input
        type="text"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        required
        className="border p-2 rounded w-full focus:ring focus:ring-indigo-200"
        placeholder="e.g. B.Tech in CSE"
      />
    </div>

    
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Upload Resume (PDF)
      </label>
      <input
        type="file"
        onChange={(e) => setResumeFile(e.target.files[0])}
        accept=".pdf"
        className="border p-2 rounded w-full"
      />
    </div>

   
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Upload Cover Letter (PDF)
      </label>
      <input
        type="file"
        onChange={(e) => setCoverLetterFile(e.target.files[0])}
        accept=".pdf"
        className="border p-2 rounded w-full"
      />
    </div>

   
    <div className="flex gap-3">
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Application
      </button>
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  </form>
)}
      </div>
    </div>
  );
};

export default JobDetails;
