import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaBars,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaCog,
  FaClipboardList,
  FaFileDownload,
  FaQuestionCircle,
} from "react-icons/fa";

import "./ClinicSidebar.css";

const ClinicSidebar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (!token || !userCookie) {
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);
    } catch (error) {
      console.log(error);

      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("user");

      navigate("/");
    }
  }, [navigate]);

//when click outside then sidebar is close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  //sidebar for mobile view
  useEffect(() => {
    const handleSidebarOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleSidebarOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleSidebarOutside
      );
  }, []);

  //logout function

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    navigate("/");
  };

  //menu close after clicking 
const handleMenuClick = () => {
  setSidebarOpen(false);
};

  return (
    <>
      {/* TOP NAVBAR */}

      <div className="top-navbar-sidebar1-clinic">

        <FaBars  className="mobile-menu-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)} />

        <h3 className="clinic-title">Clinic Panel </h3>
          
       
                 {/* profile */}
        <div className="profile-wrapper" ref={dropdownRef}>
          <FaUserCircle
            className="profile-icon-sidebar1-clinic"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile); }}/>
           
          {/* show profile data */}
          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <h4> {user?.name || "No Name"}</h4>
                <p>{user?.email || "No Email"}</p>
                <p> Mobile : {user?.mobile}</p>
                <p>Role : {user?.role}</p>
                <p> ID : {user?.id} </p>
              </div>   
                <hr />

                    {/* profile button */}
              <button
                onClick={() =>navigate("/clinic-profile")}>
                <FaUserCircle /> Profile  
               </button>  

              <button onClick={() => navigate("/change-password") }>
                <FaKey /> Change Password 
               </button>
             

              <button onClick={handleLogout} >
               <FaSignOutAlt />Logout
              </button>
 

            </div>
          )}
        </div>
      </div>

                       {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div  className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}/>
       )} 
           


                         {/* SIDEBAR */}

      <div
        ref={sidebarRef}
        className={`sidebar1-clinic ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-close"
        }`}
      >
        <div className="logo-section-sidebar1-clinic">

          <img
            src="/logo.png"
            alt="Logo"
            className="logo-sidebar-sidebar1-clinic"
          />

          <div className="logo-text-sidebar1-clinic">
            <h2>Krishna</h2>
            <p>ADVANCE PHYSIO</p>
          </div>

        </div>

        <nav className="navbar-sidebar1-clinic">
            
             {/* Homepage submenu */}
         <NavLink to="/homepage"
        onClick={handleMenuClick}
        className={({ isActive }) =>isActive
       ? "menu-btn-sidebar1-clinic active"
       : "menu-btn-sidebar1-clinic"
       }>
       <FaHome /> Homepage</NavLink>
 

               {/* Add Patient submenu */}
          <NavLink
            to="/addpatient"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaUserPlus />Add New Patient</NavLink>
            
          
           


                {/* Serivce submenu */}
          <NavLink
            to="/services"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaClipboardList /> Services</NavLink>
           
          
               

                {/* Service-Category submenu */}
          <NavLink
            to="/category"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaClipboardList />Service Category</NavLink>
            
          
                
                 {/* Service-SubCategory submenu */}
          <NavLink
            to="/sub-category"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaClipboardList />Service Sub Category </NavLink>
            
         
          
           {/* Setting submenu */}
          <NavLink
            to="/setting-clinics"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            } >
         
            <FaCog />Settings</NavLink>
            
          

                    {/* Download submenu */}
          <NavLink
            to="/download-report"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaFileDownload />Download Report</NavLink>
            
          

             {/* New Query  submenu */}
          <NavLink
            to="/new-query"
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }>
          
            <FaQuestionCircle /> New Query</NavLink>
           
          

        </nav>
      </div>
    </>
  );
};

export default ClinicSidebar;