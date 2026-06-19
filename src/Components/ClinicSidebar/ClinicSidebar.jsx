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

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    navigate("/");
  };

  return (
    <>
      {/* TOP NAVBAR */}

      <div className="top-navbar-sidebar1-clinic">

        <FaBars
          className="mobile-menu-icon"
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <h3 className="clinic-title">
          Clinic Panel
        </h3>

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >
          <FaUserCircle
            className="profile-icon-sidebar1-clinic"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile);
            }}
          />

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-info">

                <h4>
                  {user?.name || "No Name"}
                </h4>

                <p>
                  {user?.email || "No Email"}
                </p>

                <p>
                  Mobile : {user?.mobile}
                </p>

                <p>
                  Role : {user?.role}
                </p>

                <p>
                  ID : {user?.id}
                </p>

              </div>

              <hr />

              <button
                onClick={() =>
                  navigate("/clinic-profile")
                }
              >
                <FaUserCircle />
                Profile
              </button>

              <button
                onClick={() =>
                  navigate("/change-password")
                }
              >
                <FaKey />
                Change Password
              </button>

              <button
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
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

          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaHome />
            Homepage
          </NavLink>

          <NavLink
            to="/addpatient"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaUserPlus />
            Add New Patient
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaClipboardList />
            Services
          </NavLink>

          <NavLink
            to="/category"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaClipboardList />
            Service Category
          </NavLink>

          <NavLink
            to="/sub-category"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaClipboardList />
            Service Sub Category
          </NavLink>

          <NavLink
            to="/setting-clinics"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaCog />
            Settings
          </NavLink>

          <NavLink
            to="/download-report"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaFileDownload />
            Download Report
          </NavLink>

          <NavLink
            to="/new-query"
            className={({ isActive }) =>
              isActive
                ? "menu-btn-sidebar1-clinic active"
                : "menu-btn-sidebar1-clinic"
            }
          >
            <FaQuestionCircle />
            New Query
          </NavLink>

        </nav>
      </div>
    </>
  );
};

export default ClinicSidebar;