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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  const token = localStorage.getItem("token");

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
        const res = await axios.get(`${ApiUrl}/myApplications`, {
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

  useEffect(() => {
    if (job && appliedJobs.length > 0) {
      const applied = appliedJobs.some((app) => app.job._id === job._id);
      setAlreadyApplied(applied);
    }
  }, [job, appliedJobs]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!job) return;

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
      await axios.post(`${ApiUrl}/jobSeeker/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application submitted successfully!");
      setShowForm(false);
      setAlreadyApplied(true);
    } catch (err) {
      console.error("Error applying:", err.response?.data || err.message);
      toast.error("Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex items-center justify-center p-4 mt-10">
  <Toaster position="top-right" />
  {loading ? (
    <p className="min-h-screen bg-indigo-50  flex items-center justify-center">Loading...</p>
  ) : !job ? (
    <p className="text-center text-gray-600 text-lg">Job not found</p>
  ) : (
    <div className="max-w-md w-full bg-white rounded shadow-lg p-4">
      <h2 className="text-xl font-bold mb-2">{job.Title}</h2>
      <p className="text-gray-700 mb-3 text-sm">{job.description}</p>
      <p className="mb-1 text-sm"><strong>Company:</strong> {job.company}</p>
      <p className="mb-1 text-sm"><strong>Location:</strong> {job.location}</p>
      <p className="mb-3 text-sm"><strong>Salary:</strong> {job.salary}</p>

      {!alreadyApplied && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 mt-2 text-sm"
        >
          Apply Now
        </button>
      )}

      {alreadyApplied && (
        <p className="text-green-600 font-semibold mt-3 text-sm">
          You have already applied for this job.
        </p>
      )}

      {showForm && !alreadyApplied && (
        <form
          onSubmit={handleApply}
          className="mt-4 grid gap-3 bg-gray-50 p-3 rounded shadow"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="file"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="border p-2 rounded w-full text-sm"
          />
          <input
            type="file"
            onChange={(e) => setCoverLetterFile(e.target.files[0])}
            className="border p-2 rounded w-full text-sm"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )}
</div>
  );
};

export default JobDetails;
