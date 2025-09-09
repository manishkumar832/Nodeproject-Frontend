import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,  
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import FrontPage from "./pages/Frontpage.jsx";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import EmployeeDashboard from "./Dashboards/EmployeeDashBoard/EmployeeDashboard.jsx"
import Jobseeker from "./Dashboards/Jobseekerdashboard.jsx/Jobseeker.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/editProfile.jsx";
import PostJob from "./Dashboards/EmployeeDashBoard/PostJob.jsx";
import ManageJobs from "./Dashboards/EmployeeDashBoard/ManageJobs.jsx";
import JobDetails from "./Dashboards/Jobseekerdashboard.jsx/JobDetails.jsx";
import JobList from "./Dashboards/Jobseekerdashboard.jsx/JobList.jsx";
import MyApplications from "./Dashboards/Jobseekerdashboard.jsx/MyApplications.jsx";
import EmployeeApplications from "./Dashboards/EmployeeDashBoard/EmployeeApplications.jsx";

export const ApiUrl = "https://nodeproject-s6y6.onrender.com";


function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    document.title = "NextHire"; 
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/logo.png"; 
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const handleLogout = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Failed to logout. Please try again.");
  }
};

  return (
    <>
      <Toaster position="top-right" />
      <Navbar isLoggedIn={!!user} role={user?.role} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/post-job" element={<PostJob setUser={setUser} />} />
          <Route path="/manage-jobs" element={<ManageJobs/>}/>

        <Route
          path="/jobseeker"
          element={
            user?.role === "jobseeker" ? (
              <Jobseeker setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/employee"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

          <Route
          path="/edit-profile"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />
          <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<MyApplications />} />
       <Route path="/Employee-application" element={<EmployeeApplications />} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
