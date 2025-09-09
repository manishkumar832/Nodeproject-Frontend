import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi2";
import { GiMagnifyingGlass } from "react-icons/gi";
import { RiFileList2Line } from "react-icons/ri";
import { FaRegPaperPlane } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { FaBriefcase } from "react-icons/fa";

export default function Navbar({ isLoggedIn, role, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  
  const goHome = () => {
    if (role === "employee") navigate("/employee");
    else if (role === "jobseeker") navigate("/jobseeker");
    else navigate("/"); // fallback
  };


const DesktopNavItem = ({ icon, label, onClick, bgColor = "bg-gray-200", hoverBg = "hover:bg-indigo-500", hoverText = "hover:text-white" }) => (
  <div onClick={onClick} className="flex flex-col items-center cursor-pointer px-2 py-1.5 transition duration-200">
    <div className={`p-2.5 rounded-full text-gray-700 ${bgColor} ${hoverBg} ${hoverText} shadow-md`}>
      {icon}
    </div>
    <span className="mt-1 text-xs font-medium text-gray-700">{label}</span>
  </div>
);


const MobileNavItem = ({ icon, label, onClick, bgColor = "bg-gray-200", hoverBg = "hover:bg-indigo-500", hoverText = "hover:text-white" }) => (
  <div onClick={onClick} className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer group">
    <div className={`p-1.5 rounded-full text-gray-700 ${bgColor} ${hoverBg} ${hoverText} transition duration-200`}>
      {icon}
    </div>
    <span className="text-gray-700 font-medium">{label}</span>
  </div>
);
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-gray-800 px-6 py-3 flex justify-between items-center shadow z-50">
      
      <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome}>
        <img src="/nexthireLogo.png" alt="NextHire Logo" className="h-12 w-auto object-contain" />
      </div>

      
      <nav className="hidden md:flex space-x-4 items-center">
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded text-gray-700 hover:text-indigo-600 hover:border hover:border-indigo-600 transition font-semibold"
          >
            Login
          </button>
        )}

        {isLoggedIn && (
          <>
            <DesktopNavItem icon={<HiOutlineHome size={24} />} label="Home" onClick={goHome} />
            <DesktopNavItem icon={<CgProfile size={24} />} label="Profile" onClick={() => navigate("/profile")} />

            {role === "jobseeker" && (
              <>
                <DesktopNavItem icon={<GiMagnifyingGlass size={24} />} label="Find Jobs" onClick={() => navigate("/jobs")} />
                <DesktopNavItem icon={<RiFileList2Line size={24} />} label="Applies" onClick={() => navigate("/applications")} />
              </>
            )}

            {role === "employee" && (
              <>
                <DesktopNavItem icon={<FaRegPaperPlane size={24} />} label="Post Job" onClick={() => navigate("/post-job")} />
                <DesktopNavItem icon={<FaBriefcase size={24} />} label="Manage Jobs" onClick={() => navigate("/manage-jobs")} />
                <DesktopNavItem icon={<VscFiles size={24} />} label="Applications" onClick={() => navigate("/Employee-application")} />
              </>
            )}

            <DesktopNavItem icon={<AiOutlineLogout size={24} />} label="Logout" onClick={onLogout} bgColor="bg-red-500" hoverBg="hover:bg-red-600" hoverText="hover:text-red-50" />
          </>
        )}
      </nav>

      
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

    
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-56 flex flex-col space-y-3 md:hidden">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded text-gray-700 hover:text-indigo-600 hover:border hover:border-indigo-600 transition font-semibold"
            >
              Login
            </button>
          ) : (
            <>
              <MobileNavItem icon={<HiOutlineHome size={20} />} label="Home" onClick={() => { goHome(); setMenuOpen(false); }} />
              <MobileNavItem icon={<CgProfile size={20} />} label="Profile" onClick={() => { navigate("/profile"); setMenuOpen(false); }} />

              {role === "jobseeker" && (
                <>
                  <MobileNavItem icon={<GiMagnifyingGlass size={20} />} label="Find Jobs" onClick={() => { navigate("/jobs"); setMenuOpen(false); }} />
                  <MobileNavItem icon={<RiFileList2Line size={20} />} label="Applies" onClick={() => { navigate("/applications"); setMenuOpen(false); }} />
                </>
              )}

              {role === "employee" && (
                <>
                  <MobileNavItem icon={<FaRegPaperPlane size={20} />} label="Post Job" onClick={() => { navigate("/post-job"); setMenuOpen(false); }} />
                  <MobileNavItem icon={<FaBriefcase size={20} />} label="Manage Jobs" onClick={() => { navigate("/manage-jobs"); setMenuOpen(false); }} />
                  <MobileNavItem icon={<VscFiles size={20} />} label="Applications" onClick={() => { navigate("/Employee-application"); setMenuOpen(false); }} />
                </>
              )}

              <MobileNavItem icon={<AiOutlineLogout size={20} />} label="Logout" onClick={() => { onLogout(); setMenuOpen(false); }} bgColor="bg-red-500" hoverBg="hover:bg-red-600" hoverText="hover:text-red-50" />
            </>
          )}
        </div>
      )}
    </header>
  );
}
