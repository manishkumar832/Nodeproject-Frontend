// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const JobPost = () => {
//   const [formData, setFormData] = useState({
//     Title: "",
//     description: "",
//     company: "",
//     location: "",
//     salary: "",
//     role: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "https://nodeproject-s6y6.onrender.com/Employee/jobPosting",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       toast.success(res.data.message || "Job posted successfully!");
//       setFormData({
//         Title: "",
//         description: "",
//         company: "",
//         location: "",
//         salary: "",
//         role: "",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error(
//         err.response?.data?.message || "Something went wrong while posting job"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex mt-10 justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-sky-50 to-indigo-200">
      
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           Post a Job
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="Title"
//             value={formData.Title}
//             onChange={handleChange}
//             placeholder="Job Title"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Job Description"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             placeholder="Company Name"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Location"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="number"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             placeholder="Salary"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             placeholder="Job Role"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
//           >
//             {loading ? "Posting..." : "Post Job"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobPost;


import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const JobPost = () => {
  const [formData, setFormData] = useState({
    Title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://nodeproject-s6y6.onrender.com/Employee/jobPosting",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message || "Job posted successfully!");
      setFormData({
        Title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        role: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong while posting job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-20">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              placeholder="e.g. Senior Developer"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job responsibilities and requirements..."
              required
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Annual salary"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 text-sm"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;