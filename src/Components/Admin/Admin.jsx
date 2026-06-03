import React, { useState } from "react";
import "./Admin.css";

import {
  FaBars,
  FaBell,
  FaPlusCircle,
  FaList,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="admin-container">

      {/* Sidebar Overlay */}

      {sidebarOpen && (
        <div  className="sidebar-overlay-admin" onClick={() => setSidebarOpen(false)}>
        
         
           
          
        
          <div  className="sidebar-admin" onClick={(e) => e.stopPropagation() }>
          
           
             
           
          

            <h2>Admin</h2>

            <button
              className="sidebar-item-admin"
              onClick={() =>
                navigate("/add-clinic")
              }
            >
              <FaPlusCircle />
              <span>
                Add New Clinic
              </span>
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
              <span>
                Previously Added Clinics
              </span>
            </button>

            <button className="sidebar-item-admin">
              <FaFileAlt />
              <span>
                View Financial Report
              </span>
            </button>

            <button className="sidebar-item-admin">
              <FaUser />
              <span>Profile</span>
            </button>

            <button className="sidebar-item-admin">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

          </div>
        </div>
      )}

      {/* Main Content */}

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

          <div className="notification-admin">

            <FaBell size={24} />

            <span className="badge-admin">
              3
            </span>

          </div>

        </div>

        {/* Cards */}

        <div className="cards-container-admin">

          <div
            className="card-admin"
            onClick={() =>
              navigate("/add-clinic")
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
              PREVIOUSLY ADDED CLINICS
            </h3>
          </div>

          <div className="card-admin">
            <h3>
              VIEW FINANCIAL REPORT
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}