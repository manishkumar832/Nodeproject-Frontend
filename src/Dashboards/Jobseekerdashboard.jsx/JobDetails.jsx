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
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // Application form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ApiUrl}/jobSeeker/ShowJobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(res.data.data);
      } catch (err) {
        console.error("Error fetching job details:", err.response?.data || err.message);
        toast.error("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/jobSeeker/myApplications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedJobs(res.data.data);
      } catch (err) {
        console.error("Error fetching applications:", err.response?.data || err.message);
      }
    };

    fetchJob();
    fetchApplications();
  }, [id, token]);

  // Check if already applied
  useEffect(() => {
    if (job && appliedJobs.length > 0) {
      const applied = appliedJobs.some((app) => app.job._id === job._id);
      setAlreadyApplied(applied);
    }
  }, [job, appliedJobs]);



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
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to apply ❌";
    toast.error(errorMsg);
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-2">{job.Title}</h2>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <p className="mb-1"><strong>Company:</strong> {job.company}</p>
      <p className="mb-1"><strong>Location:</strong> {job.location}</p>
      <p className="mb-4"><strong>Salary:</strong> {job.salary}</p>

      {!alreadyApplied && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Apply Now
        </button>
      )}

      {alreadyApplied && (
        <p className="text-green-600 font-semibold mt-4">You have already applied for this job.</p>
      )}

      {showForm && !alreadyApplied && (
        <form
          onSubmit={handleApply}
          className="mt-6 grid gap-4 bg-gray-50 p-4 rounded shadow"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => setCoverLetterFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />

          <div className="flex gap-2">
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
  );
};

export default JobDetails;
