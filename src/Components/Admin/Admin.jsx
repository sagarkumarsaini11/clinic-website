

import React, {useState,useEffect,} from "react";
import "./Admin.css";
import Cookies from "js-cookie";
import {
  FaHome,
  FaBars,
  FaUserCircle,
  FaPlusCircle,
  FaList,
  FaFileAlt,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);

 useEffect(() => {

  const token =
    Cookies.get("token");

  const storedUser =
    Cookies.get("user");

  console.log(
    "Cookie Token:",
    token
  );

  console.log(
    "Cookie User:",
    storedUser
  );

  if (!token || !storedUser) {

    navigate("/");
    return;
  }

  try {

    const parsedUser =
      JSON.parse(storedUser);

    setUser(parsedUser);

  } catch (error) {

    console.log(error);

    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    navigate("/");
  }

}, [navigate]);

const handleLogout = () => {

  Cookies.remove("token");

  Cookies.remove(
    "refreshToken"
  );

  Cookies.remove("user");

  navigate("/");
};

  return (
    <div className="admin-container">

              {/* Sidebar */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay-admin"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <div
            className="sidebar-admin"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2>Admin</h2>
 <button
              className="sidebar-item-admin"
              onClick={() =>
                navigate("/deshboard-admin")
              }
            >
              <FaPlusCircle />
              Deshboard
            </button>
          

            <button
              className="sidebar-item-admin"
              onClick={() =>
                navigate("/add-clinic")
              }
            >
              <FaPlusCircle />
              Add New Clinic
            </button>

            <button
              className="sidebar-item-admin"
              onClick={() =>
                navigate(
                  "/previously-added-clinics"
                )
              }
            >
              <FaList />
              Previously Added Clinics
            </button>

            <button
              className="sidebar-item-admin"
            >
              <FaFileAlt />
              View Financial Report
            </button>
          </div>
        </div>
      )}

      <div className="main-content-admin">

        {/* Header */}

        <div className="header-admin">

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
          >
            <FaBars />
          </button>

          <h2>Admin</h2>

          {/* Profile */}

          <div className="profile-section">

            <FaUserCircle
              size={35}
              className="profile-icon"
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
            />

            {profileOpen && (

              <div className="profile-dropdown">

                <div className="profile-info">

                  <h4>
                    {user?.name}
                  </h4>

                  <p>
                    {user?.email}
                  </p>

                  <p>
                    Role :
                    {user?.role}
                  </p>

                  <p>
                    ID :
                    {user?.id}
                  </p>

                </div>

                <hr />

                <button>
                  <FaUserCircle />
                  Profile
                </button>

                <button>
                  <FaKey />
                  Change Password
                </button>

                <button
                  onClick={
                    handleLogout
                  }
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Cards */}

        <div className="cards-container-admin">

          <div
            className="card-admin"
            onClick={() =>
              navigate(
                "/add-clinic"
              )
            }
          >
            <h3>
              ADD NEW CLINIC
            </h3>
          </div>

          <div
            className="card-admin"
            onClick={() =>
              navigate(
                "/previously-added-clinics"
              )
            }
          >
            <h3>
              PREVIOUSLY ADDED
              CLINICS
            </h3>
          </div>

          <div
            className="card-admin"
          >
            <h3>
              VIEW FINANCIAL
              REPORT
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}