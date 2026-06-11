import React, { useState } from "react";
import "./Sidebar.css";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}

      <div className="navbar">

        <button className="menu-btn" onClick={() => setShowSidebar(true)}>☰
          </button>
      
        
           <h2>Admin</h2>
      
        <div className="notification">
          <FaBell size={22} />
          <span className="badge">3</span>
        </div>

      </div>

                 {/* SIDEBAR */}

      {showSidebar && (
        <div  className="sidebar-overlay"
           onClick={() => setShowSidebar(false)}>
       
        
          <div className="sidebar"
              onClick={(e) => e.stopPropagation()} >
         
         
            <h2>MENU</h2>
              
              <button
              onClick={() => {
                navigate("/deshboard-admin");
                setShowSidebar(false);
              }} >Dashboard</button>


            <button
              onClick={() => {
                navigate("/adminpanel");
                setShowSidebar(false);
              }} >Admin</button>
           
            <button
              onClick={() => {
                navigate("/add-clinic");
                setShowSidebar(false);
              }} > Add New Clinic</button>
           
  
            <button
              onClick={() => {
                navigate("/previously-added-clinics");
                setShowSidebar(false);
              }} > Previous Added Clinic </button>
           
          
            <button
              onClick={() => {
                navigate("");
                setShowSidebar(false);
              }}>View Fincial Report </button>
            
       {/* <button
              onClick={() => {
                navigate("/services");
                setShowSidebar(false);
              }}> Services</button>

                   
         <button
              onClick={() => {
                navigate("/category");
                setShowSidebar(false);
              }}> Service Category</button>

                 <button
              onClick={() => {
                navigate("/sub-category");
                setShowSidebar(false);
              }}> Service Sub Category</button>
            
            <button>Time Table</button>

            <button>Download Report</button>

            <button>New Query</button> */}

          </div>
        </div>
      )}
    </>
  );
}