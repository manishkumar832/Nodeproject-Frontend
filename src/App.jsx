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
import Navbar from "./pages/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import EmployeeDashboard from "./Dashboards/EmployeeDashBoard/EmployeeDashboard.jsx";
import Jobseeker from "./Dashboards/Jobseekerdashboard.jsx/Jobseeker.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/editProfile.jsx"
import PostJob from "./Dashboards/EmployeeDashBoard/PostJob.jsx";
import ManageJobs from "./Dashboards/EmployeeDashBoard/ManageJobs.jsx";
import JobDetails from "./Dashboards/Jobseekerdashboard.jsx/JobDetails.jsx";
import JobList from "./Dashboards/Jobseekerdashboard.jsx/JobList.jsx";
import MyApplications from "./Dashboards/Jobseekerdashboard.jsx/MyApplications.jsx";
import EmployeeApplications from "./Dashboards/EmployeeDashBoard/EmployeeApplications.jsx";

 export const ApiUrl = "https://nodeproject-s6y6.onrender.com";


const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NextHire";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = "/logo.png";
  }, []);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <>
      <Toaster
      position="top-right"
      toastOptions={{
        duration: 1000, 
        style: {
          fontSize: "14px",
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
        },
      }}
    />
      <Navbar isLoggedIn={!!user} role={user?.role} onLogout={handleLogout} />

      <Routes>
        
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

       
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute user={user}>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <PrivateRoute user={user}>
              <PostJob setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-jobs"
          element={
            <PrivateRoute user={user}>
              <ManageJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobseeker"
          element={
            <PrivateRoute user={user}>
              {user?.role === "jobseeker" ? (
                <Jobseeker setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <PrivateRoute user={user}>
              {user?.role === "employee" ? (
                <EmployeeDashboard setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )}
            </PrivateRoute>
          }
        />

       
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/Employee-application" element={<EmployeeApplications />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
